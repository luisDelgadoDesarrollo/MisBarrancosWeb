<template>
  <v-card class="ma-4 pa-4" outlined>
    <v-card-title class="text-h6"
      ><v-row justify="space-between">
        Paso {{ localCanyonRappeling?.step }} — {{ localCanyonRappeling?.stepType }}
        <div>
          <v-btn v-if="props.updatable" @click="openForm = true">Editar </v-btn>
          <v-btn v-if="props.updatable" @click="deleteCanyonRappeling">Borrar</v-btn>
        </div>
      </v-row>
    </v-card-title>

    <v-card-text>
      <div><strong>Ubicación:</strong> {{ localCanyonRappeling?.location }}</div>
      <div><strong>Longitud:</strong> {{ localCanyonRappeling?.length }}</div>
      <div><strong>Descripción:</strong> {{ localCanyonRappeling?.description }}</div>
    </v-card-text>

    <v-dialog v-model="openForm">
      <CanyonRappelingForm
        :update="true"
        :canyonRappeling="localCanyonRappeling"
        @update:canyonRappelingEmit="updateCanyonRappeling"
        @close="openForm = false"
      ></CanyonRappelingForm>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import type { CanyonRappeling } from '@/api'
import { ref, watch } from 'vue'
import CanyonRappelingForm from '../forms/CanyonRappelingForm.vue'

const props = defineProps<{
  canyonRappeling?: CanyonRappeling
  updatable?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:canyonRappelingEmit', value: CanyonRappeling): void
  (e: 'delete', canyonRappeling: CanyonRappeling): void
}>()
const localCanyonRappeling = ref<CanyonRappeling | undefined>(props.canyonRappeling)
const openForm = ref(false)

const deleteCanyonRappeling = () => {
  emit('delete', props.canyonRappeling!)
}

const updateCanyonRappeling = (canyonUpdated: CanyonRappeling) => {
  localCanyonRappeling.value = canyonUpdated
}

watch(
  localCanyonRappeling,
  (newVal) => {
    if (newVal) {
      emit('update:canyonRappelingEmit', newVal)
    }
  },
  { deep: true },
)
</script>
