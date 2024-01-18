import { FaTemperatureHigh, FaSun } from "react-icons/fa";
import { FaCloudRain, FaWind } from "react-icons/fa6";

import {
  formatN
} from '../../lib/weather-api.js'


export default function Weatherday({
  day,
  tempUnit,
  precipUnit,
  windUnit,
}) {

  return (
    <div className="weatherday" key={day.key}>
      <div className="head">
        <h3 className="date">{day.date}</h3>
        <h3 className="status">
          {day.statusText}
          <div className="status-icon">
            <img src={day.image} alt={day.alt} />
          </div>
        </h3>
      </div>
      <div className="body">
        <div className="temp">
          <h4>
            <FaTemperatureHigh />
            Temp
          </h4>
          <div className="high">
            <div className="real">
              High: <span>{formatN(day.high, tempUnit)}&deg;{tempUnit}</span>
            </div>
            <div className="feels">
              (feels like {formatN(day.feelsHigh, tempUnit)}&deg;{tempUnit})
            </div>
          </div>
          <div className="low">
            <div className="real">
              Low: <span>{formatN(day.low, tempUnit)}&deg;{tempUnit}</span>
            </div>
            <div className="feels">
              (feels like {formatN(day.feelsLow, tempUnit)}&deg;{tempUnit})
            </div>
          </div>
        </div>
        {/* end temp */}
        <div className="precip">
          <h4>
            <FaCloudRain />
            Precipitation
          </h4>
          <div className="chance">
            {day.prob}% chance of precipitation
          </div>
          <div className="rain">
            {formatN(day.rain, precipUnit)}{precipUnit} of rain
          </div>
          <div className="snow">
            {formatN(day.snow, precipUnit)}{precipUnit} of snow
          </div>
        </div>
        {/* end precip */}
        <div className="light">
          <h4>
            <FaSun />
            Sun
          </h4>
          <div className="sun">
            {day.sunrise} rise / {day.sunset} set
          </div>
          <div className="daytime">
            {day.daylight} hour long day
          </div>
          <div className="shine">
            {day.sun} hours of sunshine
          </div>
        </div>
        {/* end light */}
        <div className="wind">
          <h4>
            <FaWind />
            Wind
          </h4>
          <div className="wind">
            {formatN(day.wind, windUnit)}{windUnit} wind
          </div>
          <div className="gusts">
            {formatN(day.gusts, windUnit)}{windUnit} gusts
          </div>
          <div className="dir" dangerouslySetInnerHTML={{__html: day.windDir}}></div>
        </div>
      </div>
      {/* end body */}
    </div>
  )
}