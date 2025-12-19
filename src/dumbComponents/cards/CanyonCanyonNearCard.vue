<template>
  <v-card class="ma-4 pa-4" outlined @click="openCanyon" style="cursor: pointer">
    <v-card-title class="text-h6">
      {{ props.canyonCanyonNear?.name }}
    </v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import type { SimpleCanyon } from '@/api'
import { useCanyonStore } from '@/stores/canyon'
import { useRouter } from 'vue-router'

const props = defineProps<{
  canyonCanyonNear?: SimpleCanyon
  updatable?: {
    type: boolean
    default: false
  }
}>()

const canyonData = useCanyonStore()
const router = useRouter()

async function openCanyon() {
  if (props.canyonCanyonNear && props.canyonCanyonNear.canyonId) {
    await canyonData.loadCanyon(props.canyonCanyonNear.canyonId)
    router.push({
      name: 'canyon',
      params: {
        id: props.canyonCanyonNear.canyonId,
        slug: canyonData.getCanyon()?.name?.replace(' ', '-'),
      },
    })
  }
}
</script>
