"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";

function Temperature() {
  const { forecast } = useGlobalContext();

  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    if (!forecast) return;

    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(forecast.timezone / 60);
      setLocalTime(localMoment.format("HH:mm:ss"));
      setCurrentDay(localMoment.format("dddd"));
    }, 1000);

    return () => clearInterval(interval);
  }, [forecast]);

  if (!forecast || !forecast?.weather) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { main, name, weather } = forecast;

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);
  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  return (
    <div
      className={`
        pt-6 pb-5 px-4 rounded-2xl flex flex-col justify-between
        border bg-white dark:bg-[#0A0A0A]
        shadow-lg dark:shadow-[0_0_20px_#4f46e5]
        border-gray-300 dark:border-[#3f3f58]
        transition-all duration-300
      `}
    >
      <p className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>

      <p className="pt-2 font-semibold flex gap-1 text-lg text-gray-700 dark:text-gray-200">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>

      <p className="py-10 text-8xl font-bold self-center text-gray-900 dark:text-white">
        {temp}°
      </p>

      <div>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getIcon()}</span>
          <p className="capitalize text-lg font-medium text-gray-700 dark:text-gray-200">
            {description}
          </p>
        </div>

        <p className="flex items-center gap-3 pt-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
