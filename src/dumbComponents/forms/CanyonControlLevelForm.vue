<template>
  <v-container>
    <v-card>
      <v-col>
        <v-row>
          <v-text-field
            v-model="name"
            class="input-group--focused"
            label="Como encontrear el punto de control"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="caudalLevel"
            class="input-group--focused"
            label="Como saber el nivel"
          ></v-text-field>
        </v-row>
        <ImagePickerD v-model="newImage" />
        <v-row>
          <v-btn @click="close">Cerrar</v-btn>
          <v-btn @click="save">Guardar</v-btn>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>
<script lang="ts" setup>
import type { CanyonControlLevel } from '@/api'
import { v4 as uuidv4 } from 'uuid'

import { ref } from 'vue'
import ImagePickerD from '../ImagePickerD.vue'
import { createImageStore } from '@/stores/images'

const canyonControlLevelControlPointPinia = createImageStore('canyonControlLevelImages')()

const props = withDefaults(
  defineProps<{
    update?: boolean
    canyonControlLevel?: CanyonControlLevel
    canyonControlLevels?: Array<CanyonControlLevel>
  }>(),
  {
    canyonControlLevel: () => ({
      canyonId: undefined,
      name: '',
      caudalLevel: '',
      controlPoint: undefined,
    }),
  },
)

const emit = defineEmits<{
  (e: 'update:canyonControlLevelEmit', value: CanyonControlLevel): void
  (e: 'update:canyonControlLevels', value: CanyonControlLevel[]): void
  (e: 'close'): void
}>()

const name = ref(props.canyonControlLevel.name)
const caudalLevel = ref(props.canyonControlLevel.caudalLevel)

const newImage = ref<File | undefined>()

const save = () => {
  if (props.update) {
    const canyonControlLevelUpdate: CanyonControlLevel = {
      canyonId: props.canyonControlLevel.canyonId,
      name: name.value,
      caudalLevel: caudalLevel.value,
      controlPoint: props.canyonControlLevel.controlPoint,
    }
    if (newImage.value && props.canyonControlLevel.controlPoint) {
      canyonControlLevelControlPointPinia.addImage(
        props.canyonControlLevel.controlPoint,
        newImage.value,
      )
    }
    emit('update:canyonControlLevelEmit', canyonControlLevelUpdate)
    emit('close')
  } else {
    const controlPoint = uuidv4()
    const newCanyonControllevel: CanyonControlLevel = {
      name: name.value,
      caudalLevel: caudalLevel.value,
      controlPoint: controlPoint,
    }

    if (newImage.value && newCanyonControllevel.controlPoint) {
      canyonControlLevelControlPointPinia.addImage(
        newCanyonControllevel.controlPoint,
        newImage.value,
      )
    }

    const updateList = [...(props.canyonControlLevels ?? []), newCanyonControllevel]

    emit('update:canyonControlLevels', updateList)
    emit('close')
  }
}

const close = () => {
  emit('close')
}
</script>
