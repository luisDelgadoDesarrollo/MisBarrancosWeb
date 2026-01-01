<template>
  <v-card class="ma-4 pa-4" outlined>
    <v-card-title class="text-h6">
      <div><strong>Como saber el nivel:</strong> {{ props.canyonControlLevel?.caudalLevel }}</div>
      <div>
        <v-btn v-if="props.updatable" @click="openForm = true">Editar </v-btn>
        <v-btn v-if="props.updatable" @click="deleteCanyonControlLevel">Borrar</v-btn>
      </div>
    </v-card-title>

    <v-card-text>
      <div>
        <strong>Como encontrar el punto de control:</strong> {{ props.canyonControlLevel?.name }}
      </div>
      <div class="control-point-wrapper">
        <v-img
          :src="imageUrl"
          alt="No disponemos del croquis"
          class="control-point-image"
          contain
        />
      </div>
    </v-card-text>
    <v-dialog v-model="openForm">
      <CanyonControlLevelForm
        :update="true"
        :canyonControlLevel="localCanyonControlLevel"
        @update:canyonControlLevelEmit="updateCanyonControlLevel"
        @close="openForm = false"
      >
      </CanyonControlLevelForm>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { type CanyonControlLevel } from '@/api'
import { ref, watch, watchEffect } from 'vue'
import CanyonControlLevelForm from '../forms/CanyonControlLevelForm.vue'
import { createImageStore } from '@/stores/images'
import { imageApi } from '@/api/apiConfig';
const props = defineProps<{
  canyonControlLevel?: CanyonControlLevel
  updatable?: boolean
}>()

const canyonControlLevelControlPointPinia = createImageStore('canyonControlLevelImages')()
const emit = defineEmits<{
  (e: 'update:canyonControlLevelEmit', value: CanyonControlLevel): void
  (e: 'delete', canyonControlLevel: CanyonControlLevel): void
}>()

const imageUrl = ref<string | undefined>(undefined)

const openForm = ref(false)
const localCanyonControlLevel = ref<CanyonControlLevel | undefined>(props.canyonControlLevel)

const deleteCanyonControlLevel = () => {
  emit('delete', props.canyonControlLevel!)
}

const updateCanyonControlLevel = (canyonControlLevel: CanyonControlLevel) => {
  localCanyonControlLevel.value = canyonControlLevel
}

watch(
  localCanyonControlLevel,
  (newVal) => {
    if (newVal) {
      emit('update:canyonControlLevelEmit', newVal)
    }
  },
  { deep: true },
)

watchEffect(async () => {
  if (props.canyonControlLevel?.controlPoint) {
    const image: File | undefined = canyonControlLevelControlPointPinia.getImage(
      props.canyonControlLevel.controlPoint,
    )
    if (image) {
      imageUrl.value = URL.createObjectURL(image)
    }
    if (!imageUrl.value) {
      try {
        const response = await imageApi.imagesImageDirGet({
          image: props.canyonControlLevel.controlPoint,
          dir: 'controlPoints',
        })
        imageUrl.value = URL.createObjectURL(response)
      } catch (e) {
        console.error('Error loading image', e)
        imageUrl.value = undefined
      }
    }
  }
})
</script>
