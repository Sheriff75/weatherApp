/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import axios from 'axios';
import React from 'react';
import {createContext, useState,} from 'react'

interface WeatherData {
  location: {name: string, lat: number, lon: number, region: string, country: string, tz_id: string, localtime: string};
  current: {
    wind_degree: number, wind_dir: number, wind_mph: number, vis_miles: number, temp_c: number, cloud: number, dewpoint_c: number, feelslike_c: number
    condition: {code: number, icon: string, text: string},
    air_quality: {o3: number, no2: number, co: number, }
  };
    forecast: {
      forecastday: Array<{astro: {sunrise: string, sunset: string, moonPhase: string, moonrise: string, moonset: string},
    date: string,
    day: {daily_chance_of_rain: number, daily_chance_of_snow: number, avgtemp_c: number, maxtemp_c: number, mintemp_c: number},
    hour: Array<{condition: { icon: string}, temp_c: number, time: string
  
  }>
    }>
    }
    }

    interface WeatherContextProps {
      weatherData: WeatherData | null;
      getWeatherApi: (location: string) => Promise<WeatherData | void>;
      pressure: number;
      humidity: number;
      visibility: number;
      uvIndex: number;
      defraIndex: number;
      currentImg: string;
    }    

export const WeatherContext = createContext<WeatherContextProps | null>(null) 

const Context: React.FC<{children: React.ReactNode}> = ({children}) => {
       const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
       const [pressure, setPressure] = useState<number>(0)
       const [humidity, setHumidity] = useState<number>(0)
       const [visibility, setVisibility] = useState<number>(0)
       const [uvIndex, setUvIndex] = useState<number>(0)
       const [defraIndex, setDefraIndex] = useState<number>(0)
       const [currentImg, setCurrentImg] = useState<string>('')

       const getWeatherApi = async (location: string) => {
            try{      
              const getWeather: any = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=4173baef6119453fa2782521251702&q=${location}&aqi=yes`)
              const data = getWeather.data
              console.log(data)
              const WeatherData: WeatherData = {
                location: {
                name: data?.location?.name,
                lat: data?.location?.lat,
                lon: data?.location?.lon,
                region: data?.location?.region,
                country: data?.location?.country,
                tz_id: data?.location?.tz_id,
                localtime: data?.location?.localtime,
                
              },
              current: {
                wind_degree: data?.current?.wind_degree,
                wind_dir: data?.current?.wind_dir,
                wind_mph: data?.current?.wind_mph,
                vis_miles: data?.current?.vis_miles, 
                condition: {
                  code: data?.current?.condition?.code,
                  icon: data?.current?.condition?.icon,
                  text: data?.current?.condition?.text
                },
                air_quality: {
                  o3: data?.current?.air_quality?.o3,
                  no2: data?.current?.air_quality?.no2,
                  co: data?.current?.air_quality?.co,
                },
                temp_c: data?.current?.temp_c,
                cloud: data?.current?.cloud,
                dewpoint_c: data?.current?.dewpoint_c,
                feelslike_c: data?.current?.feelslike_c,
              }, 
              forecast: {
              forecastday: data?.forecast?.forecastday.map((item: {astro: {sunrise: string, sunset: string, moonPhase: string, moonrise: string, moonset: string}, date: string, day: {daily_chance_of_rain: number, daily_chance_of_snow: number, avgtemp_c: number, maxtemp_c: number, mintemp_c: number}, hour: {condition: {code: number, icon: string, text: string}, tempC: number, tempF: number}}) => ({
                astro: {
                sunrise: item?.astro?.sunrise,
                sunset: item?.astro?.sunset,
                moonPhase: item?.astro?.moonPhase,
                moonrise: item?.astro?.moonrise,
                moonset: item?.astro?.moonset
              },
              date: item.date,
              day: {
                daily_chance_of_rain: item?.day?.daily_chance_of_rain,
                daily_chance_of_snow: item?.day?.daily_chance_of_snow,
                avgtemp_c: item?.day?.avgtemp_c,
                maxtemp_c: item?.day?.maxtemp_c,
                mintemp_c: item?.day?.mintemp_c
                },
                hour: Array.isArray(item?.hour) ? item.hour.map((hourItem: {condition: {icon: string}, temp_c: number, time: string}) => ({
                  condition: {
                    icon: hourItem?.condition?.icon
                  },
                  temp_c: hourItem?.temp_c,
                  time: hourItem.time
                })) : []
                }))
            }}
          
          setWeatherData(WeatherData)
          setUvIndex(data?.current?.uv)
          setHumidity(data?.current?.humidity)
          setCurrentImg(data?.current?.condition?.icon)
          setVisibility(data?.current?.vis_km)
          setDefraIndex(data?.current?.air_quality['gb-defra-index'])
          setPressure(data?.current?.pressure_in)
        
          return data
      }
        catch(error) {
          console.error('Error fetching Weather Data:', error)
        }
          }

          const contextValues = {weatherData, getWeatherApi, pressure, humidity, visibility, uvIndex, defraIndex, currentImg}
    
    return(
        <WeatherContext.Provider value={contextValues}>
            {children}
        </WeatherContext.Provider>
    )
}

export default Context