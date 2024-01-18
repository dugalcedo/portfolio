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
import avatars from '../lib/avatars.jsx'

export default function Form({
    onSubmit = ()=>{},
    fields = [],
    title = "",
    id = "",
    className = "",
    button = "Submit",
    style = {},
    oneLineStyle
}) {

    if (oneLineStyle) style = {
        ...style,
        display: 'grid',
        gridTemplateColumns: '3fr 1fr'
    }

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
        ref={formEl} style={style}
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
                    label,
                    type = 'text',
                    defaultValue = ''
                } = field

                const error = errors[name] || ""

                const inputHandler = (e)=>{
                    $formData(current => {
                        current[name] = e.target.value
                        return {...current}
                    })
                }

                return (
                    <label key={name} className='form-field'>
                        <div className="head">
                            {label && <span>{label}</span>}
                            {error && <span className='error'>{error}</span>}
                        </div>
                        {/* TEXTAREA */}
                        {type === 'textarea' ? (
                            <textarea 
                                name={name}
                                defaultValue={defaultValue}
                                onInput={inputHandler}
                                style={{
                                    resize: 'none'
                                }}
                            ></textarea>
                        )
                        : 
                        //////// AVATAR ///////////
                        type === 'avatar' ? (
                            <div className="avatar-selector">
                                {Object.entries(avatars).map(([value, icon]) => {
                                    let active = (
                                        (
                                            (value === 'deer') &&
                                            (!formData[name])
                                        ) || (
                                            formData[name] === value
                                        )
                                    )
                                    return (
                                        <button 
                                        key={value} 
                                        className={`avatar ${active ? "active":""}`}
                                        onClick={()=>{
                                            inputHandler({
                                                target:{value}
                                            })
                                        }}
                                        >
                                            {icon}
                                        </button>
                                    )
                                })}
                            </div>
                        )
                        :
                        ////// OTHER /////////
                        (
                            <input
                                onInput={inputHandler}
                                name={name}
                                defaultValue={defaultValue}
                                type={type} 
                            />
                        )}
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