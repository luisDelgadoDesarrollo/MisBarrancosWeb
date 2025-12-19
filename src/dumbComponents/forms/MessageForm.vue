<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card style="max-height: 90vh; overflow-y: auto; padding: 16px">
          <v-text-field
            v-model="localMessage"
            class="input-group--focused"
            label="Mensaje"
          ></v-text-field>
          <DropdownD :label="'Nivel del caudal'" :items="Levels" v-model="selectedFlow" />
          <DropdownD
            :label="'Temporatura del agua'"
            :items="TemperatureLevels"
            v-model="selectedTemperature"
          />
          <DatePickerD v-model="localDate"></DatePickerD>
          <ImagePickerD v-model="flowImage" label="Imagen del caudal"></ImagePickerD>
          <!-- contenedor del botón alineado a la derecha -->
          <div class="d-flex justify-end">
            <v-btn @click="send()">Enviar</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DropdownD from '../DropdownD.vue'
import { Levels } from '@/enums/Level'
import { TemperatureLevels } from '@/enums/Temperature'
import { updateMessage, postMessage } from '@/calls/MessageCalls'
import { type MessageOut } from '@/api'
import DatePickerD from '../DatePickerD.vue'
import { buildNeutralDate } from '@/utils/Mapper'
import ImagePickerD from '../ImagePickerD.vue'
import { postImage } from '@/calls/ImageCalls'

const props = withDefaults(
  defineProps<{
    messageId?: number
    placeId?: number
    message?: string
    date?: Date
    flow?: number
    temperature?: number
  }>(),
  {},
)
const emit = defineEmits<{
  (e: 'close', value: MessageOut | undefined): void
}>()
const localMessage = ref(props.message)
const selectedFlow = ref(props.flow)
const selectedTemperature = ref(props.temperature)
const localDate = ref(props.date)
const flowImage = ref<File | undefined>()

const send = async () => {
  let message: MessageOut
  if (props.messageId) {
    message = await updateMessage({
      messageId: props.messageId!,
      messageIn: {
        placeId: props.placeId!,
        date: buildNeutralDate(localDate.value),
        flow: selectedFlow.value,
        typePlace: 'CANYON',
        temperature: selectedTemperature.value,
        message: localMessage.value,
      },
    })
  } else {
    message = await postMessage({
      messageIn: {
        placeId: props.placeId!,
        date: buildNeutralDate(localDate.value),
        flow: selectedFlow.value,
        typePlace: 'CANYON',
        temperature: selectedTemperature.value,
        message: localMessage.value,
      },
    })
  }
  if (flowImage.value) {
    postImage({ file: flowImage.value as Blob, name: message.messageId?.toString(), dir: 'flow' })
  }
  emit('close', message)
}
</script>
