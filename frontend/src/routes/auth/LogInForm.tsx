import { VarObj } from '../../lib/types.js'
import { logInUser } from "../../lib/backend-api.js"
import Form from "../../components/Form.js"

export default function LogInForm() {

    const passwordValidator = (val: string, data: VarObj) => {
        return !val ?
            "Field cannot be blank" :
            val.length < 6 ?
            "Invalid password" :
            ""
        
    }

    const usernameValidator = (val: string) => {
        return !val ?
            "Field cannot be blank" :
            val.length < 2 ?
            "Invalid username" :
            ""
    }

    const handleLogIn = async (form: HTMLFormElement, data: VarObj) => {
        const response = await logInUser(data)
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