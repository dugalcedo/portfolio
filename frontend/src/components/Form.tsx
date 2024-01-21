import { VarObj, Animal, Field, EventName } from '../lib/types.ts'

import { handleSubmit } from '../lib/general.js'

import { useState, useEffect, useRef, FormEventHandler, FormEvent } from 'react'

import avatars from '../lib/avatars.js'

type FormSubmitHandler = (form: HTMLFormElement, data: VarObj) => void | Promise<void>

interface FormProps {
    onSubmit?: FormSubmitHandler
    fields: Field[]
    title?: string
    id?: string
    className?: string
    button?: string
    style?: any
    oneLineStyle?: boolean
}


export default function Form({
    onSubmit = ()=>{},
    fields = [],
    title = "",
    id = "",
    className = "",
    button = "Submit",
    style = {},
    oneLineStyle = false
}: FormProps) {

    if (oneLineStyle) style = {
        ...style,
        display: 'grid',
        gridTemplateColumns: '3fr 1fr'
    }

    const [formData, $formData] = useState(initErrors())
    const [errors, $errors] = useState(initErrors())
    const formEl = useRef<HTMLFormElement>(null)

    useEffect(validateForm, [])
    useEffect(()=>{
        validateForm()
        console.log(formData)
    }, [formData])

    function validateForm() {
        const newErrors = initErrors()
        Object.entries(formData).forEach(([name, value]) => {
            const field = fields.find(f => name === f.name) as Field
            const {validator = ((val:any) => {})} = field
            newErrors[name] = validator(value, formData)
        })
        $errors(newErrors)
    }

    function initErrors(): VarObj {
        return fields.reduce((acc: VarObj, currentField) => {
            acc[currentField.name] = ""
            return acc
        }, {})
    }

    const _handleSubmit: FormEventHandler = (e: FormEvent<Element>) => 
        handleSubmit(e, (form, data) => {
            validateForm()
            if (Object.values(errors).some(err=>err)) return
            onSubmit(form, formData)
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

                type FormInputHandler = (e: FormEvent<HTMLInputElement|HTMLTextAreaElement>) => void
                const inputHandler: FormInputHandler = e =>{
                    $formData(current => {
                        const input = e.target as HTMLInputElement
                        current[name] = input.value
                        return {...current}
                    })
                }

                const avatarHandler = (avatar: Animal) => {
                    $formData(current => {
                        current.avatar = avatar
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
                                        type="button"
                                        className={`avatar ${active ? "active":""}`}
                                        onClick={()=>{avatarHandler(value as Animal)}}
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