"use Client";
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import defaultStates from "../utils/defaultStates";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();


export const GlobalContextProvider = ( {children} ) => {
    const [forecast, setForecast] = useState({})

    const [airQuality, setAirQuality] = useState({})

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

    useEffect(() => {
      fetchForecast()
      fetchAirQuality()
    }, [])
    return (
        <GlobalContext.Provider
          value={{
            forecast,
            airQuality
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