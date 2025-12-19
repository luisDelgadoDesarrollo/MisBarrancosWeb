import { defineStore } from 'pinia'

export function createImageStore(storeId: string) {
  return defineStore(storeId, {
    state: () => ({
      // name -> File
      images: {} as Record<string, File | undefined>,
    }),
    actions: {
      addImage(name: string, file?: File) {
        if (!file) return // opcional: no guardes si no hay fichero
        this.images[name] = file // sustituye si ya existe, crea si no
      },
      clear() {
        this.images = {}
      },
      getImages(): { name: string; file: File }[] {
        return Object.entries(this.images)
          .filter(([, file]) => file !== undefined)
          .map(([name, file]) => ({
            name,
            file: file as File,
          }))
      },
      getImage(name: string): File | undefined {
        return this.images[name]
      },
    },
  })
}
