const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const difficultyCanyonRegex = /^V\d+\sA\d+\s(I|II|III|IV|V|VI|VII|VIII|IX|X)$/
const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/
const canyonRappelingStepRegex = /^\d+(?:\s?\D+)?$/

type ValidationResult = true | string

export const validateRequired = (value: unknown) => {
  return !!value || 'Rellene los campos que se inducan como obligatorios'
}

export const maxLongitud = (max: number) => (value: string) => {
  return value.length <= max || `Debe tener como máximo ${max} caracteres`
}

export const emailValidate = (value: string) => {
  return !value.match(emailRegex) ? 'El formato del correo es incorrecto' : true
}

export const validateEqualPassword = (value1: string, value2: string) => {
  return value1 === value2 || 'Las dos contraseñas no coinciden'
}

export const validateLengthPassword = (value: string) => {
  return value.length >= 8 || 'La contraseña debe tener al menos 8 caracteres'
}

export const validateFormatoDifficulty = (value?: string | null) => {
  if (!value) return true

  return (
    difficultyCanyonRegex.test(value) || 'El formato debe ser V[numero] A[numero] [numero romano]'
  )
}

export const isLink = (value?: string | undefined) => {
  if (!value) return true

  return urlRegex.test(value) || 'El formato del enlace debe ser correcto'
}

export const canyonRappelingStepFormat = (value?: string | undefined) => {
  if (!value) return true

  return canyonRappelingStepRegex.test(value) || 'El paso debe de empezar por el numero, ej: 1r'
}
export const runValidations = (validations: (() => ValidationResult)[]): ValidationResult => {
  for (const validate of validations) {
    const result = validate()
    if (result !== true) {
      return result
    }
  }
  return true
}
