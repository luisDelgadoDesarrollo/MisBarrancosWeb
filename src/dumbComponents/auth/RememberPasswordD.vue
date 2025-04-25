<template>
  <v-sheet class="pa-4">
    <p>
      Introduce el correo electrónico del usuario del que has olvidado la contraseña. Si el usuario
      existe y está validado, se enviará un correo para recuperarla. Si sigues teniendo problemas,
      ponte en contacto con misbarrancos@gmail.com.
    </p>
    <v-text-field label="Email" v-model="email"></v-text-field>

    <v-row class="d-flex flex-row-reverse">
      <v-btn @click="sendRequestUpdatePassword()">Enviar</v-btn>
    </v-row>
  </v-sheet>
</template>
<script setup lang="ts">
import { UserApi } from '@/api'
import { ref } from 'vue'

const model = defineModel<boolean>()
const userApi = new UserApi()
const email = ref('')

function sendRequestUpdatePassword() {
  userApi.requestUpdatePassword({ email: email.value })
  model.value = false
}
</script>
