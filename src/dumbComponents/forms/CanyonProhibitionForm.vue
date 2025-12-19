<template>
  <v-container>
    <v-card>
      <v-col>
        <v-row>
          <v-text-field
            v-model="description"
            class="input-group--focused"
            label="Descripcion de la prohibición"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-btn @click="close">Cerrar</v-btn>
          <v-btn @click="save">Guardar</v-btn>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>
<script lang="ts" setup>
import type { CanyonProhibition } from '@/api'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    update?: boolean
    canyonProhibitions?: Array<CanyonProhibition>
    canyonProhibition?: CanyonProhibition
  }>(),
  {
    canyonProhibition: () => ({}),
  },
)

const emit = defineEmits<{
  (e: 'update:canyonProhibitionEmit', value: CanyonProhibition): void
  (e: 'update:canyonProhibitions', value: CanyonProhibition[]): void
  (e: 'close'): void
}>()

const description = ref(props.canyonProhibition.description)

const save = () => {
  if (props.update) {
    const canyonProhibitionDeclared: CanyonProhibition = {
      canyonId: props.canyonProhibition.canyonId,
      description: description.value,
    }
    emit('update:canyonProhibitionEmit', canyonProhibitionDeclared)
    emit('close')
  } else {
    const newProhibition: CanyonProhibition = {
      description: description.value ?? '',
    }

    const updatedList = [...(props.canyonProhibitions ?? []), newProhibition]
    emit('update:canyonProhibitions', updatedList)
    emit('close')
  }
}

const close = () => {
  emit('close')
}
</script>
