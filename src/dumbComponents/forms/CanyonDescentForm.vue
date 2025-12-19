<template>
  <v-container>
    <v-card>
      <v-col>
        <v-row>
          <v-text-field
            v-model="equipment"
            class="input-group--focused"
            label="Equipamiento"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="length"
            class="input-group--focused"
            label="Longitud"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="maxLength"
            class="input-group--focused"
            label="Maxima longitud de rapel"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="rapelNum"
            class="input-group--focused"
            label="Numero de rapeles"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="slope"
            class="input-group--focused"
            label="Desnivel"
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
import type { CanyonDescent } from '@/api'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    update?: boolean
    canyonDescents?: Array<CanyonDescent>
    canyonDescent?: CanyonDescent
  }>(),
  {
    canyonDescent: () => ({
      canyonId: undefined,
      length: '',
      slope: '',
      rapelNum: '',
      maxLength: '',
      equipment: '',
    }),
  },
)

const emit = defineEmits<{
  (e: 'update:canyonDescentEmit', value: CanyonDescent): void
  (e: 'update:canyonDescents', value: CanyonDescent[]): void
  (e: 'close'): void
}>()

const equipment = ref(props.canyonDescent?.equipment)
const length = ref(props.canyonDescent?.length)
const maxLength = ref(props.canyonDescent?.maxLength)
const rapelNum = ref(props.canyonDescent?.rapelNum)
const slope = ref(props.canyonDescent?.slope)

const save = () => {
  if (props.update) {
    const descentCanyonDeclared: CanyonDescent = {
      canyonId: props.canyonDescent.canyonId,
      equipment: equipment.value,
      length: length.value,
      maxLength: maxLength.value,
      rapelNum: rapelNum.value,
      slope: slope.value,
    }
    emit('update:canyonDescentEmit', descentCanyonDeclared)
    emit('close')
  } else {
    const newDescent: CanyonDescent = {
      equipment: equipment.value ?? '',
      length: length.value ?? '',
      maxLength: maxLength.value ?? '',
      rapelNum: rapelNum.value ?? '',
      slope: slope.value ?? '',
    }

    const updatedList = [...(props.canyonDescents ?? []), newDescent]

    emit('update:canyonDescents', updatedList)
    emit('close')
  }
}

const close = () => {
  emit('close')
}
</script>
