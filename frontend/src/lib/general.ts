import { VarObj } from './types.ts'
import { FormEvent } from 'react'

export type FormHandler = (form: HTMLFormElement, data: VarObj) => void
export type MetaFormHandler = (e: FormEvent) => (event: FormEvent, formHandler: FormHandler) => void | Promise<void>

export function handleSubmit(event: FormEvent<Element>, formHandler: FormHandler) {
    event.preventDefault()
    const form = event.target as any
    const data = Object.fromEntries(new FormData(form))
    formHandler(form, data)
}