<template>
  <div v-if="canyon?.canyonId === 0">
    <h2 style="color: red">⚠️ Error: el barranco no existe o no se pudo cargar.</h2>
  </div>

  <div v-else class="page-container">
    <div v-if="isMobileCheck()">
      <div class="button-row" v-if="userStore.isUserLogged">
        <v-btn class="action-btn" color="primary" @click="downloadCanyon">
          <v-icon>mdi-download</v-icon>
        </v-btn>

        <v-btn class="action-btn" color="secondary" @click="handleUpdateCanyon">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>

      <v-col class="info-column">
        <h1>{{ canyon?.name }}</h1>
        <MessageModalD
          v-if="showModal"
          v-model="showModal"
          :canyon="canyon?.canyonId"
          @close="showModal = false"
        />
        <v-container v-if="canyon?.canyonProhibition?.length">
          <v-card v-for="(prohibition, index) in canyon.canyonProhibition" :key="index">
            <v-card-text>
              {{ prohibition.description }}
            </v-card-text>
          </v-card>
        </v-container>
        <CanyonBasicD
          :season="canyon?.season"
          :river="canyon?.river"
          :location="canyon?.location"
          :favourite="canyon?.favourite"
          :descent="canyon?.canyonDescent?.[0]"
          :dificulty="canyon?.difficultyDesc"
        />
        <ExpansionPanelGroupD />
        <div class="croquis-wrapper">
          <v-img :src="imageUrl" alt="No disponemos del croquis" class="croquis-image" contain />
        </div>
      </v-col>
    </div>

    <div v-else>
      <!-- Título centrado horizontalmente -->
      <v-row align-content="center" justify="space-between">
        <!-- Nombre a la izquierda -->
        <v-col cols="auto">
          <h1 class="ma-0">{{ canyon?.name }}</h1>
        </v-col>

        <!-- Botones a la derecha -->
        <v-col cols="auto" class="d-flex justify-end" v-if="userStore.isUserLogged">
          <v-btn class="ma-2" color="primary" @click="downloadCanyon">Descargar reseña</v-btn>

          <v-btn class="ma-2" color="secondary" @click="handleUpdateCanyon">Modificar reseña</v-btn>
        </v-col>
      </v-row>

      <!-- Info + imagen -->
      <v-row class="content-row" no-gutters>
        <!-- Info izquierda -->
        <v-col class="info-column">
          <MessageModalD :canyon="canyon?.canyonId" />
          <v-container v-if="canyon?.canyonProhibition?.length">
            <v-card v-for="(prohibition, index) in canyon.canyonProhibition" :key="index">
              <v-card-text>
                {{ prohibition.description }}
              </v-card-text>
            </v-card>
          </v-container>
          <ExpansionPanelGroupD
            :description="canyon?.description"
            :approach="canyon?.approach"
            :access="canyon?.access"
            :descent="canyon?.descent"
            :_return="canyon?._return"
            :scape="canyon?.scape"
            :coverage="canyon?.coverage"
            :steps="canyon?.canyonRappeling"
            :schedules="canyon?.canyonSchedule"
            :links="canyon?.canyonLink"
            :canyonNear="canyon?.canyonCanyonNear"
            :controlPoints="canyon?.canyonControlLevel"
          ></ExpansionPanelGroupD>
        </v-col>

        <!-- Info derecha + croquis -->
        <v-col class="info-column">
          <CanyonBasicD
            :season="canyon?.season"
            :river="canyon?.river"
            :location="canyon?.location"
            :favourite="canyon?.favourite"
            :descent="canyon?.canyonDescent?.[0]"
            :dificulty="canyon?.difficultyDesc"
          />

          <div class="croquis-wrapper">
            <v-img :src="imageUrl" alt="No disponemos del croquis" class="croquis-image" contain />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
  <v-dialog v-model="downloadDialog" max-width="500px">
    <v-card class="pa-4">
      <h1 class="mb-4">Reseña descargada</h1>
      <p class="mb-4">
        El barranco ha sido enviado a su email. Si no lo recibe y el error reincide, contacte con
        <strong>misbarrancos@gmail.com</strong>.
      </p>
      <div class="d-flex justify-end">
        <v-btn @click="downloadDialog = false">Aceptar</v-btn>
      </div>
    </v-card>
  </v-dialog>
  <v-dialog v-model="updateCanyon"
    ><CanyonForm :canyon="canyon" :close="handleUpdateCanyon"></CanyonForm>
  </v-dialog>
</template>

<script setup lang="ts">
import { useCanyonStore } from '@/stores/canyon'
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import CanyonBasicD from '../CanyonBasicD.vue'
import MessageModalD from './MessageModalD.vue'
import ExpansionPanelGroupD from '../ExpansionPanelGroupD.vue'
import { useUserStore } from '@/stores/user'
import { isMobileCheck } from '@/utils/Responsive'
import { downloadCanyonWithAuth } from '@/calls/CanyonCalls'
import CanyonForm from '../forms/CanyonForm.vue'
import { imageApi } from '@/api/apiConfig'

const route = useRoute()
const canyonPinia = useCanyonStore()
const userStore = useUserStore()

const downloadDialog = ref(false)
const updateCanyon = ref(false)
const handleUpdateCanyon = () => {
  updateCanyon.value = !updateCanyon.value
}
const showModal = ref(true)

const downloadCanyon = async () => {
  if (canyon.value) {
    await downloadCanyonWithAuth({ canyonId: canyon.value.canyonId!, email: true })
    downloadDialog.value = true
  }
}

onMounted(async () => {
  if (
    canyonPinia.getCanyon() == null ||
    canyonPinia.getCanyon()?.canyonId != Number(route.params.id)
  ) {
    await canyonPinia.loadCanyon(Number(route.params.id))
  }
})

const canyon = computed(() => canyonPinia.getCanyon())
const imageUrl = ref<string | undefined>(undefined)

watchEffect(async () => {
  if (canyon.value?.croquis) {
    try {
      const response = await imageApi.imagesImageDirGet({
        image: canyon.value.croquis,
        dir: 'croquis',
      })
      imageUrl.value = URL.createObjectURL(response)
    } catch (e) {
      console.error('Error loading image', e)
      imageUrl.value = undefined
    }
  }
})
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.content-row {
  flex: 1;
  display: flex;
  align-items: flex-start;
  height: 100%;
}

.info-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px;
  overflow-y: auto;
  max-height: 100%;
}

.croquis-image {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  margin-top: 16px;
  flex-shrink: 1;
}

.button-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  width: 100%;
}

.action-btn {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  text-align: center;
}
</style>
