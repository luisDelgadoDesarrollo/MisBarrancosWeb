<template>
  <v-row class="mb-4 pt-4 pb-4 pl-4" align="center">
    <span>{{ model ? model.toDateString() : 'Fecha de nacimiento' }}</span>

    <v-btn @click="isDatePickerVisible = true" class="ml-2" :readonly="props.readonly">
      {{ isDatePickerVisible ? 'Ocultar calendario' : 'Mostrar calendario' }}
    </v-btn>

    <v-dialog v-model="isDatePickerVisible" width="auto" persistent>
      <v-card>
        <v-date-picker
          v-model="model"
          color="primary"
          elevation="24"
          @click:outside="isDatePickerVisible = false"
          scrollable
          show-adjacent-months
          no-title
          clearable
        />
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="isDatePickerVisible = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  readonly?: boolean
}>()

const model = defineModel<Date | undefined>()
const isDatePickerVisible = ref(false)
</script>
