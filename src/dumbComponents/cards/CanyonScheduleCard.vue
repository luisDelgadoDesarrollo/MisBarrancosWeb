<template>
  <v-card class="ma-4 pa-4" outlined>
    <v-card-title class="text-h6">
      <v-row>
        Coches {{ localCanyonSchedule?.car }}
        <div>
          <v-btn v-if="props.updatable" @click="openForm = true">Editar </v-btn>
          <v-btn v-if="props.updatable" @click="deleteCanyonSchedule">Borrar</v-btn>
        </div></v-row
      ></v-card-title
    >

    <v-card-text>
      <div><strong>Aproximación:</strong> {{ localCanyonSchedule?.approach }}</div>
      <div><strong>Descenso:</strong> {{ localCanyonSchedule?.descent }}</div>
      <div><strong>Retorno:</strong> {{ localCanyonSchedule?._return }}</div>
    </v-card-text>
    <v-dialog v-model="openForm">
      <CanyonScheduleForm
        :update="true"
        :canyonSchedule="localCanyonSchedule"
        @update:canyonScheduleEmit="updateCanyonSchedule"
        @close="openForm = false"
      ></CanyonScheduleForm>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import type { CanyonSchedule } from '@/api'
import { ref, watch } from 'vue'
import CanyonScheduleForm from '../forms/CanyonScheduleForm.vue'

const props = defineProps<{
  canyonSchedule?: CanyonSchedule
  updatable?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:canyonScheduleEmit', value: CanyonSchedule): void
  (e: 'delete', canyonRappeling: CanyonSchedule): void
}>()

const localCanyonSchedule = ref<CanyonSchedule | undefined>(props.canyonSchedule)
const openForm = ref(false)

const deleteCanyonSchedule = () => {
  emit('delete', props.canyonSchedule!)
}

const updateCanyonSchedule = (canyonScheduleUpdated: CanyonSchedule) => {
  localCanyonSchedule.value = canyonScheduleUpdated
}

watch(
  localCanyonSchedule,
  (newVal) => {
    if (newVal) {
      emit('update:canyonScheduleEmit', newVal)
    }
  },
  { deep: true },
)
</script>
