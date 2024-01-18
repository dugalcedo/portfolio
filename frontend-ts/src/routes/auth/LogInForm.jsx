import { logInUser } from "../../lib/backend-api.js"
import Form from "../../components/Form.jsx"

export default function LogInForm() {

    const passwordValidator = (val, data) => {
        return !val ?
            "Field cannot be blank" :
            val.length < 6 ?
            "Invalid password" :
            ""
        
    }

    const usernameValidator = (val) => {
        return !val ?
            "Field cannot be blank" :
            val.length < 2 ?
            "Invalid username" :
            ""
    }

    const handleLogIn = async (form, data) => {
        const response = await logInUser(data)
        console.log(response)
    }

  return (
    <Form 
        title="Log in"
        fields={[
            {
                label: 'Username',
                name: 'username',
                validator: usernameValidator
            },
            {
                label: 'Password',
                name: 'password',
                type: 'password',
                validator: passwordValidator
            }
        ]}
        onSubmit={handleLogIn}
    />
  )
}