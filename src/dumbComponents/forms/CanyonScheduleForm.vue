<template>
  <v-container>
    <v-card>
      <v-col>
        <v-row>
          <v-text-field v-model="car" class="input-group--focused" label="Coches"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="approach"
            class="input-group--focused"
            label="Aproximacion"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="descent"
            class="input-group--focused"
            label="Descenso"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="_return"
            class="input-group--focused"
            label="Retorno"
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
import type { CanyonSchedule } from '@/api'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    update?: boolean
    canyonSchedules?: Array<CanyonSchedule>
    canyonSchedule?: CanyonSchedule
  }>(),
  {
    canyonSchedule: () => ({}),
  },
)

const emit = defineEmits<{
  (e: 'update:canyonScheduleEmit', value: CanyonSchedule): void
  (e: 'update:canyonSchedules', value: CanyonSchedule[]): void
  (e: 'close'): void
}>()

const _return = ref(props.canyonSchedule._return)
const approach = ref(props.canyonSchedule.approach)
const car = ref(props.canyonSchedule.car)
const descent = ref(props.canyonSchedule.descent)

const save = () => {
  if (props.update) {
    const canyonScheduleDeclared: CanyonSchedule = {
      canyonId: props.canyonSchedule.canyonId,
      _return: _return.value,
      approach: approach.value,
      car: car.value,
      descent: descent.value,
    }
    emit('update:canyonScheduleEmit', canyonScheduleDeclared)
    emit('close')
  } else {
    const newSchedule: CanyonSchedule = {
      _return: _return.value ?? '',
      approach: approach.value ?? '',
      car: car.value ?? 1,
      descent: descent.value ?? '',
    }

    const updatedList = [...(props.canyonSchedules ?? []), newSchedule]
    emit('update:canyonSchedules', updatedList)
    emit('close')
  }
}

const close = () => {
  emit('close')
}
</script>
