<template>
  <v-container class="scrollContainer" fluid>
    <!-- input y botón de filtro -->
    <v-row dense>
      <v-col>
        <v-text-field label="Nombre" v-model="name" hide-details />
      </v-col>

      <v-col class="d-flex align-center" cols="auto">
        <v-btn icon @click="dialog = true">
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h6">Filtros Avanzados</span>
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="season" label="Temporada" hide-details />
          <v-text-field v-model="river" label="Río" hide-details />
          <v-text-field v-model="population" label="Población" hide-details />
          <v-text-field v-model="country" label="País" hide-details />
        </v-card-text>

        <v-card-actions>
          <v-btn text @click="clearFilters">Limpiar</v-btn>
          <v-spacer />
          <v-btn text @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- lista -->
    <v-list>
      <v-list-item
        v-for="card in canyons"
        :key="card.id"
        @click="openCanyon(card.id!)"
        class="clickable"
      >
        <CanyonCard
          :id="card.id"
          :name="card.name"
          :season="card.season"
          :country="card.country"
          :population="card.population"
        />
      </v-list-item>
    </v-list>

    <div ref="loadMoreTrigger" class="text-center my-4">
      <v-progress-circular v-if="loading" indeterminate color="primary" />
    </div>
  </v-container>
  <div class="d-flex justify-end mt-4 mr-4">
    <v-btn @click="handleCreateCanyon">Crear Barranco</v-btn>
  </div>

  <v-dialog v-model="createCanyon"><CanyonForm :close="handleCreateCanyon"></CanyonForm> </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CanyonCard from '@/dumbComponents/cards/CanyonCard.vue'
import type { CanyonCardInfo } from '@/interfaces/CanyonCardInfo'
import { CanyonApi } from '@/api'
import { useCanyonStore } from '@/stores/canyon'
import CanyonForm from '../forms/CanyonForm.vue'
import { getFavouritesCanyons } from '@/calls/CanyonCalls'

const canyonApi = new CanyonApi()
const canyonPinia = useCanyonStore()
const name = ref<string | undefined>()
const season = ref<string | undefined>()
const river = ref<string | undefined>()
const population = ref<string | undefined>()
const country = ref<string | undefined>()
const dialog = ref(false)
const createCanyon = ref(false)
const handleCreateCanyon = () => {
  createCanyon.value = !createCanyon.value
}

const router = useRouter()

const canyons = ref<CanyonCardInfo[]>([])
const page = ref(0)
const pageSize = 100
const loading = ref(false)
let observer: IntersectionObserver | null = null
const loadMoreTrigger = ref<HTMLElement | null>(null)
let firstPage = true

const route = useRoute()

async function getCanyons(page: number, size: number): Promise<CanyonCardInfo[]> {
  let rawCanyons
  if (route.path.includes('canyons/favourite')) {
    rawCanyons = await getFavouritesCanyons({
      page,
      size,
      name: name.value || undefined,
      season: season.value || undefined,
      river: river.value || undefined,
      population: population.value || undefined,
      country: country.value || undefined,
    })
  } else {
    rawCanyons = await canyonApi.getCanyons({
      page,
      size,
      name: name.value || undefined,
      season: season.value || undefined,
      river: river.value || undefined,
      population: population.value || undefined,
      country: country.value || undefined,
    })
  }

  return rawCanyons.map((canyon) => ({
    id: canyon.canyonId,
    name: canyon.name,
    season: canyon.season,
    population: canyon.population,
    country: canyon.country,
  }))
}

const clearFilters = () => {
  name.value = ''
  season.value = ''
  river.value = ''
  population.value = ''
  country.value = ''
}

const loadMore = async () => {
  if (loading.value) return
  loading.value = true
  try {
    const newCanyons = await getCanyons(page.value, pageSize)
    if (!firstPage) {
      canyons.value.push(...newCanyons)
    } else {
      canyons.value = newCanyons
      firstPage = false
    }
    page.value += 1
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

watch(
  () => route.path,
  () => {
    if (!(Object.keys(route.params).length > 0 || Object.keys(route.query).length > 0)) {
      window.location.reload()
    }
  },
)

onMounted(async () => {
  await loadMore()

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    },
    { threshold: 1.0 },
  )

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
})

onBeforeUnmount(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value)
  }
})

const propsToWatch = computed(() => ({
  name: name.value,
  season: season.value,
  river: river.value,
  population: population.value,
  country: country.value,
}))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(propsToWatch, async (_, __) => {
  page.value = 0
  firstPage = true
  try {
    canyons.value = await getCanyons(0, pageSize)
    page.value = 1
  } catch (error) {
    console.error(error)
  }
})

async function openCanyon(canyonId: number) {
  await canyonPinia.loadCanyon(canyonId)
  if (route.path.includes('canyons/favourite')) {
    router.push({
      name: 'canyonFavourite',
      params: { id: canyonId, slug: canyonPinia.getCanyon()?.name?.replace(' ', '-') },
    })
  } else {
    router.push({
      name: 'canyon',
      params: { id: canyonId, slug: canyonPinia.getCanyon()?.name?.replace(' ', '-') },
    })
  }
}
</script>

<style scoped>
.scrollContainer {
  max-height: 75vh;
  overflow-y: auto;
  min-width: 30vh;
}
.clickable {
  cursor: pointer;
}
</style>
