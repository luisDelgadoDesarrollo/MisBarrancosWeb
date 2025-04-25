<template>
  <div v-if="imageStr" class="image-container">
    <img :src="imageStr" class="responsive-image" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getImage } from '@/authCalls/ImageCalls'
import { imageToStr } from '@/utils/Mapper'

const props = defineProps<{
  image?: string
  dir: string
}>()

const imageStr = ref('')

watch(
  () => props.image,
  async (image) => {
    if (image) {
      const imageBlob = await getImage({ image: image, dir: props.dir })
      imageStr.value = await imageToStr(imageBlob)
    }
  },
)
</script>
<style scoped>
.image-container {
  width: 100%;
  height: 100%; /* Asegura que ocupe todo el espacio disponible */
  display: flex;
  justify-content: center;
  align-items: center;
}

.responsive-image {
  max-width: 100%; /* Asegura que la imagen no se salga del contenedor */
  height: auto;
  object-fit: cover; /* O use object-fit: contain, dependiendo de tu preferencia */
}
</style>
