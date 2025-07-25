"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { GlobalContextProvider } from "../context/globalContext"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <GlobalContextProvider>
        {children}
      </GlobalContextProvider>
    </NextThemesProvider>
  )
}