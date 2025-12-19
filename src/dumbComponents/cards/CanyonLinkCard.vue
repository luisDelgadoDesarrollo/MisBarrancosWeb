<template>
  <v-card class="ma-4 pa-4" outlined @click="openLink" style="cursor: pointer">
    <v-card-title class="text-h6">
      <v-row>
        {{ localCanyonLink?.title }}
        <div>
          <v-btn v-if="props.updatable" @click="openForm = true">Editar </v-btn>
          <v-btn v-if="props.updatable" @click="deleteCanyonLink">Borrar</v-btn>
        </div>
      </v-row>
    </v-card-title>
    <v-card-text>
      {{ localCanyonLink?.link }}
    </v-card-text>
    <v-dialog v-model="openForm">
      <CanyonLinkForm
        :update="true"
        :canyonLink="localCanyonLink"
        @update:canyonLinkEmit="updateCanyonLink"
        @close="openForm = false"
      >
      </CanyonLinkForm>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import type { CanyonLink } from '@/api'
import { ref, watch } from 'vue'
import CanyonLinkForm from '../forms/CanyonLinkForm.vue'

const props = defineProps<{
  canyonLink?: CanyonLink
  updatable?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:canyonLinkEmit', value: CanyonLink): void
  (e: 'delete', canyonLink: CanyonLink): void
}>()

const localCanyonLink = ref<CanyonLink | undefined>(props.canyonLink)
const openForm = ref(false)

const deleteCanyonLink = () => {
  emit('delete', props.canyonLink!)
}

const updateCanyonLink = (canyonLinkUpdate: CanyonLink) => {
  localCanyonLink.value = canyonLinkUpdate
}

watch(
  localCanyonLink,
  (newVal) => {
    if (newVal) {
      emit('update:canyonLinkEmit', newVal)
    }
  },
  { deep: true },
)

function openLink() {
  if (localCanyonLink.value?.link && !props.updatable) {
    window.open(localCanyonLink.value.link, '_blank')
  }
}
</script>
