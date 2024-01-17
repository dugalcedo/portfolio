export function handleSubmit(event, formHandler) {
    event.preventDefault()
    const form = event.target
    const data = Object.fromEntries(new FormData(form))
    formHandler(form, data)
}