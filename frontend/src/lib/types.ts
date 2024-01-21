export interface VarObj {
    [key: string]: any
}

export type Animal = "deer" | "dog" | "rabbit" | "cat" | "bird" | "gorilla" | "fish" | "lion" | "tiger" | "horse" | "dragon" | "goat" | "sheep" | "shark" | "bear" | "polarbear" | "fox" | "seal" | "parrot" | "vulture" | "penguin" | "eagle" | "pig" | "ape" | "elephant" | "hippo" | "rhino" | "panda" | "rat" | "raccoon" | "kangaroo" | "koala" | "dolphin" | "orc" | "unicorn"

export type WeatherUnit = "F" | "C" | "in" | "mm" | "kph" | "mph"

export interface Field {
    type?: EventName
    name: string
    validator?: (val: string, data?: any) => string | undefined
    label: string
    defaultValue?: string
}

export type EventName = 'text' | 'textarea' | 'checkbox' | 'avatar' | 'password' | 'email'