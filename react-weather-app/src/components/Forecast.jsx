import React from 'react'

const Forecast = ({title, data}) => {
    console.log("forecast data received", data)
    return (
    <div>
      {/* Hourly Forecast Header */}
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      {/* Forecast data */}
      <div className="flex flex-row items-center justify-between text-white">
        {data.map((d, index) => (
          <div key={index} className="flex flex-col items-center justify-between">
            <p className="font-light text-sm">{d.title}</p>
            <img src={d.icon} alt="weather icon" className="w-12 my-1" />
            <p>{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Forecast;
