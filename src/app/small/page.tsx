"use client";
import React, { useState, useEffect, useContext, JSX } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Avatar,
  Container,
  Divider,
  Tabs,
  Tab,
  Paper,
  IconButton,
} from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { FaHandPointDown } from "react-icons/fa6";
import { FaHandPointUp } from "react-icons/fa6";
import { FaHandPointRight } from "react-icons/fa6";
import { TbUvIndex } from "react-icons/tb";
import { MdArrowOutward } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { FaCompass } from "react-icons/fa";
import { BsEmojiFrownFill } from "react-icons/bs";
import { BsEmojiGrinFill } from "react-icons/bs";
import { BsEmojiSmileFill } from "react-icons/bs";
import IoArrowUpCircleSharp from "@mui/icons-material/ArrowUpwardSharp";
import IoArrowDownCircleSharp from "@mui/icons-material/ArrowDownwardSharp";
import { IoMdAddCircle } from "react-icons/io";
import Link from "next/link";
import { WeatherContext } from "../components/context";


const SmallDevice: React.FC = () => {
  const [humidityState, setHumidityState] = useState<string>("");
  const [humidityText, setHumidityText] = useState<string>('')
  const [humidityIcon, setHumidityIcon] = useState<JSX.Element | null>(null)
  const [humidityColor, setHumidityColor] = useState<string>('')
  const [windState, setWindState] = useState<string>("");
  const [wind, setWind] = useState<number>(0);
  const [uvState, setUvState] = useState<string>("");
  const [uvText, setUvText] = useState<string>('')
  const [uvColor, setUvColor] = useState<string>('')
  const [value, setValue] = useState<number>(0);
  const [defraIndexText, setDefraIndexText] = useState<string>('')
  const [airIcon, setAirIcon] = useState<JSX.Element | null>(null)
  const [airColor, setAirColor] = useState<string>('')
  const [visibilityText, setVisibilityText] = useState<string>('')
  const [visibilityIcon, setVisibilityIcon] = useState<JSX.Element | null>(null)
  const [visColor, setVisColor] = useState<string>('')
  const [pressureText, setPressureText] = useState<string>('low')
  const [pressureIcon, setPressureIcon] = useState<JSX.Element | null>(null)
  const [pressureColor, setPressureColor] = useState<string>('')
  
  const weatherContext = useContext(WeatherContext)
  const {getWeatherApi, weatherData, humidity, visibility, uvIndex, pressure, defraIndex} = weatherContext || {}
  
  const allyProps = (index: number) => ({
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  });
  type TabProps = {
    children: React.ReactNode;
    index: number;
    value: number;
  };
  
  const CustomTab = (each: TabProps) => {
    const { children, index, value } = each;
    return (
      <div
        role="Tab-panel"
        hidden={index !== value}
        id={`tab-${index}`}
        aria-labelledby={`tab-panel-${index}`}
      >
        {value === index && <Box sx={{}}>{children}</Box>}
      </div>
    );
  };
  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  

  useEffect(() => {
    if(getWeatherApi) {
      getWeatherApi("Nigeria");
    }
  }, []);

  useEffect(() => {
    const handleHumidity = () => {
      if (humidity!== undefined && humidity >= 0 && humidity < 30) {
        setHumidityState("Crisp Dryness");
        setHumidityText('Low')
        setHumidityIcon(<FaHandPointDown />)
        setHumidityColor('yellow')
      }

      if (humidity!== undefined && humidity >= 30 && humidity < 40) {
        setHumidityState("Mildly Parched");
        setHumidityText('Moderate')
        setHumidityIcon(<FaHandPointRight />)
        setHumidityColor('orange')
      }

      if (humidity!== undefined && humidity >= 40 && humidity < 60) {
        setHumidityState("Pleasantly Balanced");
        setHumidityText('Moderate')
        setHumidityIcon(<FaHandPointRight />)
        setHumidityColor('orange')
      }

      if (humidity!== undefined && humidity >= 60 && humidity < 70) {
        setHumidityState("Gentle Moisture");
        setHumidityText('High')
        setHumidityIcon(<FaHandPointUp />)
        setHumidityColor('red')
      }

      if (humidity!== undefined && humidity >= 70 && humidity < 80) {
        setHumidityState("Balmy Dampness");
        setHumidityText('High')
        setHumidityIcon(<FaHandPointUp />)
        setHumidityColor('red')
      }

      if (humidity!== undefined && humidity >= 80 && humidity < 90) {
        setHumidityState("Heavy Humidity");
        setHumidityText('Very High')
        setHumidityIcon(<FaHandPointUp />)
        setHumidityColor('Dark red')
      }

      if (humidity!== undefined && humidity >= 90 && humidity < 100) {
        setHumidityState("Oppressive Moisture");
        setHumidityText('Very High')
        setHumidityIcon(<FaHandPointUp />)
        setHumidityColor('Dark red')
      }
    };
    handleHumidity();
  }, [humidity]);

  useEffect(() => {
    const handleWind = () => {
      if (wind == 0) {
        setWindState("Absolute Stillness");
      }
      if (wind >= 1 && wind < 4) {
        setWindState("Barely a Whisper");
      }
      if (wind >= 4 && wind < 8) {
        setWindState("Soft Breath");
      }
      if (wind >= 8 && wind < 13) {
        setWindState("Gentle Breeze");
      }
      if (wind >= 13 && wind < 19) {
        setWindState("Steady Breeze");
      }
      if (wind >= 19 && wind < 25) {
        setWindState("Brisk Gusts");
      }
      if (wind >= 25 && wind < 32) {
        setWindState("Strong Breeze");
      }
      if (wind >= 32 && wind < 39) {
        setWindState("Powerful Gusts");
      }
      if (wind >= 39 && wind < 47) {
        setWindState("Forceful Wind");
      }
      if (wind >= 47 && wind < 55) {
        setWindState("Firece Wind");
      }
      if (wind >= 55 && wind < 64) {
        setWindState("Howling Wind");
      }
      if (wind >= 64) {
        setWindState("Violem Storm");
      }
    };

    handleWind();
  }, [wind]);

  useEffect(() => {
    const handleUV = () => {
      if (uvIndex !== undefined && uvIndex == 0) {
        setUvState("Minimal Glow");
        setUvText('Low')
        setUvColor('green')
      }
      if (uvIndex !== undefined && uvIndex >= 1 && uvIndex < 3) {
        setUvState("Soft Ray");
        setUvText('Low')
        setUvColor('green')
      }
      if (uvIndex !== undefined && uvIndex >= 3 && uvIndex < 6) {
        setUvState("Mild Warmth");
        setUvText('Moderate')
        setUvColor('yellow')
      }
      if (uvIndex !== undefined && uvIndex >= 6 && uvIndex < 8) {
        setUvState("Strong Beam");
        setUvText('High')
        setUvColor('orange')
      }
      if (uvIndex !== undefined && uvIndex >= 8 && uvIndex < 11) {
        setUvState("Blazing Heat");
        setUvText('Very High')
        setUvColor('red')
      }
      if (uvIndex !== undefined && uvIndex >= 11) {
        setUvState("Scorching Burn");
        setUvText('Extreme')
        setUvColor('black')
      }
    };
    handleUV();
  }, [uvIndex]);

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
     
        useEffect( () => {
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

        useEffect( () => {
          const handleWind = () => {
            if(weatherData) {
              setWind(weatherData.current.wind_mph)
            }
          }
          handleWind()
        })

  const moonriseimg: string = '/Moonrise.png'
  const moonsetimg: string = '/Moonset.png'

  return (
    <Box sx={{ backgroundColor: "white", height: "100vh" }}>
      <Box sx={{ padding: "30px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <FaLocationDot
              style={{ height: "20px", width: "25px" }}
            />
            <Typography variant="h6">
              {weatherData && weatherData.location.name},{" "}
              {weatherData && weatherData.location.country}
            </Typography>
          </Stack>
          <Button>
            <IoMenu style={{color: 'black', height: "30px", width: "30px" }} />
          </Button>
        </Box>
        <Typography variant="body2">
          Today,{" "}
          {weatherData &&
            new Date(weatherData.location.localtime).toLocaleDateString(
              undefined,
              { month: "short", day: "numeric" }
            )}
          <span style={{ marginLeft: "4px" }}>
            {weatherData &&
              new Date(weatherData.location.localtime).toLocaleTimeString(
                undefined,
                { hour: "2-digit", minute: "2-digit", hour12: true }
              )}
          </span>
        </Typography>
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Container>
            <Typography  sx={{ fontSize: "4.5rem" }}>
              {weatherData && weatherData.forecast.forecastday[0].day.avgtemp_c}°C
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <FaArrowUp />
                {weatherData && weatherData.forecast.forecastday[0].day.maxtemp_c}
                °C{" "}
              </span>{" "}
              <span
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <FaArrowDown />{" "}
                {weatherData && weatherData.forecast.forecastday[0].day.mintemp_c}
                °C
              </span>
            </Typography>
          </Container>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
              transform: "rotate(270deg)",
            }}
          >
            <Avatar src={weatherData?.current?.condition?.icon || ''} />
            <Typography variant="body1">
              {weatherData && weatherData.current.condition.text}
            </Typography>
          </Stack>
        </Box>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "120px",
            border: "1px solid",
            width: "83%",
            marginTop: "2rem",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              {" "}
              <span>
                {" "}
                <WiHumidity
                  style={{ color: "white", marginRight: "5px" }}
                />{" "}
              </span>
              {humidity}%
            </Typography>
            <Typography variant="subtitle2">{humidityState}</Typography>
          </Stack>
          <Divider orientation="vertical" sx={{ backgroundColor: "white" }} />
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              {" "}
              <span>
                {" "}
                <MdArrowOutward
                  style={{ color: "white", marginRight: "5px" }}
                />{" "}
              </span>
              {wind}mph
            </Typography>
            <Typography variant="subtitle2">{windState}</Typography>
          </Stack>
          <Divider orientation="vertical" sx={{ backgroundColor: "white" }} />
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              {" "}
              <span>
                {" "}
                <TbUvIndex
                  style={{ color: "orange", marginRight: "5px" }}
                />{" "}
              </span>
              {uvIndex}
            </Typography>
            <Typography variant="subtitle2">{uvState}</Typography>
          </Stack>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: "rgb(241, 241, 241)",
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: " center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Tabs
            sx={{ display: "flex", justifyContent: "space-between" }}
            value={value}
            onChange={handleTab}
            TabIndicatorProps={{ style: { backgroundColor: "white" } }}
          >
            <Tab label="Current Weather" {...allyProps(0)} />
            <Tab label="Hourly Forecast" {...allyProps(1)} />
          </Tabs>
        </Box>
        <Box>
          <CustomTab value={value} index={0}>   
          <Box 
            sx={{
              display: "flex",
              gap: "1rem",
              padding: "1rem",
              width: "100%",
              overflowX: "auto",
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar':{display: 'none'},
              scrollBehaviour: "smooth", 
              marginBottom: '0.25rem' 
              }}>
                        
              <Paper
                elevation={3}
                sx={{             
                  backgroundColor: "white",       
                  minWidth: '130px',
                  height: '130px',
                  borderRadius: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="subtitle2"
                >
                  UV Index
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {uvIndex}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    style={{
                      backgroundColor: uvColor,
                      height: "10px",
                      width: "10px",
                      borderRadius: "50%",
                      marginRight: "0.5rem",
                    }}
                  ></span>
                  {uvText}
                </Typography>
              </Paper>

             <Paper
                elevation={3}
                sx={{             
                  backgroundColor: "white",       
                  minWidth: '130px',
                  height: '130px',
                  borderRadius: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="subtitle2"
                >
                  Wind Status
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{fontWeight: "bold" }}
                >
                  {weatherData && weatherData?.current?.wind_mph}{" "}
                  <span
                    style={{
                      fontSize: "10px",
                      fontStyle: "italic",
                      color: "green",
                    }}
                  >
                    mph
                  </span>
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaCompass />
                  <Typography variant="caption">
                    {weatherData && weatherData?.current?.wind_degree}
                  </Typography>
                  <Typography variant="caption" sx={{ marginLeft: "0.5rem" }}>
                    {weatherData && weatherData?.current?.wind_dir}
                  </Typography>
                </Stack>
              </Paper>

                <Paper
                elevation={3}
                sx={{             
                  backgroundColor: "white",       
                  minWidth: '130px',
                  height: '130px',
                  borderRadius: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="subtitle2"
                >
                  Humidity
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold" }}
                >
                  {humidity}%
                </Typography>
                <Stack direction="row-reverse" spacing={1}>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: humidityColor,
                    }}
                  >
                    {humidityText}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: humidityColor,
                    }}
                  >
                    {humidityIcon}
                  </Typography>
                </Stack>
              </Paper>

            <Paper
                 elevation={3}
                 sx={{             
                   backgroundColor: "white",       
                   minWidth: '130px',
                   height: '130px',
                   borderRadius: '13px',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'center',
                   alignItems: 'center',
                 }}
              >
                <Typography 
                  variant="subtitle2"
                >
                  Air Quality
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{fontWeight: "bold" }}
                >
                  {defraIndex}{" "}
                  <span style={{ textTransform: "uppercase", fontSize: "10px" }}>
                    gb defra
                  </span>
                </Typography>
                <Stack direction="row-reverse" spacing={1}>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: airColor,
                    }}
                  >
                    {defraIndexText}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: airColor,
                    }}
                  >
                    {airIcon}
                  </Typography>
                </Stack>
              </Paper>

              <Paper
                elevation={3}
                sx={{             
                  backgroundColor: "white",       
                  minWidth: '130px',
                  height: '130px',
                  borderRadius: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="subtitle2"
                >
                  Visibility
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{fontWeight: "bold" }}
                >
                  {visibility}{" "}
                  <span
                    style={{
                      fontSize: "10px",
                      fontStyle: "italic",
                      color: visColor,
                    }}
                  >
                    km
                  </span>
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: visColor,
                    }}
                  >
                    {visibilityText}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: visColor,
                    }}
                  >
                    {visibilityIcon}
                  </Typography>
                </Stack>
              </Paper>

               <Paper
                 elevation={3}
                sx={{             
                  backgroundColor: "white",       
                  minWidth: '130px',
                  height: '130px',
                  borderRadius: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="subtitle2"
                >
                  Pressure
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold" }}
                >
                  {pressure}{" "}
                  <span
                    style={{
                      textTransform: "uppercase",
                      fontSize: "10px",
                      color: pressureColor,
                    }}
                  >
                    inHg
                  </span>
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: pressureColor,
                    }}
                  >
                    {pressureText}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: pressureColor,
                    }}
                  >
                    {pressureIcon}
                  </Typography>
                </Stack>
              </Paper>

            <Paper
                 elevation={3}
                 sx={{             
                   backgroundColor: "white",       
                   minWidth: '130px',
                   height: '130px',
                   borderRadius: '13px',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'center',
                   alignItems: 'center',
                 }}
              >
                <Typography
                  variant="subtitle2"
                >
                  Sunrise
                </Typography>
                <Stack
                  direction="row"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <IoArrowUpCircleSharp
                    style={{
                      marginRight: "0.5rem",
                      width: "10px",
                      height: "10px",
                      color: "orange",
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{fontWeight: "bold" }}
                  >
                    {weatherData &&
                      weatherData?.forecast?.forecastday?.[0].astro.sunrise}
                  </Typography>
                </Stack>
              </Paper>

              <Paper
                elevation={3}
                sx={{             
                  backgroundColor: "white",       
                  minWidth: '130px',
                  height: '130px',
                  borderRadius: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="subtitle2"
                >
                  Sunset
                </Typography>
                <Stack
                  direction="row"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <IoArrowDownCircleSharp
                    style={{
                      marginRight: "0.5rem",
                      width: "10px",
                      height: "10px",
                      color: "orange",
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{fontWeight: "bold" }}
                  >
                    {weatherData &&
                      weatherData?.forecast?.forecastday?.[0].astro.sunset}
                  </Typography>
                </Stack>
              </Paper>

              <Paper
                elevation={3}
                sx={{             
                  backgroundColor: "white",       
                  minWidth: '130px',
                  height: '130px',
                  borderRadius: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="subtitle2"
                >
                  Moonrise
                </Typography>
                <Stack
                  direction="row"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={moonriseimg}
                    style={{
                      marginRight: "0.5rem",
                      width: "10px",
                      height: "10px",
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{fontWeight: "bold" }}
                  >
                    {weatherData&&
                      weatherData?.forecast?.forecastday?.[0].astro.moonrise}
                  </Typography>
                </Stack>
              </Paper>

              <Paper
                elevation={3}
                sx={{             
                  backgroundColor: "white",       
                  minWidth: '130px',
                  height: '130px',
                  borderRadius: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="subtitle2"
                >
                  Moonset
                </Typography>
                <Stack
                  direction="row"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={moonsetimg}
                    style={{
                      marginRight: "0.5rem",
                      width: "10px",
                      height: "10px",
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{fontWeight: "bold" }}
                  >
                    {weatherData&&
                      weatherData?.forecast?.forecastday?.[0].astro.moonset}
                  </Typography>
                </Stack>
              </Paper>

             <Paper
                elevation={3}
                sx={{             
                  backgroundColor: "white",       
                  minWidth: '130px',
                  height: '130px',
                  borderRadius: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                  <Typography align="center"
                    variant="subtitle2"
                  >
                    Daily Chance Of Rain -
                  </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{fontWeight: "bold" }}
                >
                  {weatherData &&
                    weatherData?.forecast?.forecastday[0]?.day
                      .daily_chance_of_rain}
                  %
                </Typography>
                </Paper>
                
                <Paper
                elevation={3}
                sx={{             
                  backgroundColor: "white",       
                  minWidth: '130px',
                  height: '130px',
                  borderRadius: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                  <Typography
                    variant="subtitle2"
                    align="center"
                  >
                    Daily Chance Of Snow - 
                  </Typography>
                  
                <Typography
                  variant="subtitle2"
                  sx={{fontWeight: "bold" }}
                >                
                  {weatherData &&
                    weatherData?.forecast?.forecastday[0]?.day
                      .daily_chance_of_snow}
                  %
                </Typography>
              </Paper> 
            </Box>
          </CustomTab>

          <CustomTab value={value} index={1}>            
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                padding: "1rem",
                width: "100%",
                overflowX: "auto",
                scrollbarWidth: "none",
                ":-webkit-scrollbar": { display: "none" },
                scrollBehaviour: "smooth",
              }}
            >
              {weatherData &&
                weatherData.forecast.forecastday[0].hour.map(
                  (item: { time: string; condition: { icon: string }; temp_c: number }, index: number) => (
                    <Paper
                      key={index}
                      sx={{
                        backgroundColor: "white",
                        padding: "9px",
                        gap: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: "30px",
                      }}
                    >
                      <Typography align="center" variant="subtitle2">
                        {new Date(item.time).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </Typography>
                      <Avatar src={item.condition.icon} />
                      <Typography variant="subtitle2" align="center">
                        {item.temp_c.toFixed(2)}°C
                      </Typography>
                    </Paper>
                  )
                )}
            </Box>
          </CustomTab>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Link href = "/search">
            <IconButton sx={{}}>
              <IoMdAddCircle style={{ height: "50px", width: "50px"}} />
            </IconButton>
            </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SmallDevice;
