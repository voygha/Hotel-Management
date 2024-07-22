"use client"

import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"

const Auth = () => {
    const inputStyles = 'border border-gray-300 sm:text-sm text-black rounded:lg block w-full p-2.5 focus:outline-none'
    return (
        <section className="container mx-auto">
            <div className="p-6 space-y-4 md:space-y-6 dm:p-8 w-80 md:w-[70%] mx-auto">
                <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                        Create an Account
                    </h1>
                    <p>OR</p>
                    <span className="inline-flex items-center">
                        <AiFillGithub className="mr-3 text-4xl cursor-pointer text-black dark:text-white" />
                        <FcGoogle className="ml-3 text-4xl cursor-pointer" />
                    </span>
                </div>
                <form className="space-y-4 md:space-y-6">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="name@company.com"
                        required
                        className={inputStyles}
                    />
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Jonh Doe"
                        required
                        className={inputStyles}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        required
                        minLength={6}
                        className={inputStyles}
                    />
                    <button type="submit" className="w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Sign Up
                    </button>
                </form>

                <button className="text-blue-700 underline">Login</button>
            </div>
        </section>
    )
}

export default Auth