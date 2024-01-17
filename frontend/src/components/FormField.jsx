import { useRef, useEffect } from "react"

export default function FormField({
    label,
    type = 'text',
    name = `unnamed-input-${(Math.random()*1e10).toFixed(0)}`,
    on = {}
}) {

  const input = useRef()

  useEffect(()=>{
    Object.entries(on).forEach(([eventName, callback]) => {
      input.current.addEventListener(eventName, callback)
    })
  }),[]

  return (
    <label className="form-field">
        <span>{label}</span>
        <input 
            type={type} 
            name={name}
            ref={input}
            />
    </label>
  )
}