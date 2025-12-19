<template>
  <v-card class="ma-4 pa-4">
    <v-card-title class="text-h6">
      <v-row class="text-h6">
        Prohibición
        <div>
          <v-btn v-if="props.updatable" @click="openForm = true">Editar </v-btn>
          <v-btn v-if="props.updatable" @click="deleteCanyonProhibition">Borrar</v-btn>
        </div>
      </v-row>
    </v-card-title>
    <v-card-text>
      {{ localCanyonProhibition?.description }}
    </v-card-text>
    <v-dialog v-model="openForm">
      <CanyonProhibitionForm
        :update="true"
        :canyonProhibition="localCanyonProhibition"
        @update:canyonProhibitionEmit="updateCanyonProhibition"
        @close="openForm = false"
      >
      </CanyonProhibitionForm>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import type { CanyonProhibition } from '@/api'
import { ref, watch } from 'vue'
import CanyonProhibitionForm from '../forms/CanyonProhibitionForm.vue'

const props = defineProps<{
  canyonProhibition?: CanyonProhibition
  updatable?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:canyonProhibitionEmit', value: CanyonProhibition): void
  (e: 'delete', canyonLink: CanyonProhibition): void
}>()

const localCanyonProhibition = ref<CanyonProhibition | undefined>(props.canyonProhibition)
const openForm = ref(false)

const deleteCanyonProhibition = () => {
  emit('delete', props.canyonProhibition!)
}

const updateCanyonProhibition = (canyonProhibitionUpdate: CanyonProhibition) => {
  localCanyonProhibition.value = canyonProhibitionUpdate
}

watch(
  localCanyonProhibition,
  (newVal) => {
    if (newVal) {
      emit('update:canyonProhibitionEmit', newVal)
    }
  },
  { deep: true },
)
</script>
