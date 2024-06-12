import React, { useState } from 'react';
import{UilSearch, UilLocationPoint} from '@iconscout/react-unicons'

 const Inputs = ({setQuery, setUnits}) => {

    const [city, setCity] = useState("");

    const handleSearch = () => {
        if(city !== "") setQuery({q: city})
    }

    return(
        <div className='flex flex-row justify-center my-6'>
            <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
                <input 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder='Search...'
                className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize' 
                />
                <UilSearch size={25}
                 className='text-white cursor-pointer transition ease-out hover:scale-125' 
                 onClick={handleSearch}
                 />
                <UilLocationPoint size={25}
                 className='text-white cursor-pointer transition ease-out hover:scale-125'
                 />
            </div>

                <div className='flex flex-row w-1/4 items-center justify-center'>
                    <button name='metric'
                     className='text-xl text-white font-light'>℃</button>

                    <p className='text-xl text-white mx-1'>|</p>

                    <button name='imperial'
                     className='text-xl text-white font-light'>℉</button>
                </div>
        </div>
    );
};
export default Inputs;