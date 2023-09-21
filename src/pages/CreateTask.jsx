import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import axios from 'axios'

const CreateTask = ({ loggedIn }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [assignedUser, setAssignedUser] = useState('')
    const [errors, setErrors] = useState({})
    const [users, setUsers] = useState([])

    console.log(name, description, assignedUser)

    useEffect(() => {
        if (loggedIn) {
            axios.get('/api/get-all-users')
                .then(response => {
                    setUsers(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const userOptions = users.map(user => ({
        label: user.name,
        value: user.id.toString()
    }))

    // console.log(userOptions)

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({})
        axios.post('/api/store-task', { name, description, assignedUser }).then(response => {
            console.log(response)
            console.log(response.data.success)
            if (response.status === 200 && response.data.success === true) {
                setName('')
                setDescription('')
                setAssignedUser('')
                console.log(response.data.msg)
            } else {
                console.log(response.data.msg)
            }
        }).catch(err => {
            if (err.response.status === 422) {
                setErrors(err.response.data.errors)
            }
            console.log(err)
        })
    }

    if (!loggedIn) {
        return <Navigate to='/login' />
    }

    return (
        <div className="w-full md:w-1/2 mx-auto p-6 space-y-4 border rounded-md">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Create Task
            </h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Task name
                    </label>
                    <input
                        type="name"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="New Task"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors?.name && <p className="text-xs text-red-600 mt-1 ml-2">{errors?.name[0]}</p>}
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Task description
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors?.description && <p className="text-xs text-red-600 mt-1 ml-2">{errors?.description[0]}</p>}
                </div>
                <div>
                    <label
                        htmlFor="user_assign"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Assign users
                    </label>
                    <MultiSelect
                        name="user_assign"
                        defaultValue={assignedUser}
                        placeholder="Assign users"
                        style={{ width: '100%' }}
                        options={userOptions}
                        onChange={value => setAssignedUser(value)}
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Create
                </button>
            </form>
        </div>
    )
}

export default CreateTask