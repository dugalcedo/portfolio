import './style/index.css'

import Nav from './routes/router/Nav.jsx'
import MainRouter from './routes/router/MainRouter.jsx'

import { useEffect } from 'react'

import { getUser } from './lib/backend-api.js'
import { useStore } from './lib/store.js'

export default function App() {

  const {store, $store} = useStore()

  useEffect(()=>{
    getUser()
      .then(user => {
        console.log(`USER:`, user)
        // this means we must be logged in
        if (user.username) $store({loggedIn: true})

        $store({user})
      })
  },[])

  return (
    <>    
      <header className='container'>
        <h1>Doug Alcedo</h1>
        <p>Hej, {store.user.username || 'buddy'}.</p>
        <Nav />
      </header>
      <main>
        <MainRouter />
      </main>
    </>
  )
}
