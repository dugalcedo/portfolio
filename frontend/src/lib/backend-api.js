import axios from 'axios'

export const ROOT = location.href.includes('localhost') ? 'http://localhost:4321' : ''

export const Backend = axios.create({
    baseURL: ROOT
})

export async function getUser() {
    const token = LS.token
    if (!token) return {}

    try {
        const result = await Backend.get('/api/user/auth', {
            headers: {
                'x-token': token
            }
        })
        return result.data
    } catch (error) {
        console.log(error)
        return error.response?.data
    }
}

export async function logInUser(data = {}) {
    if (!data.username || ! data.password) return {}

    try {
        const result = await Backend.get('/api/user', {
            headers: {
                'x-username': data.username,
                'x-password': data.password
            }
        })
        LS.token = result.data.token
        location.href = '/'
        return result.data
    } catch (error) {
        console.log(error)
        return error.response?.data
    }
}

export async function signUpUser(data) {
    try {
        const result = await Backend.post('/api/user', data)
        LS.token = result.data.token
        location.href = '/'
        return result.data
    } catch (error) {
        console.log(error)
        return error.response?.data
    }
}

export const LS = {
    get: (key, fallback) => {
        const result = localStorage.getItem(`doug-alcedo-${key}`)
        return result ? JSON.parse(result) : fallback
    },
    set: (key, value) => {
        try {
            localStorage.setItem(`doug-alcedo-${key}`, JSON.stringify(value))
        } catch {
            localStorage.setItem(`doug-alcedo-${key}`, value)
        }
    },
    del: (key) => {
        localStorage.removeItem(`doug-alcedo-${key}`)
    },
    get token() {
        return this.get('token')
    },
    set token(value) {
        this.set('token', value)
    }
}