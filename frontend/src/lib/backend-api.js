import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const ROOT = location.href.includes('localhost') ? 'http://localhost:4321' : ''

export const Backend = axios.create({
    baseURL: ROOT
})

export async function getUser() {
    const token = LS.token
    if (!token) return {}

    try {
        const result = await Backend.get('/api/user/auth', LS.tokenHeaders)
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

export async function createPost(data) {
    try {
        const result = await Backend.post('/api/post', data, LS.tokenHeaders)
        location.href = '/social'
    } catch (error) {
        console.log(error)
        return error.response?.data
    }
}

export async function getAllPosts() {
    try {
        const result = await Backend.get('/api/post/all', LS.tokenHeaders)
        const posts = result.data.map(p => {
            p.timestamp = dayjs(p.createdAt).format('YY.MM.DD HH:mm')
            p.relativeTime = dayjs().to(dayjs(p.createdAt))
            p.edited = p.createdAt !== p.updatedAt
            return p
        })
        return posts
    } catch (error) {
        console.log(error)
        return error.response?.data
    }
}

export async function deletePost(id) {
    try {
        const result = await Backend.delete('/api/post', {
            headers: {
                'x-token': LS.token,
            },
            data: {
                id
            }
        })
        location.href = '/social'
    } catch (error) {
        console.log(error)
        return error.response?.data
    }
}

export async function editPost(id, content) {
    try {
        const result = await Backend.put('/api/post', {id, content}, LS.tokenHeaders)
        location.href = '/social'
    } catch (error) {
        console.log(error)
        return error.response?.data
    }
}

export const LS = {
    get: (key, fallback) => {
        const result = localStorage.getItem(`doug-alcedo-${key}`)
        try {
            result = JSON.parse(result)
            return result
        } catch (error) {
            return result || fallback
        }
    },
    set: (key, value) => {
        if (typeof value === 'string') {
            localStorage.setItem(`doug-alcedo-${key}`, value)
            return
        }
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
    },
    get tokenHeaders() {
        return {headers: {'x-token': this.token}}
    }
}