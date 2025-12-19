<template>
  <v-card class="ma-4 pa-4" outlined>
    <v-card-title class="text-h6">
      <v-row justify="space-between"
        >Descenso <v-btn v-if="props.updatable" @click="openForm = true">Editar </v-btn
        ><v-btn v-if="props.updatable" @click="deleteCanyonDescent">Borrar</v-btn></v-row
      >
    </v-card-title>

    <v-card-text>
      <div><strong>Longitud:</strong> {{ localCanyonDescent?.length }}</div>
      <div><strong>Rapel mas largo:</strong> {{ localCanyonDescent?.maxLength }}</div>
      <div><strong>Numero de rapeles:</strong> {{ localCanyonDescent?.rapelNum }}</div>
      <div><strong>Desnivel:</strong> {{ localCanyonDescent?.slope }}</div>
      <div><strong>Equipamiento:</strong> {{ localCanyonDescent?.equipment }}</div>
    </v-card-text>

    <v-dialog v-model="openForm">
      <CanyonDescentForm
        :update="true"
        :canyonDescent="localCanyonDescent"
        @update:canyonDescentEmit="updateCanyonDescent"
        @close="openForm = false"
      ></CanyonDescentForm>
    </v-dialog>
  </v-card>
</template>
<script setup lang="ts">
import type { CanyonDescent } from '@/api'
import { ref, watch } from 'vue'
import CanyonDescentForm from '../forms/CanyonDescentForm.vue'

const props = defineProps<{
  canyonDescent?: CanyonDescent
  updatable?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:canyonDescentEmit', value: CanyonDescent): void
  (e: 'delete', canyonDescent: CanyonDescent): void
}>()
const localCanyonDescent = ref<CanyonDescent | undefined>(props.canyonDescent)
const openForm = ref(false)

const deleteCanyonDescent = () => {
  emit('delete', props.canyonDescent!)
}

const updateCanyonDescent = (canyonUpdated: CanyonDescent) => {
  localCanyonDescent.value = canyonUpdated
}

watch(
  localCanyonDescent,
  (newVal) => {
    if (newVal) {
      emit('update:canyonDescentEmit', newVal)
    }
  },
  { deep: true },
)
</script>
