<template>
  <v-container fluid>
    <v-row no-gutters>
      <!-- En móvil -->
      <template v-if="mobile">
        <v-col cols="12" class="relative">
          <!-- Modal visible si hay parámetros -->
          <CanyonModal v-if="hasParams" />

          <!-- InfiniteScroll sigue montado, pero oculto visualmente -->
          <div :class="{ 'invisible-scroll': hasParams }">
            <InfiniteScrollCanyon />
          </div>
        </v-col>
      </template>

      <!-- En escritorio -->
      <template v-else>
        <v-col cols="12" md="3" class="pa-4">
          <InfiniteScrollCanyon />
        </v-col>

        <v-col cols="12" md="9" align-self="center" justify="center">
          <template v-if="hasParams">
            <CanyonModal />
          </template>
          <template v-else>
            <div class="image-container">
              <img src="/icon.png" alt="Montaña" class="responsive-image" />
            </div>
          </template>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import InfiniteScrollCanyon from '@/dumbComponents/infiniteScrolls/InfiniteScrollCanyon.vue'
import CanyonModal from '@/dumbComponents/modal/CanyonModal.vue'
import { useCanyonStore } from '@/stores/canyon'

const route = useRoute()
const { mobile } = useDisplay()
const canyonPinia = useCanyonStore()

const hasParams = computed(() => {
  return Object.keys(route.params).length > 0 || Object.keys(route.query).length > 0
})

onMounted(() => {
  if (hasParams.value && canyonPinia.getCanyon() == null) {
    canyonPinia.loadCanyon(Number(route.params.id))
  }
})

const dialog = ref(false)

watch([mobile, hasParams], ([isMobile, hasP]) => {
  dialog.value = isMobile && hasP
})
</script>
<style scoped>
.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.invisible-scroll {
  visibility: hidden;
  height: 0;
  overflow: hidden;
}

.responsive-image {
  max-width: 100vw;
  max-height: 100vh;
  object-fit: contain;
}
</style>
