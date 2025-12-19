type LevelType = 'SECO' | 'BAJO' | 'MEDIO' | 'ALTO' | 'MUY ALTO' | 'RIESGO'

interface Level {
  type: LevelType
  value: number
}

export const Levels: Level[] = [
  { type: 'SECO', value: 1 },
  { type: 'BAJO', value: 2 },
  { type: 'MEDIO', value: 3 },
  { type: 'ALTO', value: 4 },
  { type: 'MUY ALTO', value: 5 },
  { type: 'RIESGO', value: 6 },
]

export const LevelUtils = {
  fromValue(value: number): Level {
    return Levels.find((l) => l.value === value) || { type: 'RIESGO', value: 6 }
  },

  fromValueString(value: number): LevelType {
    return this.fromValue(value).type
  },
}
