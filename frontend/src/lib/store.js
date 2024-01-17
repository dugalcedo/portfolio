import { atom, useAtom } from 'jotai'

const _store = atom({
    user: {},
    loggedIn: false,
})

const useStore = (component) => {
    let [store, setStore] = useAtom(_store)
    const $store = x => {
        setStore(current => {
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