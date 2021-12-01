export interface ToRFormatCategory {
    name: string,
    formats: ToRFormat[],
    uri: string
}

export interface ToRFormat {
    name: string,
    text: string
}