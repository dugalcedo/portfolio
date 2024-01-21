import HomeRoute from '../home/HomeRoute.js'
import WeatherRoute from '../weather/WeatherRoute.jsx'
import Auth from '../auth/Auth.js'
import SocialMedia from '../social-media/SocialMedia.jsx'
import AdminRoute from '../admin/AdminRoute.jsx'

export default [
    {
        path: '/',
        element: <HomeRoute />,
        nav: 'Home',
        auth: null,
    },
    {
        path: '/weather',
        element: <WeatherRoute />,
        nav: 'Weather',
        auth: null
    },
    {
        path: '/auth',
        element: <Auth />,
        nav: 'Log in / Sign up',
        auth: 'loggedOut'
    },
    {
        path: '/social',
        element: <SocialMedia />,
        nav: 'Social media',
    },
    {
        path: '/admin',
        element: <AdminRoute />,
        nav: 'Admin',
        auth: 'admin'
    }
]