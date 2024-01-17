import FormError from "./FormError.jsx"
import FormField from "./FormField.jsx"

export default function FormFieldWithError({
    label,
    type = 'text',
    name = `unnamed-input-${(Math.random()*1e10).toFixed(0)}`,
    on = {},
    error
}) {
  return (
    <>
        <FormField 
            label={label}
            type={type}
            name={name}
            on={on}
        />
        <FormError
            error={error}
        />
    </>
  )
}