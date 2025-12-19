import { defineStore } from 'pinia'

interface UserState {
  userLogged: boolean
}

export const useUserStore = defineStore('userLogged', {
  state: (): UserState => ({
    userLogged: !!localStorage.getItem('authCredentials') && !!localStorage.getItem('email'),
  }),

  getters: {
    isUserLogged: (state) => state.userLogged,
  },

  actions: {
    logInUser() {
      this.userLogged = true
    },
    logOutuser() {
      this.userLogged = false
    },
  },
})
