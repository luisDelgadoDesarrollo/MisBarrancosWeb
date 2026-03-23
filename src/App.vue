<template>
  <div class="app-layout">
    <header>
      <HeaderD />
    </header>

    <main class="main-content">
      <router-view />
      <AdModal v-if="ad?.adId" :ad="ad"></AdModal>
    </main>

    <footer>
      <FooterD />
    </footer>
  </div>
</template>

<script setup lang="ts">
import HeaderD from './dumbComponents/HeaderD.vue'
import FooterD from './dumbComponents/FooterD.vue'
import AdModal from './dumbComponents/modal/AdModal.vue'
import { type Ad } from './api'
import { onMounted, ref } from 'vue'
import { adApi } from './api/apiConfig'

const ad = ref<Ad | undefined>(undefined)

onMounted(async () => {
  const today = new Date().toISOString().slice(0, 10)
  const result = await adApi.getAdByDate({ date: today })
  if (result && result.adId) {
    ad.value = result
  } else {
    ad.value = undefined
  }
})
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header,
footer {
  flex-shrink: 0;
}

.main-content {
  flex: 1 1 auto;
  overflow: auto;
}

/* Escritorio */
@media (min-width: 1024px) {
  .app-layout {
    overflow: hidden;
  }

  .main-content {
    overflow-y: auto;
  }
}

/* Móvil: ocultar footer */
@media (max-width: 1023px) {
  footer {
    display: none;
  }
}
</style>
