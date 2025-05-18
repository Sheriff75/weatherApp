'use client'

import React, {useState, useEffect, useContext} from 'react'
import {InputBase, Typography, Box, Button, Stack, Avatar} from '@mui/material'
import {  Search as SearchIcon } from '@mui/icons-material'
import { WeatherContext } from '../components/context'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  type WeatherData = {
    location?: {
      name?: string;
      country?: string;
    };
    current?: {
      temp_c?: number;
      condition?: {
        icon?: string;
      };
    };
    forecast?: {
      forecastday?: {
        day?: {
          maxtemp_c?: number;
          mintemp_c?: number;
        };
      }[];
    };
  };
  
  const [searches, setSearches] = useState<{query: string, data: WeatherData}[]>([])
  
  const weatherContext = useContext(WeatherContext)
  const {getWeatherApi} = weatherContext || {}
    
  useEffect(() => {
    if(getWeatherApi){
      getWeatherApi("Nigeria")
    }}, [])
  
    
    const fetchSearches = async () => {
      const res = await fetch('/api/searches');
      const data = await res.json();
      setSearches(Array.isArray(data) ? data : []);
    }
    useEffect( () => { 
      fetchSearches()
    }, [])

    const handleSearch = async () => {
      if(getWeatherApi) {
        const data = await getWeatherApi(searchInput)
        await fetch('/api/searches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          temp: data?.current.temp_c,
          condition: data?.current.condition.icon,
          name: data?.location.name,
          country: data?.location.country,
          maxtemp: data?.forecast.forecastday[0].day.maxtemp_c,
          mintemp: data?.forecast.forecastday[0].day.mintemp_c,
          data: data,
        }),
      });
      fetchSearches(); // Refresh searches
      setSearchInput('');
      }}
            
    return(
      
        <Box style={{padding: '25px',  height: '100vh'}}>
          <Box sx={{marginBottom: '2.5rem'}}>
           <Typography gutterBottom align='left' variant ='h5'> Weather </Typography>
           <Stack direction='row' spacing={10} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(240, 235, 235, 0.93)', padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(240, 235, 235, 0.93)'}} >
                <InputBase value={searchInput} onInput = {(e) => {setSearchInput((e.target as HTMLInputElement).value)}} placeholder="Search for city or country" sx={{fontSize: '0.9rem}}'}} />
                <Button onClick={handleSearch} sx={{'&:hover': {backgroundColor: 'transparent'}}}>
                  <SearchIcon sx={{height: '20px', width: '20px', backgroundColor: 'transparent', color: 'black'}} />
                </Button>
                </Stack>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column',gap: '0.7rem'}}>
            {searches.length === 0 && (
              <Typography> No searches found </Typography>
            )}
    {searches.slice(0, 4).map((search, index) => (
    <Box key={index} sx={{padding: '20px', gap: '2rem', border: '1px solid rgba(240, 235, 235, 0.93)', borderRadius: '10px', backgroundColor: 'rgba(240, 235, 235, 0.93)'}}>
      <Stack direction='row' sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography variant='h4'>{search.data?.current?.temp_c ?? '--'}°C</Typography>
        <Avatar sx={{height: '50px', width: '50px'}} src={search.data?.current?.condition?.icon ?? ''} />
      </Stack>
      <Typography sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}} align='left' variant='subtitle2'>
        <FaArrowUp /> {search.data?.forecast?.forecastday?.[0]?.day?.maxtemp_c ?? '--'} <FaArrowDown /> {search.data?.forecast?.forecastday?.[0]?.day?.mintemp_c ?? '--'}
      </Typography>
      <Typography align='left' variant='subtitle2'>
        {search.data?.location?.name}, {search.data?.location?.country}
      </Typography>
    </Box>
  ))}
          </Box>
        </Box>
)
}

export default Search
