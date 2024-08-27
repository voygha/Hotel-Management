# Inicializar el proyecto

```bash
npx create-next-app --template typescript
```
```bash
cd hotel-management
```
## Levantar el entorno de desarrollo
```bash
npm run dev
```

# Primeras configuraciones


## `src/layout.tsx` configuracion inicial

Vamos a src/layout.tsx

Lo primero que haremos sera cambiar el titulo de nuestra aplicacion y la descripcion

```typescript
export const metadata: Metadata = {
  title: "Hotel Management App",
  description: "Discover the best hotel rooms",
};
```
Cambiaremos las fuentes 

```typescript
//Layout.tsx

// Importar fuentes 
import { Italiana, Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '500', '700', '900'], style: ['italic', 'normal'], variable: "--font-poppins" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {/* La clase indica que la fuente sera normal */}
        <main className="font-normal">
          {/* Header */}
          {children}
          {/* Footer */}
        </main>
      </body>
    </html>
  );
}

```

## Carpeta `src/components`

Creamos la carpeta `components` dentro de `src`

Dentro crearemos 2 carpetas mas: Footer y Header con sus respectivos archivos, nuestro proyecto debe verse asi:


```txt
hotel-management/
│
├── src/
│   ├── app/
│   │   └─ layout.tsx
│   │   └─ page.tsx
│   ├── components/
│   │   └── Header
│   │──────── Footer.tsx
│   │   └── Footer
│   │──────── Header.tsx
```

### Componente `Header.tsx`

Vamos al componente `src/components/Header/Header.tsx`

Vamos a crear un componente sencillo de momento:

```typescript
const Header = () => {
    return(
        <div>Header</div>
    )
}

export default Header
```

Haremos lo mismo con el componente `src/components/Footer/Footer.tsx`
```typescript
const Footer = () => {
    return(
        <div>Header</div>
    )
}

export default Footer
```

## Importacion de componentes principales al Layout 

Ahora volvemos al `/src/app/layout.tsx` y vamos a importar nuestros componentes creados

Le funcion por default ahora importara el Header y el Footer 

```typescript
// src/app/Layout.tsx

//importaciones
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="font-normal">
          {/* Header */}
          <Header />
          {children}
          {/* Footer */}
          <Footer />
        </main>
      </body>
    </html>
  );
}
```


## Modificar el `tailwind.config.ts`

Vamos a la raiz del proyecto y vamos a la configuracion de tailwind

```typescript
import type { Config } from "tailwindcss";
// importamos fuentes
const {fontFamily} = require('tailwindcss/defaultTheme')

const config: Config = {
  //Esto hay que descomentarlo despues de tener listo el modo oscuro
  //darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Esto es lo que tenemos que modificar
      //Definimos la paleta de colores que vamos a utilizar  
      colors:{
        primary: '#038C7F',
        secondary: '#f2c641',
        tertiary: {
          dark:'#F27405',
          light:'#F2C641',
        },
      },
      //Definimos nuestras fuentes
      fontFamily:{
        //Viene de Layout
        poppins:['var(--font-poppins)', ...fontFamily.sans],
      }
    },
  },
  plugins: [],
};
export default config;

```

## Pagina de Home

Vamos a `/src/app/page.tsx`

Crearemos una funcion sencilla que se exporte por default para ser renderizada como Home

```typescript
const  Home = () => {
  return (
    <>
    Home
    </>
  );
}

export default Home
```

Vamos a `/src/app/globals.css` y borraremos los estilos por defecto que trae el proyecto de Next



## Carpeta Context

Dentro de src crearemos la carpeta context, aqui crearemos el archivo `themeContext.ts` este archivo nos servira para configurar la logica del modo oscuro de nuestra aplicacion

La estructura del proyecto se veria asi:

```txt
hotel-management/
│
├── src/
│   ├── app/
│   │   └─ layout.tsx
│   │   └─ page.tsx
│
│   ├── components/
│   │   └── Header
│   │──────── Footer.tsx
│   │   └── Footer
│   │──────── Header.tsx
│
│   ├── context/
│   │   └─ themeContext.ts
```

```typescript
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

```

## ThemeProvider
Vamos a nuestra carpeta de componentes y vamos a crear la carpeta y el archivo ThemeProvider con la siguiente estructura de archivos

```txt
hotel-management/
│
├── src/
│   ├── app/
│   │   └─ layout.tsx
│   │   └─ page.tsx
│
│   ├── components/
│   │   └── Header
│   │──────── Footer.tsx
│   │   └── Footer
│   │──────── Header.tsx
│   │   └── ThemeProvider
│   │──────── ThemeProvider.tsx
│
│   ├── context/
│   │   └─ themeContext.ts
```

Este componente es el que aplicara el cambio de tema utilizando la logica del themeContext

```typescript
"use client";

import { use, useEffect, useState } from "react";

import ThemeContext from "@/context/themeContext";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    {/* Guarda en el local Storage el tema seleccionado por defecto es el tema claro */}
    const themeFromStorage: boolean =
        typeof localStorage !== 'undefined' && localStorage.getItem('hotel-theme')
            ? JSON.parse(localStorage.getItem('hotel-theme')!)
            : false
    const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage)

    const [renderComponent, setRenderComponent] = useState(false)

    useEffect(() => { 
        setRenderComponent(true)
    }, [])
    if(!renderComponent) return <></>
    
    return (
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
            <div className={`${darkTheme ? "dark" : ""} min-h-screen`}>
                <div className="dark:text-white dark:bg-black text-[#1E1E1E]">
                    {children}
                </div>
            </div>
        </ThemeContext.Provider >
    )
}

export default ThemeProvider
```

## Layout Completo
Lo unico que hay que agregar aqui es el ThemeProvider para que sea reconocido en cualquier ruta y poder jugar con el icono cada que se seleccione el tema elegido

```typescript
import type { Metadata } from "next";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Italiana, Poppins } from "next/font/google";
import "./globals.css";

// Importamos el ThemeProvider
import ThemeProvider from "./components/ThemeProvider/ThemeProvider";


const poppins = Poppins({ subsets: ["latin"], weight: ['400', '500', '700', '900'], style: ['italic', 'normal'], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "Hotel Management App",
  description: "Discover the best hotel rooms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {/* Encapsulamos los hijos en el ThemeProvider para que todos los componentes sean afectados por el ThemeProvider */}
        <ThemeProvider>
        <main className="font-normal">
          {/* Header */}
          <Header />
          {children}
          {/* Footer */}
          <Footer />
        </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Ahora solo necesitamos que en el componente Header al dar click al boton podamos cambiar el tema, esto lo lograremos con un useContext

```typescript
// /src/components/Header/Header.tsx

import { useContext } from "react"
const {darkTheme, setDarkTheme} = useContext(ThemeContext)
```


## Header Completo con explicacion

```typescript
"use client"
{/* Importamos la logica del themeContext */}
import ThemeContext from "@/context/themeContext"
import Link from "next/link"
import { useContext } from "react"
{/* Icono del usuario */}
import { FaUserCircle } from "react-icons/fa"
{/* Icono  del modo oscuro y claro*/}
import { MdDarkMode, MdLightMode } from "react-icons/md"

{/* Componente Header */}
const Header = () => {
    {/* Guardamos en un useContext el tema que el usuario prefriera */}
    const {darkTheme, setDarkTheme} = useContext(ThemeContext)

    return (
        <header className="py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between">
            <div className="flex flex-items-center w-full md:-2/3">
                <Link href="/" className="font-black text-tertiary-dark">
                    Hotel Zz
                </Link>
                <ul className="flex items-center ml-5">
                    <li className="flex items-center">
                        <Link href='/auth'>
                            <FaUserCircle className="cursor-pointer" />
                        </Link>
                    </li>
                    <li className="ml-2">
                    {/* Renderizado condicional */}
                        {darkTheme ? (
                          {/* Modo claro */}
                            <MdLightMode className="cursor-pointer" onClick={ () => {
                                {/* Setea el tema por default */}
                                setDarkTheme(false)
                                localStorage.removeItem("hotel-theme")
                            }}/>
                        ): (
                          {/* Modo oscuro */}
                            <MdDarkMode className="cursor-pointer" onClick={ () => {
                                setDarkTheme(true)
                                localStorage.setItem("hotel-theme", "true")
                            }}/>
                        )}
                    </li>
                </ul>
            </div>
            <ul className="flex items-center justify-between w-full md:w-1/3 mt-4">
                <li className="hover:-translate-y-2 duration-500 transition-all">
                    <Link href='/'>Home</Link>
                </li>
                <li className="hover:-translate-y-2 duration-500 transition-all">
                    <Link href='/rooms'>Rooms</Link>
                </li>
                <li className="hover:-translate-y-2 duration-500 transition-all">
                    <Link href='/'>Contact</Link>
                </li>
            </ul>
        </header>
    )
}

export default Header

```

## Footer completo

```typescript
import Link from "next/link"
import { BiMessageDetail } from "react-icons/bi"
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs"

const Footer = () => {
    return (
        <footer className='mt-16'>
            <div className='container mx-auto px-4'>
                <Link href='/' className='font-black text-tertiary-dark'>
                    Hotelzz
                </Link>

                <h4 className='font-semibold text-[40px] py-6'>Contact</h4>

                <div className='flex flex-wrap gap-16 items-center justify-between'>
                    <div className='flex-1'>
                        <p>123 Road</p>
                        <div className='flex items-center py-4'>
                            <BsFillSendFill />
                            <p className='ml-2'>codewithlari</p>
                        </div>
                        <div className='flex items-center'>
                            <BsTelephoneOutbound />
                            <p className='ml-2'>000-000-00</p>
                        </div>
                        <div className='flex items-center pt-4'>
                            <BiMessageDetail />
                            <p className='ml-2'>codewithlari</p>
                        </div>
                    </div>

                    <div className='flex-1 md:text-right'>
                        <p className='pb-4'>Our Story</p>
                        <p className='pb-4'>Get in Touch</p>
                        <p className='pb-4'>Our Privacy Commitment</p>
                        <p className='pb-4'>Terms of service</p>
                        <p>Customer Assistance</p>
                    </div>

                    <div className='flex-1 md:text-right'>
                        <p className='pb-4'>Dining Experience</p>
                        <p className='pb-4'>Wellness</p>
                        <p className='pb-4'>Fitness</p>
                        <p className='pb-4'>Sports</p>
                        <p>Events</p>
                    </div>
                </div>
            </div>

            <div className='bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0' />
        </footer>
    )
}

export default Footer
```