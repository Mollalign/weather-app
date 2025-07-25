"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { wind } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React from "react";

function Wind() {
  const { forecast } = useGlobalContext();

  const windSpeed = forecast?.wind?.speed;
  const windDir = forecast?.wind?.deg;

  if (!windSpeed || !windDir) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div
      className="pt-6 pb-5 px-4 h-[12rem] border rounded-2xl flex 
      flex-col gap-3 dark:bg-[#0A0A0A] bg-white/50 backdrop-blur-sm
      shadow-md dark:shadow-[0_0_10px_1px_rgba(0,150,255,0.3)] 
      transition-all duration-300"
    >
      <h2 className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-100">
        {wind} Wind
      </h2>

      <div className="compass relative flex items-center justify-center">
        <div className="image relative">
          <Image
            src="/compass_body.svg"
            alt="compass"
            width={110}
            height={110}
          />
          <Image
            src="/compass_arrow.svg"
            alt="compass"
            className="absolute top-0 left-[50%] transition-all duration-500 ease-in-out dark:invert"
            style={{
              transform: `rotate(${windDir}deg) translateX(-50%)`,
              height: "100%",
            }}
            width={11}
            height={11}
          />
        </div>
        <p
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] 
          text-sm dark:text-white text-black font-semibold"
        >
          {Math.round(windSpeed)} m/s
        </p>
      </div>
    </div>
  );
}

export default Wind;
