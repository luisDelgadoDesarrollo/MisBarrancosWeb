<template>
  <v-file-input
    clearable
    label="Foto de perfil"
    accept="image/*"
    v-model="model"
    :readonly="props.readonly"
  />

  <div v-if="previewImage">
    <img :src="previewImage" />
  </div>
</template>
<script setup lang="ts">
import { imageToStr } from '@/utils/Mapper'
import { ref, watch } from 'vue'

const model = defineModel<File | null>()
const props = defineProps<{
  readonly?: boolean
}>()

const previewImage = ref('')

watch(model, (file) => {
  previewImage.value = imageToStr(file)
})
</script>
