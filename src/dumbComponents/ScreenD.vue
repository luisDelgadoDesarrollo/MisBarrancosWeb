<template>
  <v-card class="fill-height d-flex flex-column">
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="canyons">Barrancos</v-tab>
      <v-tab value="map">Mapa</v-tab>
      <v-tab value="articles">Eventos y Noticias</v-tab>
      <v-tab value="profile">Perfil</v-tab>
    </v-tabs>

    <v-card-text class="flex-grow-1">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="canyons">
          Pantalla de barrancosASDasdASASDFKJASLD;FJ AKLSD;'FJKADL;JFKL;JSDFJAKSDL;FJD'
        </v-tabs-window-item>
        <v-tabs-window-item value="map"> Pantalla de mapa </v-tabs-window-item>
        <v-tabs-window-item value="articles"> Pantalla de artículos </v-tabs-window-item>
        <v-tabs-window-item value="profile"> Pantalla de perfil </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('canyons') // Cambié el valor inicial a uno de los tabs reales
</script>

<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
