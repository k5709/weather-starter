import React from 'react';

function TopButtons({setQuery}) {

    const cities = [
        {
            id:1,
            title: "Paris"
        }, 
        {
            id:2,
            title: "Quebec"
        },
        {
            id:3,
            title: "Tokyo"
        },
        {
            id:4,
            title: "Chicago"
        },
        {
            id:5,
            title: "Ireland"
        },
        
    ];

    return (    
    <div className='flex items-center justify-around my-6'>
     {cities.map((city) => ( 
        <button key={city.id} 
        className='text-white text-lg font-medium
        hover:bg-gray-700/20 
        px-3 py-2 rounde-md 
        transition ease-in'
        onClick={() => setQuery({q: city.title})}>
            {city.title}
        </button>
        ))}
    </div>
    );
}
export default TopButtons;