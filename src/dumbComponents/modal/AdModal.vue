<template>
  <v-dialog v-model="showAd">
    <v-card style="max-height: 90vh">
      <v-col>
        <v-img v-if="props.ad?.image"
          :src="imageUrl"
          alt="No se puede ver la imagen"
          class="ad-image"
          contain @click="goToLink"
        />
        <p v-if="props.ad?.info">{{ props.ad?.info }}</p>
        <p v-if="props.ad?.code"><strong>{{ props.ad?.code }}</strong></p>
        <a v-if="props.ad?.link" :href="props.ad?.link" target="_blank" @click="onLinkClick">Enlace</a>
        <v-row justify="end">
          <v-btn @click="close">Cerrar</v-btn>
        </v-row>
      </v-col>
    </v-card>

  </v-dialog>
</template>
<script setup lang="ts">
import { type Ad } from '@/api';
import { adApi, imageApi } from '@/api/apiConfig';
import { onMounted, ref, watch } from 'vue';

const imageUrl = ref<string | undefined>(undefined)


const onLinkClick = () =>{
  adApi.createAdLog({body: props.ad!.adId!})
}
const props = withDefaults(
  defineProps<{
    ad?: Ad
  }>(),
  {},
)
const showAd = ref(false)
const goToLink = () => {
  onLinkClick()
  if (props.ad?.link) {
    window.open(props.ad.link, '_blank')
  }
}
const close = () => {
  showAd.value = false
}
onMounted(async () => {
  if (props.ad) {
    if (props.ad.image) {
      try {
        const response = await imageApi.imagesImageDirGet({
          image: props.ad.image,
          dir: 'ad',
        })
        imageUrl.value = URL.createObjectURL(response)
      } catch (e) {
        console.error('Error loading image', e)
        imageUrl.value = undefined
      }
    }

    showAd.value = true
  }
})
watch(
  () => props.ad,
  async (newAd) => {
    if (!newAd) return

    // cargar imagen si existe
    if (newAd.image) {
      try {
        const response = await imageApi.imagesImageDirGet({
          image: newAd.image,
          dir: 'ad',
        })
        imageUrl.value = URL.createObjectURL(response)
      } catch (e) {
        console.error('Error loading image', e)
        imageUrl.value = undefined
      }
    }

    // abrir diálogo
    showAd.value = true
  },
  { immediate: true } // 👈 ejecuta la primera vez también
)


</script>
<style scoped>
  .ad-image {
  max-width: 100%;
  max-height: 70vh; /* Ajusta el % de la pantalla que quieres usar */
  object-fit: contain;
}
</style>
