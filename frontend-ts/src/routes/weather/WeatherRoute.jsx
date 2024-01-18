// weather api
import {
    Weather,
    fetchLocations,
    fetchForecast,
    sanitizeForecast
} from "../../lib/weather-api.js"

// general api
import {
    handleSubmit
} from "../../lib/general.js"

// components/react
import FormField from "../../components/FormField.jsx"
import Weatherday from "./Weatherday.jsx"
import Toggle from "../../components/Toggle.jsx"
import { useState, useEffect } from 'react'

// COMPONENT
export default function WeatherRoute() {

    const [searchedLocations, $searchedLocatons] = useState([])
    const [displayedWeather, $displayedWeather] = useState([])
    const [precipUnit, $precipUnit] = useState('mm')
    const [tempUnit, $tempUnit] = useState('C')
    const [windUnit, $windUnit] = useState('kph')

    // debug
    // useEffect(()=>{
    //     console.log(displayedWeather)
    // },[displayedWeather])

    const searchLocations = e => handleSubmit(e, async (form, data) => {
        if (!data.city) return
        $displayedWeather([])
        const { results: locations } = await fetchLocations(
            { name: data.city }
        )
        $searchedLocatons(locations || [])
    })

    const selectLocation = async (place, latitude, longitude) => {
        const data = await fetchForecast({
            timezone: 'auto',
            wind_speed_unit: 'kmh',
            precipitation_unit: 'mm',
            temperature_unit: 'celsius',
            latitude,
            longitude
        })

        $searchedLocatons([])
        $displayedWeather(sanitizeForecast(place, latitude, longitude, data))
    }

    return (
        <div id="weather-route" className="container">
            <div id="weather-form">
                <div id="weather-options" className="df jscb aic">
                    <div className="head">
                        <h2>Weather lookup</h2>
                    </div>
                    <div className="weather-option">
                        <h6>temp</h6>
                        <Toggle options={{
                            state: tempUnit,
                            $state: $tempUnit,
                            choices: [
                                { value: 'C' },
                                { value: 'F' }
                            ]
                        }} />
                    </div>
                    <div className="weather-option">
                        <h6>depth</h6>
                        <Toggle options={{
                            state: precipUnit,
                            $state: $precipUnit,
                            choices: [
                                { value: 'mm' },
                                { value: 'in' }
                            ]
                        }} />
                    </div>
                    <div className="weather-option">
                        <h6>speed</h6>
                        <Toggle options={{
                            state: windUnit,
                            $state: $windUnit,
                            choices: [
                                { value: 'kph' },
                                { value: 'mph' }
                            ]
                        }} />
                    </div>
                        {/* end weather options */}
                    <form onSubmit={searchLocations}>
                        <div id="city-field">
                            <FormField
                                label="City"
                                name="city"
                            />
                        </div>
                    </form>
                    {/* End search form */}
                </div>
                {searchedLocations.length > 0 && <h4 className="mb-2">Search results</h4>}
                <div id="searched-locations">
                    {searchedLocations.map(loc => {
                        const key = `${loc.name}${loc.latitude}-${loc.longitude}`
                        return (
                            <button
                                style={{
                                    display: 'block'
                                }}
                                type="button"
                                key={key}
                                className="searched-location"
                                onClick={() => { selectLocation(loc, loc.latitude, loc.longitude) }}
                            >
                                
                                <b>{loc.name}</b>, {loc.admin1 ||"Unknown region"}, {loc.country}

                            </button>
                        )
                    })}
                </div>
            </div>

            <div id="displayed-weather">
                <div className="days">
                    {displayedWeather.map(day => {

                        return (
                            <Weatherday
                                key={day.key}
                                day={day}
                                tempUnit={tempUnit}
                                windUnit={windUnit}
                                precipUnit={precipUnit}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}