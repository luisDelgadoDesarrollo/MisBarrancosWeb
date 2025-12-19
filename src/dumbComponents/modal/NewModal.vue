<template>
  <div v-if="newData?.articleId === 0">
    <h2 style="color: red">⚠️ Error: La noticia no existe o no se pudo cargar.</h2>
  </div>

  <div v-else class="page-container">
    <div v-if="isMobileCheck()">
      <v-col class="info-column">
        <v-row class="mb-4" align="center" justify="space-between">
          <h1 class="text-h5 m-0">{{ newData?.title }}</h1>
          <v-btn v-if="userPinia.isUserLogged && newCreatedByTheUserAuth()"
            >Modificar noticia</v-btn
          >
        </v-row>
        <a :href="newData?.link" target="_blank" class="mb-4">Enlace a la noticia</a>
        <!-- Márgenes verticales entre el enlace y el resto -->

        <h2 class="mt-4">Descripcion</h2>
        <!-- Márgenes para separar encabezados -->
        <p class="mb-4">{{ newData?.description }}</p>

        <h2 class="mt-4">Escritor y fecha</h2>
        <p class="mb-4">
          {{ newData?.organizer }}
          <span v-if="newData?.articleDate"
            >, {{ formatDate(newData?.articleDate.toDateString()) }}</span
          >
        </p>

        <h2 class="mt-4">Lugar</h2>
        <p class="mb-4">{{ newData?.location }}</p>
        <v-img :src="imageUrl" alt="No disponemos del croquis" contain />
        <v-row class="d-flex justify-center mt-auto">
          <!-- Añadimos margen superior al contenedor de las redes -->
          <a :href="newData?.instagram" target="_blank" class="mx-2">
            <v-icon>mdi-instagram</v-icon>
          </a>
          <a :href="newData?.tiktok" target="_blank" class="mx-2">
            <v-icon>mdi-music-note-eighth</v-icon>
          </a>
          <a :href="newData?.facebook" target="_blank" class="mx-2">
            <v-icon>mdi-facebook</v-icon>
          </a>
          <a :href="newData?.twitter" target="_blank" class="mx-2">
            <v-icon>mdi-alpha-x</v-icon>
          </a>
        </v-row>
      </v-col>
    </div>
    <div v-else>
      <!-- Contenedor principal con flexbox para todo el contenido -->
      <v-row
        no-gutters
        class="d-flex flex-column"
        align-content="start"
        justify="space-between"
        style="height: 100vh"
      >
        <!-- Información a la izquierda -->
        <v-col class="info-column" cols="12" md="6" style="padding-right: 20px">
          <v-row class="mb-4" align-content="center" justify="space-between">
            <h1 class="text-h5 m-0">{{ newData?.title }}</h1>
            <v-btn v-if="userPinia.isUserLogged && newCreatedByTheUserAuth()"
              >Modificar noticia</v-btn
            >
          </v-row>

          <a :href="newData?.link" target="_blank" class="mb-4">Enlace a la noticia</a>
          <!-- Márgenes verticales entre el enlace y el resto -->

          <h2 class="mt-4">Descripcion</h2>
          <!-- Márgenes para separar encabezados -->
          <p class="mb-4">{{ newData?.description }}</p>

          <h2 class="mt-4">Escritor y fecha</h2>
          <p class="mb-4">
            {{ newData?.organizer }}
            <span v-if="newData?.articleDate"
              >, {{ formatDate(newData?.articleDate.toDateString()) }}</span
            >
          </p>

          <h2 class="mt-4">Lugar</h2>
          <p class="mb-4">{{ newData?.location }}</p>

          <!-- Redes sociales al final -->
          <v-row class="d-flex justify-center mt-auto">
            <!-- Añadimos margen superior al contenedor de las redes -->
            <a :href="newData?.instagram" target="_blank" class="mx-2">
              <v-icon>mdi-instagram</v-icon>
            </a>
            <a :href="newData?.tiktok" target="_blank" class="mx-2">
              <v-icon>mdi-music-note-eighth</v-icon>
            </a>
            <a :href="newData?.facebook" target="_blank" class="mx-2">
              <v-icon>mdi-facebook</v-icon>
            </a>
            <a :href="newData?.twitter" target="_blank" class="mx-2">
              <v-icon>mdi-alpha-x</v-icon>
            </a>
          </v-row>
        </v-col>

        <!-- Foto a la derecha -->
        <v-col class="croquis-wrapper" cols="12" md="6">
          <v-img :src="imageUrl" alt="No disponemos del croquis" class="croquis-image" contain />
        </v-col>

        <!-- Redes sociales al centro, abajo -->
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { ImageApi } from '@/api'
import { useNewStore } from '@/stores/new'
import { formatDate } from '@/utils/Mapper'
import { isMobileCheck } from '@/utils/Responsive'
import { useUserStore } from '@/stores/user'
const route = useRoute()
const newPinia = useNewStore()
const imageApi = new ImageApi()
const userPinia = useUserStore()
onMounted(async () => {
  if (
    newPinia.getArticle() == null ||
    newPinia.getArticle()?.articleId != Number(route.params.id)
  ) {
    await newPinia.loadArticle(Number(route.params.id))
  }
})
const newData = computed(() => newPinia.getArticle() ?? {})
const imageUrl = ref<string | undefined>(undefined)

const newCreatedByTheUserAuth = () => {
  return localStorage.getItem('email') === newPinia.getArticle()?.createdBy
}

watchEffect(async () => {
  if (newData.value?.image) {
    try {
      const response = await imageApi.imagesImageDirGet({
        image: newData.value.image,
        dir: 'article',
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
  justify-content: space-between;
  padding: 20px;
}

.info-column {
  padding: 10px;
}

.croquis-wrapper {
  width: 100%;
  height: 100%;
}

.croquis-image {
  width: 100%;
  height: 100%;
}

.v-row {
  width: 100%;
}
</style>
