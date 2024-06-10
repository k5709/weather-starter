import React from 'react'
import {UilArrowUp,
     UilArrowDown,
     UilTemperature,
      UilTear,
       UilWind,
        UilSun,
         UilSunset} from '@iconscout/react-unicons'

function TemperatureAndDetails({
    weather: {
    details,
    icon,
     temp,
      temp_min,
       temp_max,
        sunrise,
         sunset,
          speed,
           humidity,
            feels_like
        }}) {
  return (
<div>
    <div className='flex items center justify-center py-6 text-xl text-cyan-200'>
        <p>{details} </p>
    </div>
    {/* Actual Temp Data */}
    <div className='flex flex-row items-center justify-between py-3 text-white'>
        <img src={`${icon}`}
         alt="weather icon"
          className='w-20'
        />
        <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
        <div className='flex flex-col space-y-2'>    
            <div className='flex font-light text-sm items-center justify-center'>
                <UilTemperature size={18} className='mr-1'/>
                Real Feel:
                <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
            </div>
            
            <div className='flex font-light text-sm items-center justify-center'>
                <UilTear size={18} className='mr-1'/>
                Humidity:
                <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
            </div>

            <div className='flex font-light text-sm items-center justify-center'>
                <UilWind size={18} className='mr-1'/>
                Wind:
                <span className='font-medium ml-1'>{`${speed.toFixed()} km/h`}</span>
            </div>
        </div>
    </div>
    {/* Highs and Lows of the city */}
    <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3'>
        <UilSun />
        <p className='font-light'
        >Rise: <span className='font-medium ml-1'>{sunrise}</span> 
        </p>
        <UilSunset />
        <p className='font-light'
        >Sunset: <span className='font-medium ml-1'>{sunset}</span> 
        </p>
        <UilArrowUp />
        <p className='font-light'
        >High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span> 
        </p>
        <UilArrowDown/>
        <p className='font-light'
        >Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span> 
        </p>
    </div>







</div>
  );
};

export default TemperatureAndDetails;