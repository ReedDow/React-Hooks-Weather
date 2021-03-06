
import './App.css';
import React, { useState } from 'react';
const api = {
  key: '4f59f26171e524cda7cb6e312ce8e2e9',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          console.log(result)
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day},  ${month} ${date}, ${year}`
  }

  return (
    <div
      className={
        (typeof weather.main === 'undefined') ? 'app warm dry'
          : ((weather.main.temp > 60) && (weather.weather[0].main === 'clouds')) ? 'app warm dry'
            : (weather.main.temp > 60 && weather.weather[0].main === 'clear') ? 'app warm dry'
              : (weather.main.temp > 60 && weather.weather[0].main === 'rain') ? 'app warm rain'
                : (weather.main.temp < 60 && weather.weather[0].main === 'clouds') ? 'app cold dry'
                  : (weather.main.temp < 60 && weather.weather[0].main === 'clear') ? 'app cold dry'
                    : ((weather.main.temp < 60) && (weather.weather[0].main === 'rain')) ? 'app cold rain'
                      : (weather.main.temp < 60 && weather.weather[0].main === 'snow') ? 'app cold snow'
                        : 'app cold rain'
      }
    >
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}°
              </div>
              <div className='weather'> {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
