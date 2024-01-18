export default function FormError({
    error
}) {
  return !error ? '' : (
    <span className="form-error">
        {error}
    </span>
  )
}