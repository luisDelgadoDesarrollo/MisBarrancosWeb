<template>
  <v-sheet class="mx-auto pa-4" max-width="800">
    <v-row class="pa-4 align-center justify-space-between">
      <h1 class="text-h5">Perfil</h1>
      <v-btn icon @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" class="d-flex justify-center">
        <ImageD :image="profileImage" dir="user" />
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field label="Nombre" v-model="user.name" :readonly="readonly" />
        <v-text-field label="Apellidos" v-model="user.lastName" :readonly="readonly" />
      </v-col>
    </v-row>

    <v-text-field label="Población" v-model="user.location" :readonly="readonly" />
    <v-text-field label="Descripción" v-model="user.description" :readonly="readonly" />
    <DatePickerD v-model="user.birthDay" :readonly="readonly" />
    <v-text-field label="Edad" v-model="user.age" :readonly="readonly" />
    <v-text-field label="Guía" v-model="user.guia" :readonly="readonly" />
    <ImagePickerD v-model="newImage" :readonly="readonly" />

    <v-row class="pa-4" justify="space-between">
      <template v-if="!isMobile">
        <v-btn @click="closeSession()">Cerrar sesión</v-btn>
        <v-btn color="warning" @click="readonly = !readonly">Modificar</v-btn>
        <v-btn color="success" :readonly="readonly" @click="updateUser">Enviar</v-btn>
      </template>

      <template v-else>
        <v-btn icon @click="closeSession()"><v-icon>mdi-logout</v-icon></v-btn>
        <v-btn icon color="warning" @click="updateUser"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon color="success" :readonly="readonly" @click="readonly = !readonly"
          ><v-icon>mdi-send</v-icon></v-btn
        >
      </template>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import { type UserOut } from '@/api'
import { getUserWithAuth, upsateUserWithAuth } from '@/authCalls/UserCalls'
import { isMobileCheck } from '@/utils/Responsive'
import { onMounted, ref } from 'vue'
import DatePickerD from './DatePickerD.vue'
import ImagePickerD from './ImagePickerD.vue'
import ImageD from './ImageD.vue'
import { maxLongitud, runValidations, validateRequired } from '@/utils/Validations'

const model = defineModel<boolean>()
const isMobile = ref(isMobileCheck())
const readonly = ref(true)
const newImage = ref<File | undefined>()
const user = ref<UserOut>({
  email: '',
  name: '',
  lastName: '' as string | undefined,
  location: '' as string | undefined,
  description: '' as string | undefined,
  birthDay: undefined,
})
const profileImage = ref()
onMounted(async () => {
  try {
    const response = await getUserWithAuth({ email: localStorage.getItem('email')! })
    if (response) {
      user.value = response
      profileImage.value = user.value.email
    }
  } catch (e) {
    console.error('Error al obtener usuario:', e)
  }
})

const updateUser = async () => {
  const resultValidations = runValidations([
    () => validateRequired(user.value.name),
    () => maxLongitud(250)(user.value.name!),
    () => maxLongitud(2000)(user.value.description ?? ''),
    () => maxLongitud(250)(user.value.location ?? ''),
    () => maxLongitud(250)(user.value.lastName ?? ''),
  ])
  if (resultValidations === true) {
    await upsateUserWithAuth({
      email: user.value.email!,
      simpleUser: {
        email: user.value.email,
        name: user.value.name,
        lastName: user.value.lastName,
        location: user.value.location,
        description: user.value.description,
        birthDay: user.value.birthDay,
      },
    })
  }
}

const closeSession = () => {
  localStorage.removeItem('email')
  localStorage.removeItem('authCredentials')
  model.value = false
}
const close = () => {
  model.value = false
  readonly.value = true
}
</script>
