export const imageToStr = (image: File | null | undefined | Blob) => {
  return image ? URL.createObjectURL(image) : ''
}
