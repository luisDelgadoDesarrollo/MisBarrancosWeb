<template>
  <v-container>
    <v-card>
      <v-col>
        <v-row>
          <v-text-field v-model="title" class="input-group--focused" label="Titulo"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="link"
            class="input-group--focused"
            label="Enlace"
            :rules="[isLink]"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-btn @click="close">Cerrar</v-btn>
          <v-btn @click="save">Guardar</v-btn>
          <v-snackbar
            :timeout="2000"
            color="error"
            variant="tonal"
            elevation="12"
            v-model="canyonLinkFormFail"
          >
            {{ canyonLinkFormFailText }}
          </v-snackbar>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>
<script lang="ts" setup>
import type { CanyonLink } from '@/api'
import { ref } from 'vue'
import { isLink, runValidations } from '@/utils/Validations'

const props = withDefaults(
  defineProps<{
    update?: boolean
    canyonLinks?: Array<CanyonLink>
    canyonLink?: CanyonLink
  }>(),
  {
    canyonLink: () => ({}),
  },
)

const emit = defineEmits<{
  (e: 'update:canyonLinkEmit', value: CanyonLink): void
  (e: 'update:canyonLinks', value: CanyonLink[]): void
  (e: 'close'): void
}>()

const link = ref(props.canyonLink.link)
const title = ref(props.canyonLink.title)
const canyonLinkFormFail = ref(false)
const canyonLinkFormFailText = ref('')

const resultValidations = () => {
  return runValidations([() => isLink(link.value)])
}

const save = () => {
  const result = resultValidations()
  if (result === true) {
    if (props.update) {
      const canyonLinkDeclared: CanyonLink = {
        canyonId: props.canyonLink.canyonId,
        link: link.value,
        title: title.value,
      }
      emit('update:canyonLinkEmit', canyonLinkDeclared)
      emit('close')
    } else {
      const newLink: CanyonLink = {
        link: link.value ?? '',
        title: title.value ?? '',
      }

      const updatedList = [...(props.canyonLinks ?? []), newLink]
      emit('update:canyonLinks', updatedList)
      emit('close')
    }
  } else {
    canyonLinkFormFail.value = true
    canyonLinkFormFailText.value = result
  }
}

const close = () => {
  emit('close')
}
</script>
