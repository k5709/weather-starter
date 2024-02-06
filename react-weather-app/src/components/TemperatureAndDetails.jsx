import React from 'react'
import {UilArrowUp,
     UilArrowDown,
     UilTemperature,
      UilTear,
       UilWind,
        UilSun,
         UilSunset} from '@iconscout/react-unicons'

function TemperatureAndDetails() {
  return (
<div>
    <div className='flex items center justify-center py-6 text-xl text-cyan-200'>
        <p>Cloudy </p>
    </div>
    {/* Actual Temp Data */}
    <div className='flex flex-row items-center justify-between py-3 text-white'>
        <img src="http://openweathermap.org/img/wn/01d@2x.png"
         alt=""
          className='w-20'
        />
        <p className='text-5xl'>34°</p>
        <div className='flex flex-col space-y-2'>    
            <div className='flex font-light text-sm items-center justify-center'>
                <UilTemperature size={18} className='mr-1'/>
                Real Feel:
                <span className='font-medium ml-1'>32°</span>
            </div>
            
            <div className='flex font-light text-sm items-center justify-center'>
                <UilTear size={18} className='mr-1'/>
                Humidity:
                <span className='font-medium ml-1'>32°</span>
            </div>

            <div className='flex font-light text-sm items-center justify-center'>
                <UilWind size={18} className='mr-1'/>
                Wind:
                <span className='font-medium ml-1'>11 km/h</span>
            </div>
        </div>
    </div>
    {/* Highs and Lows of the city */}
    <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3'>
        <UilSun />
        <p className='font-light'
        >Rise: <span className='font-medium ml-1'>05:50 AM</span> 
        </p>
        <UilSunset />
        <p className='font-light'
        >Sunset: <span className='font-medium ml-1'>05:50 PM</span> 
        </p>
        <UilArrowUp />
        <p className='font-light'
        >High: <span className='font-medium ml-1'>44°</span> 
        </p>
        <UilArrowDown/>
        <p className='font-light'
        >Low: <span className='font-medium ml-1'>30°</span> 
        </p>
    </div>







</div>
  );
};

export default TemperatureAndDetails;