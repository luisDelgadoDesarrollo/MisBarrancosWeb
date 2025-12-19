<template>
  <v-container fluid class="scrollContainer">
    <v-expansion-panels multiple>
      <v-expansion-panel v-for="(item, index) in items" :key="index">
        <v-expansion-panel-title>
          {{ item.title }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div v-if="item.type === 'canyonRappeling'">
            <div v-for="(entry, idx) in item.content as CanyonRappeling[]" :key="idx">
              <CanyonRappelingCard :canyonRappeling="entry"></CanyonRappelingCard>
            </div>
          </div>
          <div v-else-if="item.type === 'canyonSchedule'">
            <ul>
              <div v-for="(entry, idx) in item.content as CanyonSchedule[]" :key="idx">
                <CanyonScheduleCard :canyonSchedule="entry"></CanyonScheduleCard>
              </div>
            </ul>
          </div>
          <div v-else-if="item.type === 'canyonLink'">
            <ul>
              <div v-for="(entry, idx) in item.content as CanyonLink[]" :key="idx">
                <CanyonLinkCard :canyonLink="entry"></CanyonLinkCard>
              </div>
            </ul>
          </div>
          <div v-else-if="item.type === 'canyonCanyonNear'">
            <ul>
              <li v-for="(entry, idx) in item.content as SimpleCanyon[]" :key="idx">
                <CanyonCanyonNearCard :canyonCanyonNear="entry"></CanyonCanyonNearCard>
              </li>
            </ul>
          </div>
          <div v-else-if="item.type === 'canyonControlLevel'">
            <ul>
              <li v-for="(entry, idx) in item.content as CanyonControlLevel[]" :key="idx">
                <CanyonControlLevelCard :canyonControlLevel="entry"></CanyonControlLevelCard>
              </li>
            </ul>
          </div>
          <div v-else>
            {{ item.content }}
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script setup lang="ts">
import { useCanyonStore } from '@/stores/canyon'
import { computed } from 'vue'
import type {
  CanyonControlLevel,
  CanyonLink,
  CanyonRappeling,
  CanyonSchedule,
  SimpleCanyon,
} from '@/api'
import CanyonRappelingCard from './cards/CanyonRappelingCard.vue'
import CanyonScheduleCard from './cards/CanyonScheduleCard.vue'
import CanyonLinkCard from './cards/CanyonLinkCard.vue'
import CanyonCanyonNearCard from './cards/CanyonCanyonNearCard.vue'
import CanyonControlLevelCard from './cards/CanyonControlLevelCard.vue'

const canyonPinia = useCanyonStore()
const canyon = computed(() => canyonPinia.getCanyon())

const items = computed(() => {
  const canyonData = canyon.value

  const rawItems = [
    { title: 'Acceso', type: 'text', content: canyonData?.access },
    { title: 'Aproximación', type: 'text', content: canyonData?.approach },
    { title: 'Descripción', type: 'text', content: canyonData?.description },
    { title: 'Descenso', type: 'text', content: canyonData?.descent },
    { title: 'Rápeles y pasos', type: 'canyonRappeling', content: canyonData?.canyonRappeling },
    { title: 'Retorno', type: 'text', content: canyonData?._return },
    { title: 'Escapes', type: 'text', content: canyonData?.scape },
    {
      title: 'Puntos de control',
      type: 'canyonControlLevel',
      content: canyonData?.canyonControlLevel,
    },
    { title: 'Cobertura', type: 'text', content: canyonData?.coverage },
    { title: 'Horarios', type: 'canyonSchedule', content: canyonData?.canyonSchedule },
    { title: 'Links', type: 'canyonLink', content: canyonData?.canyonLink },
    { title: 'Geologia', type: 'text', content: canyonData?.geology },
    {
      title: 'Barrancos cercanos',
      type: 'canyonCanyonNear',
      content: canyonData?.canyonCanyonNear,
    },
  ]

  return rawItems.filter((item) => {
    // Para strings, verificamos que no esté vacío
    if (typeof item.content === 'string') {
      return item.content.trim() !== ''
    }
    // Para arrays, verificamos que tengan elementos
    if (Array.isArray(item.content)) {
      return item.content.length > 0
    }
    // Para otros casos (null, undefined, etc.)
    return item.content != null
  })
})
</script>

<style scoped>
.scrollContainer {
  height: 70vh;
  overflow-y: auto;
}

ul {
  padding-left: 1.5rem;
  margin: 0;
}

li {
  margin-bottom: 4px;
}
</style>
