import { VarObj, Animal } from './types.ts'

import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const ROOT = location.href.includes('localhost') ? 'http://localhost:4321' : ''

export const Backend = axios.create({
    baseURL: ROOT
})


type AxiosHandlerFollowup = (result: VarObj) => VarObj

async function handleAxiosCall(promise: Promise<{}>, then?: AxiosHandlerFollowup): Promise<VarObj> {
    if (!then) then = result => result
    try {
        let result = await promise
        result = await then(result)
        return result
    } catch (error: any) {
        console.log(error)
        return error.response?.data
    }
}

export async function getUser() {
    const token = LS.token
    if (!token) return {}
    return await handleAxiosCall(
        Backend.get('/api/user/auth', LS.tokenHeaders)
    )
}

export async function logInUser(data: VarObj = {}) {
    if (!data.username || ! data.password) return {}
    return await handleAxiosCall(
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

export async function signUpUser(data: VarObj = {}) {
    return await handleAxiosCall(
        Backend.post('/api/user', data),
        result => {
            LS.token = result.data.token
            location.href = '/'
            return result.data
        }
    )
}

export async function createPost(data: {}) {
    return await handleAxiosCall(
        Backend.post('/api/post', data, LS.tokenHeaders),
        result => {
            location.href = '/social'
            return result.data
        }
    )
}

interface SanitizedPost  {
    id: string
    author: string
    likes: number
    avatar: Animal
    content: string
    timestamp: string
    createdAt: string
    updatedAt: string
    relativeTime: string
    edited: boolean
}
export async function getAllPosts() {
    return await handleAxiosCall(
        Backend.get('/api/post/all', LS.tokenHeaders),
        async result => {
            const posts = result.data.map((p: SanitizedPost) => {
                p.timestamp = dayjs(p.createdAt).format('YY.MM.DD HH:mm')
                p.relativeTime = dayjs().to(dayjs(p.createdAt))
                p.edited = p.createdAt !== p.updatedAt
                return p
            })
            return posts
        }
    )
}

export async function deletePost(id: number) {
    return await handleAxiosCall(
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

export async function editPost(id: number, content: string) {
    return await handleAxiosCall(
        Backend.put('/api/post', {id, content}, LS.tokenHeaders),
        result => {
            location.href = '/social'
            return result.data
        }
    )
}

export const Admin = {
    users: async () => {
        return await handleAxiosCall(
            Backend.get('/admin/users', LS.tokenHeaders),
            result => result.data
        )
    }
}

export const LS = {
    get: (key: string, fallback?: any) => {
        let result = localStorage.getItem(`doug-alcedo-${key}`)
        if (!result) {
            return fallback
        }
        try {
            result = JSON.parse(result)
            return result
        } catch (error) {
            return result || fallback
        }
    },
    set: (key: string, value: any) => {
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
    del: (key: string) => {
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