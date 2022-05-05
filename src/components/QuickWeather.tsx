import { useEffect, useState } from "react";
import { REACT_APP_API_KEY } from "../Globals";
import Form from "./Form";


const QuickWeather = () => {
	const [weather, setWeather] = useState<any>(null);
	useEffect(() => {}, [weather]);

	const childToParent = (city: string) => {
		getWeather(city).then(setWeather);
		return null;
	};

	return !weather ? (
		<>
			<Form childToParent={childToParent}></Form>
			<p style={{ textAlign: "center", color: "gray" }}>
				{" "}
				Waiting for data ...
			</p>
		</>
	) : (
		<>
			<style>
				{`
      .quick-weather {
        display: flex;
		color:red;
        flex-direction: column;
        flex-grow : 0.5;
        justify-content : center;
        background-color: red;
        padding: 20px;
        text-align: center;
      }
    `}
			</style>
			<Form childToParent={childToParent}></Form>
			<div className='quick-weather'>
				
			<h2>Weather Details</h2>
          <h3>Temperature: {weather.current?.temperature} Celsius</h3>
          <img src={weather.current.weather_icons?.[0]} />
          <p>Wind speed: {weather.current?.wind_speed} m/s</p>
          <p>Time zone id: {weather.location?.timezone_id}</p>
			</div>
			
			
		</>
	);
};

const getWeather = async (city: string) => {
	const Weather = await fetch(
		
		`http://api.weatherstack.com/current?access_key=${REACT_APP_API_KEY}&query=${city}`
		

	);
	
	const data = await Weather.json();
	return data;
};
export default QuickWeather;
