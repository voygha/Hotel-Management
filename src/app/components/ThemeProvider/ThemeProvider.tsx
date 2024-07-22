"use client";

import { useEffect, useState } from "react";

import ThemeContext from "@/context/themeContext";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const themeFromStorage: boolean =
        typeof localStorage !== 'undefined' && localStorage.getItem('hotel-theme')
            ? JSON.parse(localStorage.getItem('hotel-theme')!)
            : false
    const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage);

    <ThemeContext.Provider value={{darkTheme,setDarkTheme}}>
        <div></div>
    </ThemeContext.Provider >
}