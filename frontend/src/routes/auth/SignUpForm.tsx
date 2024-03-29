import { signUpUser } from "../../lib/backend-api.ts"
import { handleSubmit } from 'general'
import Form from "../../components/Form.tsx"
import { FormEvent } from 'react'
import { VarObj } from 'types'

export default function SignUpForm() {

    const passwordValidator = (val: string, data: VarObj) => {
        return !val ?
            "Field cannot be blank" :
            val.length < 6 ?
            "Password must be at least 6 characters" :
            data.password !== data.password2 ?
            "Passwords must match" : ""
        
    }

    const usernameValidator = (val: string) => {
        return !val ?
            "Field cannot be blank" :
            val.length < 2 ?
            "Username must be at least 2 characters" :
            val.toLowerCase() === 'buddy' ?
            "You can't be buddy. No one can be buddy." :
            ""
    }

    const emailValidator = (val: string) => {
        return !val ?
            "Field cannot be blank":
            ""
    }

    const handleSignUp = async (form: HTMLElement, data: VarObj) => {
        const response = await signUpUser(data)
        if (response.msg == 'Success') {
            location.href = '/'
        } else {
            
        }
    }

  return (
    <Form 
        title="Sign up"
        fields={[
            {
                label: 'Username',
                name: 'username',
                validator: usernameValidator
            },
            {
                label: 'Email',
                name: 'email',
                type: 'email',
                validator: emailValidator
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                validator: passwordValidator
            },
            {
                label: 'Repeat password',
                name: 'password2',
                type: 'password',
                validator: passwordValidator
            },
            {
                label: 'Avatar',
                name: 'avatar',
                type: 'avatar'
            }
        ]}
        onSubmit={handleSignUp}
    />
  )
}