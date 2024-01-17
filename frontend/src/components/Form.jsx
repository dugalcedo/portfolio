/*
    FormOptions
    {
        onSubmit: ()=>{},
        fields: [{
            label: "",
            name: "",
            type: "",
            validator: (val, data*) => {}
        }]
    }
*/
import { handleSubmit } from '../lib/general.js'

import { useState, useEffect, useRef } from 'react'
import FormFieldWithError from "./FormFieldWithError.jsx"

export default function Form({
    onSubmit = ()=>{},
    fields = [],
    title = "",
    id = "",
    className = "",
    button = "Submit"
}) {

    const [formData, $formData] = useState(initErrors())
    const [errors, $errors] = useState(initErrors())
    const formEl = useRef()

    useEffect(validateForm, [])
    useEffect(validateForm, [formData])

    function validateForm() {
        const newErrors = initErrors()
        Object.entries(formData).forEach(([name, value]) => {
            const field = fields.find(f => name === f.name)
            const {validator = (()=>{})} = field
            newErrors[name] = validator(value, formData)
        })
        $errors(newErrors)
    }

    function initErrors() {
        return fields.reduce((acc, currentField) => {
            acc[currentField.name] = ""
            return acc
        }, {})
    }

    const _handleSubmit = e => handleSubmit(e, (form, data) => {
        validateForm()
        if (Object.values(errors).some(err=>err)) return
        onSubmit(form, data)
    })

  return (
    <form 
        id={id||`form-${Math.random()}`} 
        className={`form ${className}`}
        onSubmit={_handleSubmit}
        ref={formEl}
    >
        {title && <h2>{title}</h2>}
        <div className="fields">
            {/* Fields map */}
            {fields.map((field, fieldIndex) => {
                if (!field.name) {
                    console.error("A form field is missing a name prop. This may cause it to misbehave.")
                }
                const {
                    name = `unnamed-field-${fieldIndex}`,
                    label = `Label`,
                    type = 'text',
                    defaultValue = ''
                } = field

                const error = errors[name] || ""

                return (
                    <label key={name} className='form-field'>
                        <div className="head">
                            <span>{label}</span>
                            {error && <span className='error'>{error}</span>}
                        </div>
                        <input
                            onInput={(e)=>{
                                $formData(current => {
                                    current[name] = e.target.value
                                    return {...current}
                                })
                            }}
                            name={name}
                            defaultValue={defaultValue}
                            type={type} 
                        />
                    </label>
                )
            })}
            {/* End Fields map */}
        </div>
        <button>
            {button}
        </button>
    </form>
  )
}