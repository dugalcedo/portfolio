import HomeRoute from '../home/HomeRoute.jsx'
import WeatherRoute from '../weather/WeatherRoute.jsx'
import Auth from '../auth/Auth.jsx'
import SocialMedia from '../social-media/SocialMedia.jsx'

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
    }
]