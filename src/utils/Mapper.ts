export const imageToStr = (image: File | null | undefined | Blob) => {
  return image ? URL.createObjectURL(image) : ''
}

export const formatDate = (dateStr: string): string => {
  // Crear un objeto Date a partir de la cadena
  const date = new Date(dateStr)

  // Obtener los componentes de la fecha
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Los meses comienzan desde 0
  const year = date.getFullYear()

  // Retornar la fecha en formato dd/mm/yyyy
  return `${day}/${month}/${year}`
}

export const buildNeutralDate = (original?: Date) => {
  if (original) {
    return new Date(original.getFullYear(), original.getMonth(), original.getDate(), 12)
  }
  return undefined
}
