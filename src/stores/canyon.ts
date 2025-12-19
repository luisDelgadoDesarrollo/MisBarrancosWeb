import { defineStore } from 'pinia'
import type { Canyon } from '@/api'
import { CanyonApi } from '@/api'
import { getCanyonWithAuth } from '@/calls/CanyonCalls'
import { useUserStore } from './user'

const canyonApi = new CanyonApi()

interface CanyonState {
  canyon: Canyon | null
}

export const useCanyonStore = defineStore('canyon', {
  state: (): CanyonState => ({
    canyon: null,
  }),

  actions: {
    async loadCanyon(id: number) {
      try {
        let response: Canyon
        if (useUserStore().isUserLogged) {
          response = await getCanyonWithAuth({ canyonId: id })
        } else {
          response = await canyonApi.getCanyon({ canyonId: id })
        }
        this.canyon = response
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: unknown) {
        this.canyon = { canyonId: 0 }
      }
    },
    // async loadCanyonAuthenticated(id: number) {
    //   try {
    //     const response = await getCanyonWithAuth({ canyonId: id })
    //     this.canyon = response
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   } catch (error: unknown) {
    //     this.canyon = { canyonId: 0 }
    //   }
    // },
    getCanyon(): Canyon | null {
      return this.canyon
    },
  },
})
