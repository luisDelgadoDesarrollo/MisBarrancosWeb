type TemperatureType = 'MUY FRIA' | 'FRIA' | 'TEMPERATURA IDEAL'

interface TemperatureLevel {
  type: TemperatureType
  value: number
}

export const TemperatureLevels: TemperatureLevel[] = [
  { type: 'MUY FRIA', value: 1 },
  { type: 'FRIA', value: 2 },
  { type: 'TEMPERATURA IDEAL', value: 3 },
]

export const TemperatureUtils = {
  fromValue(value: number): TemperatureLevel {
    return TemperatureLevels.find((t) => t.value === value) || { type: 'MUY FRIA', value: 1 }
  },

  fromValueString(value: number): TemperatureType {
    return this.fromValue(value).type
  },
}
