"use client";
import React from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import moment from "moment";
import { kelvinToCelsius } from "@/app/utils/misc";

function DailyForecast() {
  const { forecast, fiveDayForecast } = useGlobalContext();
  const { weather } = forecast;
  const { city, list } = fiveDayForecast;

  if (!fiveDayForecast || !city || !list || !forecast || !weather) {
    return <Skeleton className="h-[12rem] w-full rounded-xl" />;
  }

  const todayString = moment().format("YYYY-MM-DD");

  const todaysForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) =>
      forecast.dt_txt.startsWith(todayString)
  );

  const { main: weatherMain } = weather[0];

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
      className="pt-6 px-4 h-[12rem] border border-border/30 rounded-xl bg-background/60 backdrop-blur-lg shadow-md dark:shadow-none flex flex-col gap-6 overflow-hidden transition-all duration-300 ease-in-out
        col-span-full sm:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <div className="h-full w-full overflow-x-auto">
        {todaysForecast.length < 1 ? (
          <div className="flex justify-center items-center w-full h-full">
            <h1 className="text-2xl sm:text-3xl text-rose-500 line-through animate-pulse font-semibold">
              No Data Available!
            </h1>
          </div>
        ) : (
          <Carousel>
            <CarouselContent className="flex gap-6 min-w-full w-fit px-1">
              {todaysForecast.map(
                (forecast: { dt_txt: string; main: { temp: number } }) => (
                  <CarouselItem
                    key={forecast.dt_txt}
                    className="flex flex-col items-center justify-center gap-2 basis-[8.5rem] cursor-grab rounded-lg border border-border/20 bg-muted/10 backdrop-blur-md p-3 hover:scale-[1.03] transition-transform duration-200"
                  >
                    <p className="text-sm text-muted-foreground">
                      {moment(forecast.dt_txt).format("HH:mm")}
                    </p>
                    <div className="text-2xl">{getIcon()}</div>
                    <p className="text-lg font-semibold text-foreground">
                      {kelvinToCelsius(forecast.main.temp)}°C
                    </p>
                  </CarouselItem>
                )
              )}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  );
}

export default DailyForecast;
