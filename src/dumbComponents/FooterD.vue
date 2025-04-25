<template>
  <footer class="footer">
    <!-- Redes Sociales -->
    <div class="footer-column">
      <h4>Síguenos</h4>
      <v-icon>mdi-instagram</v-icon>
    </div>

    <!-- Descarga -->
    <div class="footer-column">
      <h4>Descarga la app</h4>
      <v-icon>mdi-google-play</v-icon>
    </div>

    <!-- Contacto -->
    <div class="footer-column">
      <h4>Contacto</h4>
      <p>misbarrancos@gmail.com</p>
      <p>delgadofernandez.luisdesarrollo@gmail.com</p>
    </div>

    <!-- Legal -->
    <div class="footer-column">
      <h4>Legal</h4>
      <v-icon>mdi-creative-commons</v-icon>
    </div>

    <!-- Sobre nosotros -->
    <div class="footer-column">
      <h4>Sobre nosotros</h4>
      <p>Barranquistas creando herramientas útiles para barranquistas.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  padding: 2rem 1rem;
  flex-wrap: wrap;
  gap: 1rem;
  text-align: center;
}

.footer-column {
  flex: 1;
  min-width: 180px;
}

.footer-column h4 {
  margin-bottom: 0.5rem;
  font-weight: bold;
}
</style>
