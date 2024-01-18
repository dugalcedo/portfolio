import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const ROOT = location.href.includes('localhost') ? 'http://localhost:4321' : ''

export const Backend = axios.create({
    baseURL: ROOT
})

async function handleAxiosCall(callback, then) {
    if (!then) then = result => result.data
    try {
        let result = await callback()
        result = await then(result)
        return result.data
    } catch (error) {
        console.log(error)
        return error.response?.data
    }
}

export async function getUser() {
    const token = LS.token
    if (!token) return {}
    return handleAxiosCall(Backend.get('/api/user/auth', LS.tokenHeaders))
}

export async function logInUser(data = {}) {
    if (!data.username || ! data.password) return {}
    return handleAxiosCall(
        Backend.get('/api/user', {
            headers: {
                'x-username': data.username,
                'x-password': data.password
            }
        }),
        result => {
            LS.token = result.data.token
            location.href = '/'
            return result.data
        }
    )
}

export async function signUpUser(data) {
    handleAxiosCall(
        Backend.post('/api/user', data),
        result => {
            LS.token = result.data.token
            location.href = '/'
            return result.data
        }
    )
}

export async function createPost(data) {
    handleAxiosCall(
        Backend.post('/api/post', data, LS.tokenHeaders),
        result => {
            location.href = '/social'
            return result.data
        }
    )
}

export async function getAllPosts() {
    handleAxiosCall(
        Backend.get('/api/post/all', LS.tokenHeaders),
        async result => {
            const posts = result.data.map(p => {
                p.timestamp = dayjs(p.createdAt).format('YY.MM.DD HH:mm')
                p.relativeTime = dayjs().to(dayjs(p.createdAt))
                p.edited = p.createdAt !== p.updatedAt
                return p
            })
            return posts
        }
    )
}

export async function deletePost(id) {
    handleAxiosCall(
        Backend.delete('/api/post', {
            headers: {
                'x-token': LS.token,
            },
            data: {
                id
            }
        }),
        result => {
            location.href = '/social'
            return result.data
        }
    )
}

export async function editPost(id, content) {
    handleAxiosCall(
        Backend.put('/api/post', {id, content}, LS.tokenHeaders),
        result => {
            location.href = '/social'
            return result.data
        }
    )
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