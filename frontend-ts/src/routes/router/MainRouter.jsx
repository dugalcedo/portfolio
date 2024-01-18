import { Routes, Route } from 'react-router-dom'
import routes from './routes.jsx'

export default function MainRouter() {
  return (
    <Routes>
        {routes.map((route, routeIndex) => {

            return (
                <Route 
                    path={route.path} 
                    element={route.element}
                    key={route.path}
                />
            )
        })}
    </Routes>
  )
}