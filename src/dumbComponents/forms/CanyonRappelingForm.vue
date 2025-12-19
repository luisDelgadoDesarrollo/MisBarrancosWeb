<template>
  <v-container>
    <v-card>
      <v-col>
        <v-row>
          <v-text-field
            v-model="description"
            class="input-group--focused"
            label="Descripcion"
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
            v-model="location"
            class="input-group--focused"
            label="Localizacion"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="step"
            class="input-group--focused"
            label="Paso"
            :rules="[canyonRappelingStepFormat]"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="stepType"
            class="input-group--focused"
            label="Tipo(Rapel, tobogan, salto)"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-btn @click="close">Cerrar</v-btn>
          <v-btn @click="save">Guardar</v-btn>
          <v-snackbar
            :timeout="2000"
            color="error"
            variant="tonal"
            elevation="12"
            v-model="canyonRappelingFormFail"
          >
            {{ canyonRappelingFormFailText }}
          </v-snackbar>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>
<script lang="ts" setup>
import type { CanyonRappeling } from '@/api'
import { canyonRappelingStepFormat, runValidations } from '@/utils/Validations'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    update?: boolean
    canyonRappelings?: Array<CanyonRappeling>
    canyonRappeling?: CanyonRappeling
  }>(),
  {
    canyonRappeling: () => ({}),
  },
)

const resultValidations = () => {
  return runValidations([() => canyonRappelingStepFormat(step.value)])
}

const emit = defineEmits<{
  (e: 'update:canyonRappelingEmit', value: CanyonRappeling): void
  (e: 'update:canyonRappelings', value: CanyonRappeling[]): void
  (e: 'close'): void
}>()

const description = ref(props.canyonRappeling?.description)
const length = ref(props.canyonRappeling?.length)
const location = ref(props.canyonRappeling?.location)
const step = ref(props.canyonRappeling?.step)
const stepType = ref(props.canyonRappeling?.stepType)
const canyonRappelingFormFail = ref(false)
const canyonRappelingFormFailText = ref('')

const save = () => {
  const result = resultValidations()
  if (result === true) {
    if (props.update) {
      const canyonRappelingDeclared: CanyonRappeling = {
        canyonId: props.canyonRappeling.canyonId,
        description: description.value,
        length: length.value,
        location: location.value,
        step: step.value,
        stepType: stepType.value,
      }
      emit('update:canyonRappelingEmit', canyonRappelingDeclared)
      emit('close')
    } else {
      const newRappeling: CanyonRappeling = {
        description: description.value ?? '',
        length: length.value ?? '',
        location: location.value ?? '',
        step: step.value ?? '',
        stepType: stepType.value ?? '',
      }

      const updatedList = [...(props.canyonRappelings ?? []), newRappeling]
      emit('update:canyonRappelings', updatedList)
      emit('close')
    }
  } else {
    canyonRappelingFormFail.value = true
    canyonRappelingFormFailText.value = result
  }
}

const close = () => {
  emit('close')
}
</script>
