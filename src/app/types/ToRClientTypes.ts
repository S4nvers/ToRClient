export interface ToRFormatCategory {
    name: string,
    formats: ToRFormat[]
}

export interface ToRFormat {
    category: string,
    name: string,
    text: string
}