import React, { useEffect, useState } from 'react'
import Search from "../Assets/image/search.png"
import { WEATHER_API_KEY } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addWeatherinfo } from '../utils/createSlice'
import ClearSky from "../Assets/image/clearsky.png"
import DayCloud from "../Assets/image/daycloud.png"
import DayRain from "../Assets/image/dayrain.png"
import DayThunderStorm from "../Assets/image/daythunderstorm.png"
import DaySnow from "../Assets/image/daysnow.png"
import DayMist from "../Assets/image/daymist.png"

import ClearNight from "../Assets/image/clearnight.png"
import NightCloud from "../Assets/image/nightcloud.png"
import NightRain from "../Assets/image/nightrain.png"
import NightThunderStorm from "../Assets/image/nightthunderstorm.png"
import NightSnow from "../Assets/image/nightsnow.png"
import NightMist from "../Assets/image/nightmist.png"

import Humidity from "../Assets/image/humidity.png"
import Windy from "../Assets/image/windy.png"

import BackGroundImage from "../Assets/image/pexels-david-bartus-1166209.jpg"


const MainPage = () => {


    const [searchText,setSearchText] = useState('') 
    const [currentIcon,setCurrentIcon] = useState('')
    const dispatch = useDispatch()
    const weatherinfo = useSelector(store => store.weatherarr.weatherinfo)
    
    console.log(weatherinfo?.message)

    
    const celcius = (weatherinfo?.main?.temp - 273.15).toFixed(2)
    const cityName = weatherinfo?.name
    const humidity = weatherinfo?.main?.humidity
    const description = weatherinfo?.weather[0]?.description
    const windSpeed = weatherinfo?.wind?.speed
    
    useEffect(()=>{

    },[weatherinfo])

    const handleSearchBar = (e) => {
        setSearchText(e.target.value)
    }



    const getWeatherApi = async() => {
        const data = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchText+'&appid='+WEATHER_API_KEY)
        const json = await data.json()
        console.log(json)
        if(json.cod === "404"){
            return 
        }
        dispatch(addWeatherinfo(json))
        
        
        
    }



    const weatherIconMapping = {
    '01d': ClearSky,
    '02d': DayCloud,
    '03d': DayCloud,
    '04d': DayCloud,
    '09d': DayRain,
    '10d': DayRain,
    '11d': DayThunderStorm,
    '13d': DaySnow,
    '50d': DayMist,
    '01n': ClearNight,
    '02n': NightCloud,
    '03n': NightCloud,
    '04n': NightCloud,
    '09n': NightRain,
    '10n': NightRain,
    '11n': NightThunderStorm,
    '13n': NightSnow,
    '50n': NightMist
    };


    

    useEffect(()=>{
        const iconCode = weatherinfo?.weather?.[0]?.icon;
        if (iconCode && weatherIconMapping[iconCode]){
            setCurrentIcon(weatherIconMapping[iconCode])
        }
        
    },[weatherinfo])






    return (
    <div className='relative'>
        <img
        className='h-full w-full  absolute z-[-1] '
        src={BackGroundImage}
        alt="bakgroundimage"/>

        <div className='bg-fuchsia-950 w-2/5 ml-[30%] py-10  z-[1]'>

        {weatherinfo?.cod === "404" ? (
        <h1 className='text-white text-4xl'>Enter a valid City name</h1>
        ) : (
  
            <>
            <div className='flex justify-center mt-4'>
                <input className='bg-slate-100 rounded-lg px-16 py-2' onChange={(e)=>handleSearchBar(e)} value={searchText} />

                <img className='h-10 ml-2 '
                src={Search}
                onClick={getWeatherApi}
                alt="searchlogo"/>
            </div>



            <div>
                <img className='h-72 mt-[10%] rounded-lg ml-[27%]'
                src={currentIcon}
                alt="snow"/>
            </div>

            <div className='mt-[10%]  flex justify-center '>
                <h1 className='text-white font-semibold text-7xl'>{celcius}° C</h1>
            </div>

            <div className='mt-[2%]  flex justify-center '>               
                <h1 className='text-white text-4xl'>{description}</h1>
            </div>

            <div className='mt-[8%]  flex justify-center '>               
                <h1 className='text-white text-4xl'>{cityName}</h1>
            </div>



            <div className='flex mt-[10%] '>
                <div className='ml-[33%]'>
                <img
                className='h-20'
                src={Windy}
                alt=""/>
                <p className='text-white ml-4 text-1xl'>{windSpeed} m/s</p>
                </div>

                <div className='ml-16'>
                <img
                className='h-20 '
                src={Humidity}
                alt=""/>
                <p className='text-white text-1xl  ml-4'>{humidity}%</p>
                </div>
            </div>
            </>
        )}
            </div>
        
    </div>
  )
}




export default MainPage;