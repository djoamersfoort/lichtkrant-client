// Background Gradient
export interface Gradient {
    from: string
    to: string
}

// Key Explanations
export enum KeyType {
    GRID = "grid",
    LARGE = "large"
}

export interface BaseKeyExplanation {
    type: KeyType
    description: string
}
export interface GridKeyExplanation extends BaseKeyExplanation {
    type: KeyType.GRID
    layout: (string|null)[][]
}
export interface LargeKeyExplanation extends BaseKeyExplanation {
    type: KeyType.LARGE
    text: string
}
export type KeyExplanation = GridKeyExplanation | LargeKeyExplanation

// Color Preferences
export interface ColorPreferences {
    visible: boolean
    configurable: boolean
}

// Game
export interface Game {
    name: string
    id: string
    description: string
    color: Gradient
    keys: string[]
    explanation: KeyExplanation[]
    colors: ColorPreferences
}
