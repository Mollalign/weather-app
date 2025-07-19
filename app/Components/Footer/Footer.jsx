import React from 'react'

const Footer = () => {
  return (
    <footer
        className="py-6 mt-5 px-4 flex justify-center
            bg-gradient-to-r from-blue-100 to-purple-100
            dark:from-[#0a0a0a] dark:to-[#0a0a0a]
            text-gray-700 dark:text-gray-300
            rounded-t-xl shadow-md"
    >
        <p className="text-center text-sm font-medium">
            &copy; {new Date().getFullYear()} WeatherWise Inc. All rights reserved.
        </p>
    </footer>

  )
}

export default Footer