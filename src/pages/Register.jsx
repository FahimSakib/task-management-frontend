import axios from 'axios'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

const Register = ({ setSessionLogin }) => {
    const [errors, setErrors] = useState({})
    const [toHome, setToHome] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((values) => ({ ...values, [name]: value }))
    }

    console.log(sessionStorage.getItem('loggedIn'))
    const register = (e) => {
        e.preventDefault();
        setErrors({})
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/register',
                { name: data.name, email: data.email, password: data.password, password_confirmation: data.password_confirmation })
                .then(response => {
                    if (response.status === 204) {
                        setSessionLogin()
                        setToHome(true)
                    }
                })
                .catch(err => {
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
                        Register
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={register}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Nick"
                                value={data.name}
                                onChange={handleChange}
                            />
                            {errors?.name && <p className="text-xs text-red-600 mt-1 ml-2">{errors?.name[0]}</p>}
                        </div>
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
                                value={data.email}
                                onChange={handleChange}
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
                                value={data.password}
                                onChange={handleChange}
                            />
                            {errors?.password && <p className="text-xs text-red-600 mt-1 ml-2">{errors?.password[0]}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Confirm password
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                id="password_confirmation"
                                placeholder="Confirm password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                value={data.password_confirmation}
                                onChange={handleChange}
                            />
                            {errors?.password_confirmation && <p className="text-xs text-red-600 mt-1 ml-2">{errors?.password_confirmation[0]}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register