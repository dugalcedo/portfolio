import { Animal } from './types.tsx'
import { atom, useAtom } from 'jotai'

interface Store {
    user: {
        username?: string,
        password?: string,
        avatar?: Animal,
        admin: boolean
    }
    loggedIn: boolean
}

const _store = atom({
    user: {},
    loggedIn: false,
})

const useStore = () : {
    store: Store,
    setStore: (current: any)=>any,
    $store: (x: object)=>void
} => {
    let [store, setStore] = useAtom(_store)
    const $store = (x: object) => {
        setStore((current: any) => {
            Object.entries(x).forEach(([k,v]) => {
                current[k] = v
            })
            return {...current}
        })
    }
    return {
        store,
        setStore,
        $store
    }
}

export { useStore }