<template>
  <div>
    <!-- Contenedor con scroll -->
    <v-container class="scrollContainer" fluid>
      <v-col>
        <v-list v-if="messages.length > 0">
          <v-list-item v-for="card in messages" :key="card.messageId">
            <MessageCard
              :messageId="card.messageId"
              :placeId="card.placeId"
              :message="card.message"
              :date="card.date"
              :flow="card.flow"
              :temperature="card.temperature"
              :user="card.user"
            />
          </v-list-item>
        </v-list>

        <div v-else class="empty-message">
          <h1>Se el primero en comentar, y apoyar a la comunidad</h1>
        </div>
      </v-col>

      <!-- Trigger para carga infinita -->
      <div ref="loadMoreTrigger" class="text-center my-4">
        <v-progress-circular v-if="loading" indeterminate color="primary" />
      </div>
    </v-container>

    <!-- Botón debajo del contenedor scrollable -->
    <div class="d-flex justify-end px-4 py-2">
      <v-btn v-if="userStore.isUserLogged" color="primary" @click="messageForm = true"
        >Mandar mensaje</v-btn
      >
    </div>
    <v-dialog v-model="messageForm">
      <MessageForm :placeId="canyon" @close="handleCreateMessage" />
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import MessageCard from '../cards/MessageCardD.vue'
import { type MessageOut } from '@/api'
import type { MessageCardInfo } from '@/interfaces/MessageCardInfo'
import { useUserStore } from '@/stores/user'
import MessageForm from '../forms/MessageForm.vue'
import { messageApi } from '@/api/apiConfig'

const userStore = useUserStore()
const props = withDefaults(defineProps<{ canyon?: number }>(), {})
const messageForm = ref(false)
const messages = ref<MessageCardInfo[]>([])
const page = ref(0)
let firstPage = true
const loading = ref(false)

const loadMoreTrigger = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

async function getMessageWithAuthHelper(page: number): Promise<MessageCardInfo[]> {
  if (!props.canyon) return [] // No canyon, no messages

  const rawMessage = await messageApi.getMessages({
    canyonId: props.canyon,
    page,
  })
  return rawMessage.map((message) => ({
    messageId: message.messageId,
    placeId: message.placeId,
    message: message.message,
    date: message.date,
    flow: message.flow,
    temperature: message.temperature,
    user: message.user,
  }))
}

const loadMore = async () => {
  if (loading.value || !props.canyon) return
  loading.value = true

  try {
    const newMessages = await getMessageWithAuthHelper(page.value)
    if (!firstPage) {
      messages.value.push(...newMessages)
    } else {
      messages.value = newMessages
      firstPage = false
    }
    page.value += 1
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

function createObserver() {
  if (observer) {
    if (loadMoreTrigger.value) observer.unobserve(loadMoreTrigger.value)
    observer.disconnect()
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    },
    { threshold: 1.0 },
  )

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
}

onMounted(async () => {
  if (props.canyon) {
    await loadMore()
  }
  createObserver()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})

watch(
  () => props.canyon,
  async (newCanyon, oldCanyon) => {
    if (newCanyon !== oldCanyon) {
      page.value = 0
      firstPage = true
      messages.value = []

      if (observer && loadMoreTrigger.value) {
        observer.unobserve(loadMoreTrigger.value)
      }

      if (newCanyon) {
        await loadMore()
        nextTick(() => {
          createObserver()
        })
      }
    }
  },
  { immediate: true },
)

const handleCreateMessage = (message?: MessageOut) => {
  if (message) {
    messages.value.unshift({
      messageId: message.messageId,
      placeId: message.placeId,
      message: message.message,
      date: message.date,
      flow: message.flow,
      temperature: message.temperature,
      user: message.user,
    })
  }
  messageForm.value = false
}
</script>

<style scoped>
.scrollContainer {
  height: 30vh;
  overflow-y: auto;
}
</style>
