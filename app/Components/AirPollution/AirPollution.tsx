"use client"

import { useGlobalContext } from '@/app/context/globalContext'
import { thermo } from '@/app/utils/Icons';
import { airQualityIndexText } from '@/app/utils/misc';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const AirPollution = () => {
  const { airQuality } = useGlobalContext();

  if (!airQuality || !airQuality.list || !airQuality.list[0]) {
    return <Skeleton className="h-[1rem] w-full col-span-2 md:col-span-full" />;
  }

  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const filteredIndex = airQualityIndexText.find((item) => {
    return item.rating === airQualityIndex;
  });

  return (
    <div
      className="air-pollution pt-6 px-4 h-[12rem] border rounded-xl flex flex-col gap-6 col-span-full sm:col-span-2 md:col-span-2 xl:col-span-2
        bg-gradient-to-br from-white via-slate-100 to-slate-200
        dark:from-[#0a0a0a] dark:via-[#0a0a0a] dark:to-[#0a0a0a]
        shadow-lg dark:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-500 ease-in-out"
    >
      <h2 className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
        {thermo}Air Pollution
      </h2>
      <Progress value={airQualityIndex} max={100} className="progress" />
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Air quality is {filteredIndex?.description}.
      </p>
    </div>
  );
};

export default AirPollution;
