"use Client";
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import defaultStates from "../utils/defaultStates";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();


export const GlobalContextProvider = ( {children} ) => {
    const [forecast, setForecast] = useState({})

    const [airQuality, setAirQuality] = useState({})
    const [fiveDayForecast, setFiveDayForecast] = useState({})
    const [uvIndex, seUvIndex] = useState({});


    const fetchForecast = async (city) => {
       try {
          const res = await axios.get("api/weather")
         
          setForecast(res.data)
       } catch (error) {
         console.log("Error fetching forecast data: ", error.message)
       }
    }

    // air quality
    const fetchAirQuality = async (city) => {
       try {
          const res = await axios.get("api/pollution")
         
          setAirQuality(res.data)
       } catch (error) {
         console.log("Error fetching forecast data: ", error.message)
       }
    }

    // five day forecast
    const fetchFiveDayForecast = async () => { 
      try {
        const res = await axios.get("api/fiveday")
        setFiveDayForecast(res.data)
      } catch (error) {
        console.log("Error fetching five day forecast data: ", error.message)
      }
    }

    //fetch uv data
    const fetchUvIndex = async (lat, lon) => {
      try {
        const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);

        seUvIndex(res.data);
      } catch (error) {
        console.error("Error fetching the forecast:", error);
      }
    };

    useEffect(() => {
      fetchForecast()
      fetchAirQuality()
      fetchFiveDayForecast()
      fetchUvIndex()
    }, [])
    return (
        <GlobalContext.Provider
          value={{
            forecast,
            airQuality,
            fiveDayForecast,
            uvIndex,
          }}
        >
            <GlobalContextUpdate.Provider value={""}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate)