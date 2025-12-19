<template>
  <div id="map" style="height: 100vh"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { CanyonApi, type LocationCanyon, type SimpleCanyon } from '@/api'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { getAllFavourites } from '@/calls/CanyonCalls'

const canyonApi = new CanyonApi()
const user = useUserStore()
onMounted(async () => {
  const greenIcon = L.divIcon({
    html: `<i class="mdi mdi-map-marker" style="font-size: 32px; color: green;"></i>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })

  const orangeIcon = L.divIcon({
    html: `<i class="mdi mdi-map-marker" style="font-size: 32px; color: orange;"></i>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })

  const redIcon = L.divIcon({
    html: `<i class="mdi mdi-map-marker" style="font-size: 32px; color: red;"></i>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })

  const heartIcon = L.divIcon({
    html: `<i class="mdi mdi-heart" style="font-size: 32px; color: deeppink;"></i>`,
    className: '',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  })

  const canyons: LocationCanyon[] = await canyonApi.getLocations()
  let canyonsFavourites: SimpleCanyon[]
  if (user.isUserLogged) {
    canyonsFavourites = await getAllFavourites()
  }

  // Coordenadas por defecto (Madrid)
  const defaultCoords: [number, number] = [40.4168, -3.7038]

  // Inicializamos el mapa
  const map: L.Map = L.map('map').setView(defaultCoords, 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 18,
  }).addTo(map)

  // Guardamos todos los puntos para hacer fitBounds más tarde
  const bounds: [number, number][] = []

  // Intentamos obtener ubicación del usuario
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords: [number, number] = [position.coords.latitude, position.coords.longitude]
        bounds.push(userCoords)
        map.fitBounds(bounds)
      },
      (error) => {
        console.warn('Ubicación no disponible:', error.message)
        map.fitBounds(bounds) // Aún así, centramos en los cañones
      },
    )
  }

  // Añadir cañones al mapa
  canyons.forEach((canyon) => {
    if (!canyon.latitud || !canyon.longitud) return

    const lat = parseFloat(canyon.latitud)
    const lon = parseFloat(canyon.longitud)
    const dificultad = canyon.difficultyDesc?.toLowerCase() ?? ''

    let icon = greenIcon
    if (dificultad.includes('ii')) {
      icon = orangeIcon
    }
    if (dificultad.includes('iii')) {
      icon = redIcon
    }
    if (
      user.isUserLogged &&
      canyonsFavourites.some((canyonFav) => canyonFav.canyonId === canyon.canyonId)
    ) {
      icon = heartIcon
    }

    const coords: [number, number] = [lat, lon]
    bounds.push(coords)

    const popupContent = `
      <strong>${canyon.name ?? 'Desconocido'}</strong><br/>
      <b>Temporada:</b> ${canyon.season ?? 'Desconocido'}<br/>
      <b>País:</b> ${canyon.country ?? 'Desconocido'}<br/>
      <b>Dificultad:</b> ${canyon.difficultyDesc ?? 'Desconocido'}<br/>
      <button onclick="goToCanyon('${canyon.canyonId}')">Ver detalles</button>
    `

    L.marker([lat, lon], { icon }).addTo(map).bindPopup(popupContent)
  })

  // Si no se obtuvo la localización, ajustamos el mapa igualmente
  if (!navigator.geolocation) {
    map.fitBounds(bounds)
  }
})

const router = useRouter()
const goToCanyon = (canyonId: number) => {
  router.push({
    name: 'canyon',
    params: {
      id: canyonId,
    },
  })
}
;(window as any).goToCanyon = goToCanyon
</script>
