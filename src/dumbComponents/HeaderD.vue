<template>
  <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title>
        <v-menu v-if="isMobile" location="bottom end" class="pl-0 d-flex align-center">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon>
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn :to="getRoute('canyons')" class="text-decoration-none"
                  >Barrancos</v-btn
                ></v-list-item-title
              >
              <v-list-item-title>
                <v-btn :to="getRoute('map')" class="text-decoration-none"
                  >Mapa</v-btn
                ></v-list-item-title
              >
              <v-list-item-title
                ><v-btn :to="getRoute('articles')" class="text-decoration-none"
                  >Eventos y noticias</v-btn
                ></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
        Mis Barrancos
      </v-toolbar-title>

      <v-btn icon="mdi-account" @click="profileClick"></v-btn>

      <!-- Escritorio: Tabs visibles -->
      <template v-slot:extension v-if="!isMobile">
        <v-tabs v-model="tab" align-tabs="start" class="">
          <!-- Sin color en las tabs -->
          <v-tab :to="getRoute('canyons')" class="text-decoration-none">Barrancos </v-tab>
          <v-tab :to="getRoute('map')" class="text-decoration-none">Mapa </v-tab>
          <v-tab :to="getRoute('articles')" class="text-decoration-none">Eventos y noticias </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="item in items" :key="item" :value="item">
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>

  <v-dialog v-model="authDialog.authDialog" centered max-width="500px">
    <AuthD></AuthD>
  </v-dialog>
  <v-dialog v-model="profile" centered max-width="500px">
    <ProfileD v-model="profile"></ProfileD>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AuthD from './auth/AuthD.vue'
import { useAuthDialog } from '@/stores/dialogs'
import { isMobileCheck } from '@/utils/Responsive'
import ProfileD from './ProfileD.vue'

const tab = ref('Barrancos')
const items = ['Barrancos', 'Mapa', 'Eventos y Noticias']
const text = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit...')

const isMobile = ref(isMobileCheck())
const authDialog = useAuthDialog()
const profile = ref(false)

const profileClick = () => {
  if (localStorage.getItem('authCredentials') && localStorage.getItem('email')) {
    profile.value = true
  } else {
    authDialog.toogleAuthDialog()
  }
}

onMounted(() => {
  window.addEventListener('resize', isMobileCheck)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', isMobileCheck)
})

// Función para obtener la ruta correspondiente según el tab seleccionado
const getRoute = (tab: string) => {
  switch (tab) {
    case 'canyons':
      return '/canyons'
    case 'map':
      return '/map'
    case 'articles':
      return '/articles'
    default:
      return '/'
  }
}
</script>
