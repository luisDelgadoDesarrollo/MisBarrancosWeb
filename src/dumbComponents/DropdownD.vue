<template>
  <v-select
    :label="label"
    :items="items"
    v-model="internalValue"
    item-title="type"
    item-value="value"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface EnumItem {
  type: string
  value: number
}

interface Props {
  modelValue: number | undefined
  label?: string
  items: EnumItem[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

const internalValue = ref<number | undefined>(props.modelValue)

// Sincroniza el v-model interno con el externo
watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val
  },
)

// Emite cambios al padre
watch(internalValue, (val) => {
  emit('update:modelValue', val ?? null)
})
</script>
