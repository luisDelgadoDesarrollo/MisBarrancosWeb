import { defineStore } from 'pinia'

export const useAuthDialog = defineStore('authDialog', {
  state: () => ({
    authDialog: false,
  }),
  actions: {
    toogleAuthDialog() {
      this.authDialog = !this.authDialog
    },
  },
})
