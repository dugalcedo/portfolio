import { Link } from "react-router-dom"
import routes from "./routes.jsx"

import { useStore } from "../../lib/store.js"
import { LS } from "../../lib/backend-api.js"

export default function Nav() {

  const {store} = useStore(this)

  const signOut = () => {
    LS.del('token')
    location.reload()
  }

  return (
    <nav>
        {/* ROUTES MAP */}
        {routes.map((route, routeIndex) => {

          if (!route.nav) return ""
          if (store.loggedIn && route.auth === 'loggedOut') return ""
          if (!store.loggedIn && route.auth === 'loggedIn') return ""

          return (
            <div key={route.path} className="nav-item">
              <Link to={route.path}>{route.nav}</Link>
            </div>
          )
        })}
        {/* LOGGED IN SPECIAL ELEMENTS */}
        {store.loggedIn && (
          <>
            <div className="nav-item">
              <button onClick={signOut}>
                Sign out
              </button>
            </div>
          </>
        )}
    </nav>
  )
}