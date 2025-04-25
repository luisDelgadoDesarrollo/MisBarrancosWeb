<template>
  <v-sheet :elevation="24" class="w-full">
    <v-form fast-fail>
      <v-container>
        <v-text-field v-model="userCreate.email" :rules="[emailValidate(userCreate.email ?? '')]">
          <template #label> Email <span style="color: red">*</span> </template>
        </v-text-field>

        <v-text-field
          v-model="userCreate.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[validateLengthPassword]"
          :type="show1 ? 'password' : 'text'"
          class="input-group--focused"
          @click:append="show1 = !show1"
          aria-required="true"
        >
          <template #label> Contraseña <span style="color: red">*</span> </template></v-text-field
        >

        <v-text-field
          v-model="passwordCopy"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[]"
          :type="show2 ? 'password' : 'text'"
          class="input-group--focused"
          @click:append="show2 = !show2"
        >
          <template #label>
            Repite contraseña <span style="color: red">*</span>
          </template></v-text-field
        >

        <v-text-field v-model="userCreate.name" :counter="250" :rules="[maxLongitud(250)]">
          <template #label> Nombre <span style="color: red">*</span> </template>
        </v-text-field>

        <v-text-field
          v-model="userCreate.lastName"
          :counter="250"
          :rules="[maxLongitud(250)]"
          label="Apellido"
        ></v-text-field>

        <DatePickerD v-model="date"></DatePickerD>

        <v-text-field
          v-model="userCreate.location"
          :rules="[maxLongitud(250)]"
          label="Poblacion"
        ></v-text-field>

        <v-text-field
          v-model="userCreate.description"
          :counter="2000"
          :rules="[maxLongitud(2000)]"
          label="Descripcion"
        ></v-text-field>

        <v-row class="d-flex flex-row pa-4" justify="space-between">
          <!-- Botones con texto para pantallas grandes -->
          <v-btn v-if="!isMobile" color="warning" @click="deleteForm">Borrar todo</v-btn>
          <v-btn v-if="!isMobile" color="success" @click="sendForm">Enviar</v-btn>

          <!-- Iconos para pantallas pequeñas -->
          <v-btn v-if="isMobile" color="warning" @click="deleteForm">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn v-if="isMobile" color="success" @click="sendForm">
            <v-icon>mdi-send</v-icon>
          </v-btn>
          <v-snackbar
            :timeout="2000"
            color="error"
            variant="tonal"
            elevation="12"
            v-model="createAccountFail"
          >
            {{ createAccountFailText }}
          </v-snackbar>
        </v-row>
      </v-container>
    </v-form>
  </v-sheet>

  <v-dialog v-model="userCreated" centered max-width="500px">
    <template #default>
      <div class="pa-4 rounded-lg bg-surface text-on-surface">
        <h1>Usuario creado</h1>
        <p>
          La cuenta ha sido creada, solo falta la verificación, recibirás un correo con las
          indicaciones. Si no lo ves revisa la capreta de spam.
        </p>
      </div></template
    ></v-dialog
  >
  <v-dialog v-model="userCreatedFail" centered max-width="500px" class="elevation-10">
    <template #default>
      <div class="pa-4 rounded-lg bg-surface text-on-surface">
        <h1>Fallo en los datos</h1>
        <p>
          Los datos que has enviado son incorrectos. Rellena el formulario correctamente y vuelve a
          intentarlo, en caso de que los campos obligatorios esten rellenos, asegurese de que el
          correo es correcto.
        </p>
      </div></template
    ></v-dialog
  >
</template>

<script setup lang="ts">
import { type CreateUserRequest, UserApi, type UserCreate } from '@/api'
import { onMounted, ref } from 'vue'
import {
  maxLongitud,
  emailValidate,
  validateEqualPassword,
  runValidations,
  validateLengthPassword,
  validateRequired,
} from '@/utils/Validations.ts'
import { useAuthDialog } from '@/stores/dialogs'
import DatePickerD from '../DatePickerD.vue'
import { watch } from 'vue'
import { isMobileCheck } from '@/utils/Responsive'

const authDialog = useAuthDialog()

const userApi = new UserApi()

const date = ref<Date | undefined>(undefined)
const passwordCopy = ref('')
const userCreate = ref<UserCreate>({
  email: '',
  password: '',
  name: '',
  lastName: '' as string | undefined,
  location: '' as string | undefined,
  description: '' as string | undefined,
  birthDay: date.value ? new Date(date.value) : undefined,
})
const createUserRequest: CreateUserRequest = {
  userCreate: userCreate.value,
}
const userCreated = ref(false)
const userCreatedFail = ref(false)
const show1 = ref(true)
const show2 = ref(true)
const createAccountFail = ref(false)
const createAccountFailText = ref('')
const isMobile = ref(isMobileCheck())

const deleteForm = () => {
  userCreate.value.email = ''
  userCreate.value.name = ''
  userCreate.value.lastName = ''
  userCreate.value.password = ''
  passwordCopy.value = ''
  userCreate.value.location = ''
  userCreate.value.description = ''
  date.value = undefined
}

onMounted(() => {
  window.addEventListener('resize', isMobileCheck)
})

watch(userCreated, (newVal, oldVal) => {
  if (oldVal === true && newVal === false) {
    authDialog.toogleAuthDialog()
  }
})

async function sendForm() {
  const resultValidations = runValidations([
    () => validateRequired(userCreate.value.email),
    () => validateRequired(userCreate.value.name),
    () => validateRequired(userCreate.value.password),
    () => maxLongitud(250)(userCreate.value.name!),
    () => maxLongitud(2000)(userCreate.value.description ?? ''),
    () => maxLongitud(250)(userCreate.value.location ?? ''),
    () => maxLongitud(250)(userCreate.value.lastName ?? ''),
    () => emailValidate(userCreate.value.email!),
    () => validateLengthPassword(userCreate.value.password!),
    () => validateEqualPassword(userCreate.value.password!, passwordCopy.value),
  ])
  if (resultValidations === true) {
    try {
      await userApi.createUser(createUserRequest)
      userCreated.value = true
    } catch {
      userCreatedFail.value = true
    }
  } else {
    createAccountFailText.value = resultValidations
    createAccountFail.value = true
  }
}
</script>

<style scoped></style>
