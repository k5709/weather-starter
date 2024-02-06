import React from 'react'

function Forecast({title}) {
  return (
    <div>
        {/* Hourly Forecast Header. */}
        <div className='flex items-center justify-start mt-6'>
            <p className='text-white font-medium uppercase'>
                {title}</p>
        </div>
        <hr className='my-2'/>
        {/* Forecast data. */}
        <div className='flex flex-row items-center justify-between text-white'>
            <div className='flex flex-col items-center jusitfy-between'>
                <p className='font-light text-sm'>04:30 PM</p>
                <img src="http://openweathermap.org/img/wn/01d@2x.png"
                alt=""
                className='w-12 my-1'
                />
                <p>21°</p>
            </div>

            <div className='flex flex-col items-center jusitfy-between'>
                <p className='font-light text-sm'>04:30 PM</p>
                <img src="http://openweathermap.org/img/wn/01d@2x.png"
                alt=""
                className='w-12 my-1'
                />
                <p>30°</p>
            </div>
            
            <div className='flex flex-col items-center jusitfy-between'>
                <p className='font-light text-sm'>04:30 PM</p>
                <img src="http://openweathermap.org/img/wn/01d@2x.png"
                alt=""
                className='w-12 my-1'
                />
                <p>29°</p>
            </div>

            <div className='flex flex-col items-center jusitfy-between'>
                <p className='font-light text-sm'>04:30 PM</p>
                <img src="http://openweathermap.org/img/wn/01d@2x.png"
                alt=""
                className='w-12 my-1'
                />
                <p>28°</p>
            </div>

            <div className='flex flex-col items-center jusitfy-between'>
                <p className='font-light text-sm'>04:30 PM</p>
                <img src="http://openweathermap.org/img/wn/01d@2x.png"
                alt=""
                className='w-12 my-1'
                />
                <p>22°</p>
            </div>
        </div>

    </div>
  );
};

export default Forecast;