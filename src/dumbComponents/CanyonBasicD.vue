<template>
  <v-card class="pa-4" outlined @click="props.onClick?.()">
    <v-card-text>
      <v-row dense class="d-flex justify-space-between align-center">
        <div v-if="props.location">
          <div>
            {{ props.location.country }} - {{ props.location.population }}
            <div v-if="props.location.zone">({{ props.location.zone }})</div>
          </div>

          <div v-if="props.location.latitud && props.location.longitud">
            <strong>Coordenadas:</strong> {{ props.location.latitud }},{{ props.location.longitud }}
          </div>
        </div>

        <div>
          <strong>Favorito:</strong>
          <v-btn @click="handleFavourite">
            <v-icon color="red" v-if="localFavourite">mdi-heart</v-icon>
            <v-icon v-else>mdi-heart-outline</v-icon></v-btn
          >
        </div>
      </v-row>
      <v-row dense>
        <v-col v-if="props.season">
          <v-row dense><strong>Temporada: </strong></v-row> <v-row dense>{{ props.season }}</v-row>
        </v-col>

        <v-col v-if="props.river"> <strong>Río:</strong> {{ props.river }} </v-col>

        <v-col v-if="props.dificulty">
          <strong>Dificultad:</strong> {{ props.dificulty }}
        </v-col>

        <v-col v-if="props.descent">
          <strong>Descenso:</strong>
          <v-col>
            <v-row>
              Longitud: {{ props.descent.length }}, Desnivel: {{ props.descent.slope }}</v-row
            >
            <v-row>
              N Rapeles: {{ props.descent.rapelNum }} Rapel mas largo: {{ props.descent.maxLength }}
            </v-row>
            <v-row> Equipamiento: {{ props.descent.equipment }}</v-row>
          </v-col>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import type { CanyonDescent, CanyonLocation } from '@/api'
import { addCanyonToFavourites, deleteCanyonFromFavourites } from '@/calls/CanyonCalls'
import { useCanyonStore } from '@/stores/canyon'
import { ref, watch } from 'vue'
const canyonPinia = useCanyonStore()

const props = withDefaults(
  defineProps<{
    season?: string
    river?: string
    location?: CanyonLocation
    favourite?: boolean
    descent?: CanyonDescent
    dificulty?: string
    onClick?: () => void
  }>(),
  {},
)
const localFavourite = ref(props.favourite)

watch(
  () => props.favourite,
  (newVal) => {
    localFavourite.value = newVal
  },
)

const handleFavourite = async () => {
  if (localFavourite.value) {
    await deleteCanyonFromFavourites(canyonPinia.canyon!.canyonId!)
  } else {
    await addCanyonToFavourites(canyonPinia.canyon!.canyonId!)
  }
  localFavourite.value = !localFavourite.value
}
</script>
