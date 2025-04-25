import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

export const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Usar el set de iconos "mdi"
  },
  theme: {
    defaultTheme: prefersDark ? 'customDark' : 'customLight', // o customDark si prefieres
    themes: {
      customLight: {
        dark: false,
        colors: {
          primary: '#FAFAFA',
          secondary: '#F5F5F5',
          success: '#EEEEEE',
          info: '#E0E0E0',
          warning: '#9E9E9E',
          error: '#212121',
          // primary: '#1E88E5',
          // secondary: '#81C784',
          // success: '#43A047',
          // info: '#29B6F6',
          // warning: '#FDD835',
          // error: '#E53935',
        },
      },
      customDark: {
        dark: true,
        colors: {
          primary: '#121212',
          secondary: '#1E1E1E',
          success: '#2C2C2C',
          info: '#616161',
          warning: '#BDBDBD',
          error: '#E0E0E0',
          // primary: '#90CAF9',
          // secondary: '#A5D6A7',
          // success: '#66BB6A',
          // info: '#4FC3F7',
          // warning: '#FFEE58',
          // error: '#EF5350',
        },
      },
    },
  },
})
