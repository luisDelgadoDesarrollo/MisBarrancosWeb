<template>
  <div v-if="imageStr" class="image-container">
    <img :src="imageStr" class="responsive-image" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getImage } from '@/calls/ImageCalls'
import { imageToStr } from '@/utils/Mapper'

const props = defineProps<{
  image?: string
  dir: string
}>()

const imageStr = ref('')
watch(
  () => props.image,
  async (image) => {
    imageStr.value = '' // Limpia antes de intentar cargar una nueva

    if (image) {
      try {
        const imageBlob = await getImage({ image, dir: props.dir })

        if (imageBlob && imageBlob.size > 0) {
          imageStr.value = await imageToStr(imageBlob)
        } else {
          console.warn('Imagen vacía o no encontrada')
        }
      } catch (error) {
        console.error('Error al obtener la imagen:', error)
      }
    }
  },
  { immediate: true },
)
</script>
<style scoped>
.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.responsive-image {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
