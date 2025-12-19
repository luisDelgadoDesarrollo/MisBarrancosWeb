<template>
  <!-- Contenedor responsive -->
  <div class="pa-6 mx-auto" style="max-width: 420px; width: 100%;">
    <!-- Imagen centrada -->
    <figure class="d-flex justify-center mb-6">
      <img
        src="/canyoningIcon.jpg"
        alt="ImagenRecueprarContraseña"
        class="rounded"
        style="max-width: 150px;"
      />
    </figure>

    <!-- Contenido -->
    <div>
      <h2 class="text-center mb-6">Recuperar contraseña</h2>

       <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[validateLengthPassword]"
          :type="show1 ? 'password' : 'text'"
          class="input-group--focused"
          @click:append="show1 = !show1"
          aria-required="true"
        />

        <v-text-field
          v-model="confirmPassword"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[validateLengthPassword]"
          :type="show2 ? 'password' : 'text'"
          class="input-group--focused"
          @click:append="show2 = !show2"
          aria-required="true"
        />

    </div>

    <!-- Botón alineado a la derecha -->
    <v-row justify="end">
      <v-btn color="primary" @click="updatePassword">Enviar</v-btn>
    </v-row>
  </div>

  <v-dialog v-model="showModal" max-width="400">
    <v-alert :title="title" :text="description"
  closable
  @click:close="close"></v-alert>
  </v-dialog>
</template>

<script setup lang="ts">
import { UserApi } from "@/api";
import { ref } from "vue";
import { runValidations, validateEqualPassword, validateLengthPassword } from "@/utils/Validations";
import { useRoute, useRouter } from "vue-router";
const userApi = new UserApi()
const route = useRoute()
const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const showModal = ref(false)
const title = ref('')
const description = ref('')
const show1 = ref(true)
const show2 = ref(true)

const updatePassword = async () => {
  const validateForm = runValidations([
    () => validateEqualPassword(password.value, confirmPassword.value),
    () => validateLengthPassword(password.value)
  ])


  //todo -> validar formilario, depende el exito de la operacion abrir una modal uy otra
  if(validateForm === true){
    try{
    await userApi.updatePassword({email: route.params.email.toString(), token: route.params.token.toString(), updatePasswordRequest: {password: password.value}})
    title.value = "Éxito!"
    description.value = "Contraseña cambiada con éxito"
    showModal.value = true
    }catch(error){
      console.log(error)
      title.value = "Error"
      description.value = "Algo fue mal al cambiar la contraseña, pongase en contacto con misbarrancos@gmail.com"
      showModal.value = true
    }
  }else{
      password.value = ""
      confirmPassword.value = ""
      title.value = "Error"
      description.value = "Las contraseñas no son iguales, o no tienen la longitud necesaria"
      showModal.value = true
  }
}

const close = () => {
  console.log(title.value === "Éxito!")
  showModal.value = false
  if(title.value === "Éxito!"){
    router.push({
    name: 'canyons',
  })
  }
}
</script>

