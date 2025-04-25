<template>
  <v-sheet :elevation="24" class="w-100">
    <v-form>
      <v-container>
        <v-col>
          <v-text-field v-model="login.email" label="Email" required></v-text-field>

          <v-text-field
            v-model="login.updatePasswordRequest.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'password' : 'text'"
            class="input-group--focused"
            label="Contrasena"
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-row class="d-flex justify-space-between">
            <v-btn color="success" class="ma-4" @click="openRememberPassword">
              Recuperar contraseña
            </v-btn>
            <v-btn color="success" class="ma-4" @click="enviar"> Enviar </v-btn>
          </v-row>
        </v-col>
      </v-container>
      <v-snackbar :timeout="2000" color="error" variant="tonal" elevation="12" v-model="errorLogin">
        El usuario o la contraseña son incorrectos, o el usuario no está validado.
      </v-snackbar>
      <v-dialog v-model="rememberPassword" centered max-width="500px">
        <RememberPasswrodD v-model="rememberPassword"></RememberPasswrodD>
      </v-dialog> </v-form
  ></v-sheet>
</template>
<script setup lang="ts">
import { UserApi, type LoginRequest } from '@/api'
import { useAuthDialog } from '@/stores/dialogs'
import { ref } from 'vue'
import RememberPasswrodD from './RememberPasswordD.vue'

const errorLogin = ref(false)
const show1 = ref(true)
const userApi = new UserApi()
const rememberPassword = ref<boolean>(false)

const login = ref<LoginRequest>({
  email: '',
  updatePasswordRequest: { password: '' },
})
const openRememberPassword = () => {
  rememberPassword.value = !rememberPassword.value
}
const enviar = async () => {
  try {
    if (await userApi.login(login.value)) {
      const credentials = btoa(`${login.value.email}:${login.value.updatePasswordRequest.password}`)
      localStorage.setItem('authCredentials', credentials)
      localStorage.setItem('email', login.value.email)
      useAuthDialog().toogleAuthDialog()
    } else {
      errorLogin.value = true
    }
  } catch {
    errorLogin.value = true
  }
}
</script>

<style></style>
