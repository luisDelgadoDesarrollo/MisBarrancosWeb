<template>
  <v-card class="canyon-card" @click="handleClick">
    <h1 class="card-title">
      {{ props.name }}
    </h1>
    <p class="card-info">
      Temporada: <strong>{{ props.season }}</strong>
    </p>
    <p class="card-info">
      País: <strong>{{ props.country }}</strong>
    </p>
    <p class="card-info">
      Población: <strong>{{ props.population }}</strong>
    </p>
  </v-card>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    id?: number
    name?: string
    season?: string
    country?: string
    population?: string
    onClick?: () => void
  }>(),
  {},
)

const handleClick = () => {
  if (props.onClick) {
    props.onClick()
  }
}
</script>

<style scoped>
.canyon-card {
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

.canyon-card::after {
  content: '';
  position: absolute;
  inset: 0;
  transition: background-color 0.2s ease;
  pointer-events: none; /* para que no bloquee clics */
}

.canyon-card:hover::after {
  background-color: rgba(0, 0, 0, 0.04); /* overlay gris MUY suave */
}

.canyon-card:hover {
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
