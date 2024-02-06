import React from 'react'

function TimeAndLocation() {
  return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xl font-extralight'>
                Tuesday, 6 Februrary 2024 | Local time: 1:26 PM
            </p>
        </div>

        <div className='flex items-center justify-center my-3'>
            <p className='text-white text-xl font-medium'>
                Plainfield, Illinois
            </p>
        </div>
    </div>
  );
};

export default TimeAndLocation;