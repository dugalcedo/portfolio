import { signUpUser } from "../../lib/backend-api.js"
import Form from "../../components/Form.jsx"
import avatars from "../../lib/avatars.jsx"

export default function SignUpForm() {

    const passwordValidator = (val, data) => {
        return !val ?
            "Field cannot be blank" :
            val.length < 6 ?
            "Password must be at least 6 characters" :
            data.password !== data.password2 ?
            "Passwords must match" : ""
        
    }

    const usernameValidator = (val) => {
        return !val ?
            "Field cannot be blank" :
            val.length < 2 ?
            "Username must be at least 2 characters" :
            val.toLowerCase() === 'buddy' ?
            "You can't be buddy. No one can be buddy." :
            ""
    }

    const emailValidator = val => {
        return !val ?
            "Field cannot be blank":
            ""
    }

    const handleSignUp = async (form, data) => {
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