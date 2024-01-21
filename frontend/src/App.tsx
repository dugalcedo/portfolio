import './style/index.css'

import Nav from './routes/router/Nav.tsx'
import MainRouter from './routes/router/MainRouter.tsx'

import { useEffect } from 'react'

import { getUser } from './lib/backend-api.ts'
import { useStore } from './lib/store.ts'

export default function App() {

  const {store, $store} = useStore()

  useEffect(()=>{
    getUser()
      .then(response => {
        const user = response.data || {}
        console.log(`USER:`, user)
        // this means we must be logged in
        if (user.username) $store({loggedIn: true})

        $store({user: user})
      })
  },[])

  return (
    <>    
      <header className='container'>
        <h1 className="orange-wine">Doug Alcedo</h1>
        <p>Hej, {store.user.username || 'buddy'}.</p>
        <Nav />
      </header>
      <main>
        <MainRouter />
      </main>
    </>
  )
}
