import { Dispatch, SetStateAction, createContext } from "react";

type themeContextType = {
    darkTheme:boolean;
    setDarkTheme: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<themeContextType>({
    darkTheme: false,
    setDarkTheme: () => null,
})

export default ThemeContext