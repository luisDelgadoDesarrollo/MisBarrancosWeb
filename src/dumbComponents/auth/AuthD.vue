<template>
  <v-card class="auth-container" max-width="800px" mx-auto>
    <div v-if="isMobile" class="d-flex">
      <v-btn @click="tab = 'one'" :color="tab === 'one' ? 'primary' : ''" class="flex-grow-1">
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn @click="tab = 'two'" :color="tab === 'two' ? 'primary' : ''" class="flex-grow-1">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </div>

    <div v-else class="d-flex">
      <v-tabs v-model="tab" bg-color="info" class="flex-grow-1">
        <v-tab value="one" class="flex-grow-1">Entrar con tu cuenta</v-tab>
        <v-tab value="two" class="flex-grow-1">Crear cuenta!</v-tab>
      </v-tabs>
    </div>

    <v-card-text>
      <v-tabs-window v-model="tab" class="tabs-content">
        <v-tabs-window-item value="one" bg-color="info">
          <LogIn />
        </v-tabs-window-item>
        <v-tabs-window-item value="two">
          <SignUp />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SignUp from './SignUpD.vue'
import LogIn from './LogInD.vue'
import { isMobileCheck } from '@/utils/Responsive'

const tab = ref('one')
const isMobile = ref(isMobileCheck())

onMounted(() => {
  window.addEventListener('resize', isMobileCheck)
})
</script>

<style scoped>
.auth-container {
  width: 100%;
}
</style>
