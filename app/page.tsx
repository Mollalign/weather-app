"use client";
import AirPollution from "./Components/AirPollution/AirPollution";
import DailyForecast from "./Components/DailyForecast/DailyForecast";
import FeelsLike from "./Components/FeelsLike/FeelsLike";
import Humidity from "./Components/Humidity/Humidity";
import Navbar from "./Components/Navbar";
import Population from "./Components/Population/Population";
import Pressure from "./Components/Pressure/Pressure";
import Sunset from "./Components/Sunset/Sunset";
import Temperature from "./Components/Temperature/Temperature";
import UvIndex from "./Components/UvIndex/UvIndex";
import Visibility from "./Components/Visibility/Visibility";
import Wind from "./Components/Wind/Wind";
import defaultStates from "./utils/defaultStates";
import FiveDayForecast from "./Components/FiveDayForecast/FiveDayForecast";
import { useGlobalContextUpdate } from "./context/globalContext";
import Footer from './Components/Footer/Footer'

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
        <Navbar />
        <div className="pb-4 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
            <Temperature />
            <FiveDayForecast />
          </div>
          <div className="flex flex-col w-full">
            <div className="instruments grid h-full gap-4 col-span-full sm:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
              <AirPollution />
              <Sunset />
              <Wind />
              <DailyForecast />
              <UvIndex />
              <Population />
              <FeelsLike />
              <Humidity />
              <Visibility />
              <Pressure />
            </div>
            <div className="mapbox-con mt-4 flex gap-4">
              <div className="states flex flex-col gap-3 flex-1">
                <h2 className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-100">
                  Top Large Cities
                </h2>
                <div className="flex flex-col gap-4">
                  {defaultStates.map((state, index) => {
                    return (
                      <div
                        key={index}
                        className="border rounded-xl cursor-pointer bg-white dark:bg-[#0A0A0A] 
                        hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 
                        dark:hover:from-[#111827] dark:hover:to-[#1f2937] 
                        transition-all duration-300 ease-in-out shadow-md 
                        dark:shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                        onClick={() => {
                          getClickedCityCords(state.lat, state.lon);
                        }}
                      >
                        <p className="px-6 py-4 text-gray-800 dark:text-gray-200 font-medium">
                          {state.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
        <Footer />
      </main>
      
    </div>
  );
}