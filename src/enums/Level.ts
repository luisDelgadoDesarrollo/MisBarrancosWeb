type LevelType =
  | 'SECO'
  | 'MUY BAJO'
  | 'BAJO'
  | 'BAJO MEDIO'
  | 'MEDIO'
  | 'MEDIO ALTO'
  | 'ALTO'
  | 'MUY ALTO'
  | 'RIESGO'

interface Level {
  type: LevelType
  value: number
}

export const Levels: Level[] = [
  { type: 'SECO', value: 1 },
  { type: 'MUY BAJO', value: 2 },
  { type: 'BAJO', value: 3 },
  { type: 'BAJO MEDIO', value: 4 },
  { type: 'MEDIO', value: 5 },
  { type: 'MEDIO ALTO', value: 6 },
  { type: 'ALTO', value: 7 },
  { type: 'MUY ALTO', value: 8 },
  { type: 'RIESGO', value: 9 },
]

export const LevelUtils = {
  fromValue(value: number): Level {
    return Levels.find((l) => l.value === value) || { type: 'RIESGO', value: 6 }
  },

  fromValueString(value: number): LevelType {
    return this.fromValue(value).type
  },
}
