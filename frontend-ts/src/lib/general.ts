type FormHandler = (form: HTMLFormElement, data: {}) => void

export function handleSubmit(
    event: Event, 
    formHandler: FormHandler
): void 
{
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const data = Object.fromEntries(new FormData(form))
    formHandler(form, data)
}