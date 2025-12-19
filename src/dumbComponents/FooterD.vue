<template>
  <footer class="footer">
    <!-- Redes Sociales -->
    <div class="footer-column">
      <h4>Síguenos</h4>
      <a href="https://www.instagram.com/misbarrancos?igsh=Z294dHJqZHl6bG54" target="_blank">
        <v-icon>mdi-instagram</v-icon>
      </a>
    </div>

    <!-- Descarga -->
    <div class="footer-column">
      <h4>Descarga la app</h4>
      <a
        href="https://play.google.com/store/apps/details?id=luis.desarrollo.canyoningAppFrontend&hl=es"
        target="_blank"
      >
        <v-icon>mdi-google-play</v-icon>
      </a>
    </div>

    <!-- Contacto -->
    <div class="footer-column">
      <h4>Contacto</h4>
      <p><v-icon>mdi-email-outline</v-icon>misbarrancos@gmail.com</p>
      <p><v-icon>mdi-instagram</v-icon> @misbarrancos</p>
      <p><v-icon>mdi-phone-outline </v-icon> +34 659 784 288</p>
    </div>

    <!-- Sobre nosotros -->
    <div class="footer-column">
      <h4>Sobre nosotros</h4>
      <p>Barranquistas creando herramientas útiles para barranquistas.</p>
    </div>

    <div class="footer-column">
      <h4>Licencia</h4>
      <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">
        <v-icon>mdi-creative-commons</v-icon>
      </a>
    </div>

    <div class="footer-column">
      <h4>Fuentes</h4>
      <p>
        La información de esta aplicación está sacada de www.infobarrancos.com y gracias a la
        comunidad que la añade y actualiza.
      </p>
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
