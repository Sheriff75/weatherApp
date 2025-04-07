'use client'
import {Box,  Grid2, Hidden, Container, Tabs, Tab,  Typography, Avatar, Stack, Button, Paper, InputBase, Divider} from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { CiCloud } from "react-icons/ci";
import { FaCompass } from "react-icons/fa"
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { IoArrowUpCircleSharp } from "react-icons/io5"
import { IoArrowDownCircleSharp } from "react-icons/io5"
import { MdDewPoint } from "react-icons/md";
import { IoRainy } from "react-icons/io5";
import { IoSnow } from "react-icons/io5";
import { BsEmojiFrownFill } from "react-icons/bs";
import { BsEmojiGrinFill } from "react-icons/bs";
import { BsEmojiSmileFill } from "react-icons/bs";
import { FaHandPointDown } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";
import { FaHandPointUp } from "react-icons/fa";
import SmallDevice from './small/page';
import { WeatherContext } from './components/context';
import { JSX } from 'react';

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'rgb(194, 191, 191)',
          '&.Mui-selected': {
            color: 'black', 
          },
        },
      },
    },
  },
});

interface ComponentTabProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function MyCustomtab(eachType: ComponentTabProps) {
  const {children, value, index} = eachType
  return(
    <div
    role='tabpanel'
    hidden = {value !== index}
    id= {`weather-tabpanel-${index}`}
    aria-labelledby= {`weather-tab-${index}`}
    >
      {value === index && (
        <Box sx={{display: 'flex', gap: '10px', padding:'45px'}}>
          {children}
        </Box>
      )}
    </div>
  )
}

function allyProps (index: number) {
  return {
    id: `weather-tab-${index}`,
    'aria-controls': `weather-tabpanel-${index}`, 
}
}

export default function Home() { 
  const [value, setValue] = useState<number>(0);
  const [unit, setUnit ] = useState<'C' | 'F'>('C')
  const [uvText, setUvText] = useState<string>('')
  const [uvColor, setUvColor] = useState<string>('')
  const [humidityText, setHumidityText] = useState<string>('')
  const [humidityIcon, setHumidityIcon] = useState<JSX.Element | null>(null)
  const [humidityColor, setHumidityColor] = useState<string>('')
  const [visibilityText, setVisibilityText] = useState<string>('')
  const [visibilityIcon, setVisibilityIcon] = useState<JSX.Element | null>(null)
  const [visColor, setVisColor] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const [defraIndexText, setDefraIndexText] = useState<string>('')
  const [airIcon, setAirIcon] = useState<JSX.Element | null>(null)
  const [airColor, setAirColor] = useState<string>('')
  const [pressureText, setPressureText] = useState<string>('low')
  const [pressureIcon, setPressureIcon] = useState<JSX.Element | null>(null)
  const [pressureColor, setPressureColor] = useState<string>('')
  const weatherContext = useContext(WeatherContext);
  const { weatherData, getWeatherApi, visibility, humidity, uvIndex, pressure, defraIndex, currentImg } = weatherContext || {};

  useEffect(() => {
    if (!weatherContext) return;
    if (getWeatherApi) {
      getWeatherApi('Nigeria');
    }
  }, []);

  useEffect( () => {
    if (!weatherContext) return;
    const handlePressure = () => {
      if(pressure !== undefined && pressure < 29.80) {
        setPressureText('Low')
        setPressureIcon(<BsEmojiFrownFill />)
        setPressureColor('red')
      }
      if(pressure !== undefined && pressure >= 29.80 && pressure < 30.20) {
        setPressureText('Normal')
        setPressureIcon(<BsEmojiGrinFill />)
        setPressureColor('blue')
      } 
      if(pressure !== undefined && pressure > 30.20) {
        setPressureText('High')
        setPressureIcon(<BsEmojiSmileFill />)
        setPressureColor('green')
      }
    }
    handlePressure()
  }, [pressure]) 
  
  useEffect(() => {
    const handleVisibility = () => {
      if(visibility !== undefined && visibility < 5) {
        setVisibilityText('Low')
        setVisibilityIcon(<BsEmojiFrownFill />)
        setVisColor('orange')
      }
      if(visibility !== undefined && visibility >= 5 && visibility < 10) {
        setVisibilityText('Moderate')
        setVisibilityIcon(<BsEmojiGrinFill />)
        setVisColor('green')
      }
      if(visibility !== undefined && visibility >= 10 && visibility < 20) {
        setVisibilityText('High')
        setVisibilityIcon(<BsEmojiSmileFill />)
        setVisColor('blue')

      }
      if(visibility !== undefined && visibility >= 20) {
        setVisibilityText('Very High')
        setVisibilityIcon(<BsEmojiSmileFill />)
        setVisColor('purple')

      }
    }
    handleVisibility()
  }, [visibility])

   
    useEffect(() => {
      const changeUvCond = () => {
        if(uvIndex != undefined && uvIndex < 3) {
          setUvText('Low')
          setUvColor('green')
        }
        if(uvIndex !== undefined && uvIndex >= 3 && uvIndex < 6) {
          setUvText('Moderate')
          setUvColor('yellow')
        }
        if(uvIndex !== undefined && uvIndex >= 6  && uvIndex < 8) {
          setUvText('High')
          setUvColor('orange')
        }
        if(uvIndex !== undefined && uvIndex >= 8 && uvIndex < 11) {
          setUvText('Very High')
          setUvColor('red')
        }
        if(uvIndex !== undefined && uvIndex >= 11) {
          setUvText('Extreme')
          setUvColor('black')
        }
      }
      changeUvCond()
    }, [uvIndex])

    useEffect(() => {
      const handleHumidity = () => {
        if(humidity !== undefined && humidity < 30) {
          setHumidityText('Low')
          setHumidityIcon(<FaHandPointDown />)
          setHumidityColor('yellow')
        }
        if(humidity !== undefined && humidity >= 30 && humidity < 60) {
          setHumidityText('Moderate')
          setHumidityIcon(<FaHandPointRight />)
          setHumidityColor('orange')
        }
        if(humidity !== undefined && humidity >= 60 && humidity < 80) {
          setHumidityText('High')
          setHumidityIcon(<FaHandPointUp />)
          setHumidityColor('red')
        }
        if(humidity !== undefined && humidity >= 80) {
          setHumidityText('Very High')
          setHumidityIcon(<FaHandPointUp />)
          setHumidityColor('Dark red')
        }
      }
      handleHumidity()
    }, [humidity])


    useEffect( () => {
      const handleDefraIndex = () => {
        if(defraIndex !== undefined && defraIndex >= 1 && defraIndex < 4) {
          setDefraIndexText('Low')
          setAirIcon(<FaHandPointDown />)
          setAirColor('silver')
        }
        if(defraIndex !== undefined && defraIndex >= 4 && defraIndex <= 7) {
          setDefraIndexText('Moderate')
          setAirIcon(<FaHandPointRight />)
          setAirColor('lemon')
        }
        if(defraIndex !== undefined && defraIndex >= 7 && defraIndex <= 10) {
          setDefraIndexText('High')
          setAirIcon(<FaHandPointUp />)
          setAirColor('gold')
        }
        if(defraIndex !== undefined && defraIndex >= 10) {
          setDefraIndexText('Very High')
          setAirIcon(<FaHandPointUp />)
          setAirColor('purple')
        }
      }
      handleDefraIndex()
    }, [defraIndex])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }


  console.log(weatherData)

  const feelslike: string = '/temperature-feels-like.svg'
  const place: string = '/place.jpg'
  const moonriseimg: string = '/Moonrise.png'
  const moonsetimg: string = '/Moonset.png'
  const profileImg: string = '/profile.jpg'


  const handleSearch = () => {
    if(getWeatherApi) {
      getWeatherApi(searchInput)
    }
  }

  const convertUnit = (temp: number) => {
    return unit === 'C'? temp: (temp * 9/5) + 32 ;
  }

  const changeUnitC = () => {
    setUnit(unit === 'F'? 'C' : 'C')
  }
  const changeUnitF = () => {
    setUnit(unit === 'C'? 'F' : 'F')
  }

  // const timestring = weatherData?.timelines.daily[0].time ? new Date(weatherData.timelines.daily[0].time).toLocaleTimeString() : ''

  return (
    <ThemeProvider theme={theme}>
    <Box>
      <Hidden mdDown>
    <Box sx={{display :'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'rgb(151, 148, 148)'}}>        
      <Paper sx={{display: 'flex' , height: '98%', width: '90%'}}>
      <Grid2 container columns = {{xs: 6 , sm: 6, md: 12, lg: 12}} sx={{display: 'flex', width: '100%', justifyContent: 'space-between',}} spacing={2}>
          <Grid2 size = {{xs: 6, sm:6 , md:3 , lg: 3,}} sx={{backgroundColor: 'white'}}>
              <Box sx={{width: '100%', padding: '2rem'}} >
              <Stack direction='row' spacing={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(240, 235, 235, 0.93)', padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(240, 235, 235, 0.93)'}} >
                <InputBase value={searchInput} onInput = {(e) => {setSearchInput((e.target as HTMLInputElement).value)}} placeholder="Search for city or country" sx={{marginRight: '3rem', fontSize: '0.9rem}}'}} />
                <Button onClick = {handleSearch} sx={{'&:hover': {backgroundColor: 'transparent'}}}>
                  <SearchIcon sx={{height: '20px', width: '20px', backgroundColor: 'transparent', color: 'black'}} />
                </Button>
                <Avatar sx={{height: '20px', width: '20px', padding: '1rem', color: 'black', backgroundColor: 'transparent'}}> 
                  <LocationSearchingIcon />
                </Avatar>
            </Stack>
            <Grid2 container spacing={2} sx={{display: 'flex', justifyContent: 'space-between', marginTop: '3rem'}}>
                  <Grid2 size = {{xs: 0, sm : 0, md: 12, lg: 12}}>                    
                      <img style = {{width: '250px', height: '170px', objectFit: 'contain' }} src = {currentImg || null} />                      
                     </Grid2>
                  <Grid2 size = {{xs: 0, sm : 0, md: 12, lg: 12}}> 
                      <Stack spacing={2} >
                        <Typography variant = 'h3'>
                          {weatherData && convertUnit(Number(weatherData.current.temp_c)).toFixed(2)}°{unit}
                        </Typography>
                        <Typography variant = 'subtitle1' sx={{fontWeight: 'bold'}}>
                            {weatherData && new Date(weatherData?.location?.localtime).toLocaleDateString(undefined, {weekday: 'long'})}
                             <span style={{marginLeft: '1rem' ,color: 'rgb(151, 148, 148)', fontWeight: 'normal'}} >
                              {weatherData && new Date(weatherData?.location?.localtime).toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: true})}</span>
                        </Typography>
                        </Stack> 
                    </Grid2>
              </Grid2>
              <Divider  sx={{margin: '1.5rem'}}/>
              <Grid2 container sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Grid2 sx={{display: 'flex', flexDirection: 'column' , gap: '0.2rem',justifyContent: 'space-between'}}>
                    <Stack direction='row' spacing={1} >                  
                      <Avatar src= {currentImg} sx={{height: '20px', width: '20px', backgroundColor: 'white', color: 'rgb(151, 148, 148)' }}/>
                      <Typography variant = 'subtitle1'>
                        {weatherData && weatherData?.current?.condition?.text}
                      </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1} >                  
                      <Avatar sx={{height: '20px', width: '20px', backgroundColor: 'white', color: 'rgba(163, 158, 158, 0.86)' }}>
                        < CiCloud/>
                      </Avatar>
                      <Typography variant = 'subtitle1'>
                        Cloud: {weatherData && weatherData?.current?.cloud}
                      </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>                  
                      <img src={feelslike} style = {{height: '20px', width: '20px'}} />
                      <Typography variant = 'subtitle1'>
                        Temp Feels Like: {weatherData && convertUnit(Number(weatherData?.current?.feelslike_c)).toFixed(2)}°{unit}
                      </Typography>
                    </Stack>
                    <Stack direction='row' spacing={1} sx={{marginBottom: '1rem'}} >                  
                      <Avatar sx={{height: '20px', width: '20px', backgroundColor: 'white', color: 'rgb(224, 238, 26)' }}>
                        <MdDewPoint />
                        </Avatar>
                      <Typography variant = 'subtitle1'>
                        Dew Point: {weatherData && convertUnit(Number(weatherData?.current?.dewpoint_c)).toFixed(2)}°{unit}
                      </Typography>
                    </Stack>
                  </Grid2>
                  <Grid2 size = {{md: 12, lg: 12}}>                        
                  <img src = {place} style={{height: '90px', width: '100%', objectFit: 'cover', borderRadius: '10px'}} alt = 'place'/>
                  <Typography variant= 'h6' sx={{marginTop: '-4rem', marginLeft: '1rem', fontWeight: 'bold', color: 'white'}}>
                    {weatherData && weatherData?.location?.name} , {weatherData && weatherData?.location?.country}
                  </Typography>
                  </Grid2>
            </Grid2>
              </Box>
          </Grid2>
          <Grid2 size = {{md:9 , lg: 9,}} sx={{backgroundColor: 'rgb(241, 241, 241)', padding: '15px'}}>
       <Grid2 sx={{display: 'flex', justifyContent: 'space-between', padding: '5 px'}}>
        <Container>
          <Tabs value = {value} onChange= {handleTabChange} TabIndicatorProps={{ style: {backgroundColor: 'black'}}}>
            <Tab label= 'Current' {...allyProps(0)} />
            <Tab label = 'Today'  {...allyProps(1)} />
          </Tabs>
        </Container>
        <Container sx={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Button onClick={changeUnitC} sx={{borderRadius: '50%', backgroundColor: 'black', color: 'white'}}>°C</Button>
          <Button onClick={changeUnitF}  sx={{borderRadius: '50%', backgroundColor: 'white', color: 'black'}}>°F</Button>
          <Button sx={{'&:hover': {backgroundColor: 'transparent'}}}>
            <Avatar src= {profileImg} sx={{objectFit: 'cover',}} />
          </Button>
        </Container>
       </Grid2>
       <Grid2>
        <MyCustomtab value={value} index={0}>
            <Box flexWrap = 'wrap' sx={{display:'flex', gap: '1.3rem'}}>
              <Paper elevation = {7} sx={{height: '170px', width: '200px', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center'}}>
                <Typography align='left' variant='body1' sx={{ fontWeight: 'bold'}}>
                  UV Index
                </Typography>
                <Typography variant='h4' sx={{ fontWeight: 'bold'}}>
                  {uvIndex}
                </Typography>
                <Typography variant='body1' sx={{display: 'flex', alignItems: 'center'}}>
                  <span style={{backgroundColor: uvColor, height: '30px', width: '30px', borderRadius: '50%', marginRight: '1rem' }}></span>{uvText}
                </Typography>
              </Paper>
              <Paper elevation = {7} sx={{height: '170px', width: '200px', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant='body1' sx={{fontWeight: 'bold'}}>
                  Wind Status
                </Typography>
                <Typography variant='h4' sx={{fontWeight: 'bold'}}>
                  {weatherData && weatherData?.current?.wind_mph} <span style = {{fontSize: '14px', fontStyle: 'italic', color: 'green'}}>mph</span>
                </Typography>
                <Stack direction = 'row' spacing={1} sx={{display: 'flex', alignItems: 'center'}}>
                <FaCompass />
                <Typography variant='body1'>{weatherData && weatherData?.current?.wind_degree}</Typography>
                <Typography variant='body1' sx={{marginLeft: '0.5rem'}}>{weatherData && weatherData?.current?.wind_dir}</Typography>
                </Stack>
              </Paper>
               <Paper elevation = {7} sx={{height: '170px', width: '200px', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
                <Typography align='left' variant='body1' sx={{fontWeight: 'bold'}}>
                  Humidity
                </Typography>
                <Typography variant='h4' sx={{fontWeight: 'bold'}}>
                  {humidity}%
                </Typography>
                <Stack direction= 'row-reverse' spacing={2}>
                <Typography variant='body1' sx={{display: 'flex', alignItems: 'center', color: humidityColor}}>
                  {humidityText}
                </Typography>
                <Typography variant='body1' sx={{display: 'flex', alignItems: 'center', color: humidityColor}}>
                  {humidityIcon}
                </Typography>
                </Stack>
              </Paper>
              <Paper elevation = {7} sx={{height: '170px', width: '200px', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
                <Typography align='left' variant='body1' sx={{fontWeight: 'bold'}}>
                  Air Quality
                </Typography>
                <Typography variant='h4' sx={{fontWeight: 'bold'}}>
                  {defraIndex} <span style={{textTransform: 'uppercase', fontSize: '7px'}}>gb defra index</span>
                </Typography>
                <Stack direction= 'row-reverse' spacing={2}>
                <Typography variant='body1' sx={{display: 'flex', alignItems: 'center', color: airColor}}>
                  {defraIndexText} 
                </Typography>
                <Typography variant='body1' sx={{display: 'flex', alignItems: 'center', color: airColor}}>
                  {airIcon} 
                </Typography>
                </Stack>
              </Paper>
              <Paper elevation = {7} sx={{height: '170px', width: '200px', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
                <Typography align='left' variant='body1' sx={{fontWeight: 'bold'}}>
                  Visibility
                </Typography>
                <Typography variant='h4' sx={{fontWeight: 'bold'}}>
                  {visibility} <span style = {{fontSize: '14px', fontStyle: 'italic', }}>km</span>
                </Typography>
                <Stack direction = 'row' spacing={2}>
                <Typography variant='body1' sx={{display: 'flex', alignItems: 'center', color: visColor}}>
                  {visibilityText}
                </Typography>
                <Typography variant='body1' sx={{display: 'flex', alignItems: 'center', color: visColor}}>
                  {visibilityIcon}
                </Typography>
                </Stack>
              </Paper>
              <Paper elevation = {7} sx={{height: '170px', width: '200px', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
                <Typography align='left' variant='body1' sx={{fontWeight: 'bold'}}>
                  Pressure
                </Typography>
                <Typography variant='h4' sx={{fontWeight: 'bold'}}>
                  {pressure} <span style={{textTransform: 'uppercase', fontSize: '7px',}}>inHg</span>
                </Typography>
                <Stack direction =  'row' spacing = {2}>
                <Typography variant='body1' sx={{display: 'flex', alignItems: 'center', color: pressureColor}}>
                  {pressureText} 
                </Typography>
                <Typography variant='body1' sx={{display: 'flex', alignItems: 'center', color: pressureColor}}>
                  {pressureIcon} 
                </Typography>
                </Stack>
              </Paper>
              <Paper elevation = {7} sx={{height: '170px', width: '200px', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center'}}>
                <Typography align='left' variant='body1' sx={{fontWeight: 'bold'}}>
                  Sunrise & Sunset
                </Typography>
                <Stack direction = 'row' sx={{display: 'flex', alignItems: 'center'}}>
                 <IoArrowUpCircleSharp style ={{marginRight: '0.5rem', width: '20px', height: '20px', color: 'orange'}} />
                <Typography variant='body1' sx={{fontWeight: 'bold'}}>
                  {weatherData && weatherData?.forecast?.forecastday?.[0].astro.sunrise}
                </Typography>
                </Stack>
                <Stack direction = 'row' sx={{display: 'flex', alignItems: 'center'}}>
                 <IoArrowDownCircleSharp style ={{marginRight: '0.5rem', width: '20px', height: '20px', color: 'orange'}} />
                <Typography variant='body1' sx={{fontWeight: 'bold'}}>
                  {weatherData && weatherData?.forecast?.forecastday?.[0].astro.sunset}
                </Typography>
                </Stack>
              </Paper>
              <Paper elevation = {7} sx={{height: '170px', width: '200px', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center'}}>
                <Typography align='left' variant='body1' sx={{fontWeight: 'bold'}}>
                  Moonrise & Moonset
                </Typography>
                <Stack direction = 'row' sx={{display: 'flex', alignItems: 'center'}}>
                 <img src= {moonriseimg} style ={{marginRight: '0.5rem', width: '20px', height: '20px'}} />
                <Typography variant='body1' sx={{fontWeight: 'bold'}}>
                  {weatherData && weatherData?.forecast?.forecastday?.[0].astro.moonrise}
                </Typography>
                </Stack>
                <Stack direction = 'row' sx={{display: 'flex', alignItems: 'center'}}>
                 <img src={moonsetimg} style ={{marginRight: '0.5rem', width: '20px', height: '20px'}} />
                <Typography variant='body1' sx={{fontWeight: 'bold'}}>
                  {weatherData && weatherData?.forecast?.forecastday?.[0].astro.moonset}
                </Typography>
                </Stack>
              </Paper>
              <Paper elevation = {7} sx={{height: '170px', width: '200px', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center', alignItems: 'center'}}>
                <Stack direction = 'row' sx={{display: 'flex', alignItems: 'center'}}>
                 <IoRainy style ={{marginRight: '0.5rem', width: '20px', height: '20px', color: 'black'}} />
                <Typography variant='body1' sx={{fontWeight: 'bold'}}>
                    Daily Chance Of Rain - 
                </Typography>
                </Stack>
                <Typography variant='body1' sx={{fontWeight: 'bold'}}>
                  {weatherData && weatherData?.forecast?.forecastday[0]?.day.daily_chance_of_rain}%
                </Typography>
                <Stack direction = 'row' sx={{display: 'flex', alignItems: 'center'}}>
                 <IoSnow style ={{marginRight: '0.5rem', width: '20px', height: '20px', color: 'black'}} />
                <Typography variant='body1' sx={{fontWeight: 'bold'}}>
                    Daily Chance Of Snow - 
                </Typography>
                </Stack>
                <Typography variant='body1' sx={{fontWeight: 'bold'}}>
                  {weatherData && weatherData?.forecast?.forecastday[0]?.day.daily_chance_of_snow}%
                </Typography>                
              </Paper>
            </Box>
        </MyCustomtab>
        <MyCustomtab value={value} index={1}>
              <Box flexWrap= 'wrap' sx={{display: 'flex', gap: '1rem'}}>
                {weatherData && weatherData?.forecast?.forecastday[0]?.hour?.map((item, index) => {
                  return (
                       <Paper key={index} elevation={5} sx={{width: '120px', height: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography>
                          {weatherData && new Date(item.time).toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: true})}
                        </Typography>
                        <Avatar src= {weatherData && item.condition.icon} />
                        <Typography>
                        {weatherData && convertUnit(Number(item.temp_c)).toFixed(2)}°{unit}
                        </Typography>
                </Paper> 
                  )
                })}                
              </Box>
        </MyCustomtab>
       </Grid2>
       </Grid2>
      </Grid2>
      </Paper>
      </Box>
      </Hidden>
      <Hidden mdUp>
        <Box sx={{backgroundColor: 'rgb(151, 148, 148)',}}>
              <SmallDevice allyProps = {allyProps} />
        </Box>
      </Hidden>
    </Box>
    </ThemeProvider>
  );
}
