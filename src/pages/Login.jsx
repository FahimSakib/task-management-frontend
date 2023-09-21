import axios from 'axios'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Login = ({ setSessionLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [toHome, setToHome] = useState(false);

    const logIn = (e) => {
        e.preventDefault();
        setErrors({})
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/login', { email, password }).then(response => {
                if (response.status === 204) {
                    setSessionLogin()
                    setToHome(true);
                }
            }).catch(err => {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors)
                }
                console.log(err.response)
            })
        });
    }

    if (toHome === true || sessionStorage.getItem('loggedIn') === 'true') {
        return <Navigate to='/' />
    }

    return (
        <div className="flex h-screen">
            <div className="bg-gray-50 m-auto shadow-md p-5 rounded-md w-full md:w-1/3">
                <div className="p-6 space-y-4">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Login
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={logIn}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors?.email && <p className="text-xs text-red-600 mt-1 ml-2">{errors?.email[0]}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors?.password && <p className="text-xs text-red-600 mt-1 ml-2">{errors?.password[0]}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Login
                        </button>
                        <p className="text-sm font-light text-gray-500 ">
                            Don’t have an account yet?{" "}<Link to="/register">
                                <span className="text-violet-700 underline">Register</span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login