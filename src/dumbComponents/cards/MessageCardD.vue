<template>
  <v-card class="message-card">
    <v-col>
      <v-row align-content="center">
        <v-col class="d-flex align-center">
          {{ formatDate(localDate!.toDateString()) }}
        </v-col>
        <v-btn
          v-if="userStore.isUserLogged && messageCreatedByTheUserAuth"
          class="ma-2"
          color="primary"
          @click="messageForm = true"
        >
          Editar
        </v-btn>
        <v-dialog v-model="messageForm">
          <MessageForm
            :placeId="props.placeId"
            :message="localMessage"
            :flow="localFlow"
            :temperature="localTemperature"
            :messageId="props.messageId"
            :date="props.date"
            @close="handleUpdateMessage"
          />
        </v-dialog>
      </v-row>
      <v-col>
        <v-row v-if="props.message">{{ localMessage }}</v-row
        ><v-row v-if="localFlow"> CAUDAL: {{ LevelUtils.fromValue(localFlow).type }}</v-row
        ><v-row v-if="localTemperature"
          >TEMPERATURA: {{ TemperatureUtils.fromValue(localTemperature).type }}</v-row
        >
        <v-row>
          <ImageD :image="messageId?.toString()" dir="flow" />
        </v-row>
      </v-col>
    </v-col>
  </v-card>
</template>
<script setup lang="ts">
import type { MessageOut, SimpleUser } from '@/api'
import { LevelUtils } from '@/enums/Level'
import { TemperatureUtils } from '@/enums/Temperature'
import { computed, ref } from 'vue'
import { formatDate } from '@/utils/Mapper'
import { useUserStore } from '@/stores/user'
import MessageForm from '../forms/MessageForm.vue'
import ImageD from '../ImageD.vue'

const userStore = useUserStore()
const messageForm = ref(false)
const props = withDefaults(
  defineProps<{
    messageId?: number
    placeId?: number
    message?: string
    date?: Date
    flow?: number
    temperature?: number
    user?: SimpleUser
  }>(),
  {},
)

const localFlow = ref(props.flow)
const localMessage = ref(props.message)
const localTemperature = ref(props.temperature)
const localDate = ref(props.date)

const handleUpdateMessage = (message?: MessageOut) => {
  if (message) {
    localMessage.value = message.message
    localFlow.value = message.flow
    localTemperature.value = message.temperature
    localDate.value = message.date
  }
  messageForm.value = false
}

const messageCreatedByTheUserAuth = computed(() => {
  return localStorage.getItem('email') === props.user?.email
})
</script>

<style scoped>
.message-card {
  position: relative;
  padding: 24px;
  margin: 16px 0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
  cursor: pointer;
  overflow: hidden; /* importante para limitar el overlay al card */
}

.message-card::after {
  content: '';
  position: absolute;
  inset: 0;
  transition: background-color 0.2s ease;
  pointer-events: none; /* para que no bloquee clics */
}

.message-card:hover::after {
  background-color: rgba(0, 0, 0, 0.04); /* overlay gris MUY suave */
}

.message-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.card-title {
  margin: 0 0 12px;
  font-size: 1.4rem;
  font-weight: 600;
}

.card-info {
  margin: 6px 0;
  font-size: 1rem;
}
</style>
