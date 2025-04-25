<template>
  <header>
    <HeaderD></HeaderD>
  </header>
  <body>
    <router-view></router-view>
  </body>
  <footer><FooterD></FooterD></footer>
</template>

<script setup lang="ts">
import HeaderD from './dumbComponents/HeaderD.vue'
import FooterD from './dumbComponents/FooterD.vue'
</script>

<style scoped></style>
