import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

const ViewTask = ({ loggedIn }) => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [task, setTask] = useState([])

    useEffect(() => {
        if (loggedIn) {
            setLoading(true)
            axios.get(`/api/view-task/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        setTask(response.data)
                    }
                    setLoading(false)
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!loggedIn) {
        return <Navigate to='/login' />
    }

    return (
        <div className="w-full md:w-1/2 mx-auto p-6 space-y-4 border rounded-md">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Task Details
            </h2>
            <hr />
            {loading ? <p>Loading...</p> :
                <table>
                    <tbody>
                        <tr className="text-left">
                            <th className="px-6 py-4">Task Name:</th>
                            <td className="px-6 py-4">{task?.name}</td>
                        </tr>
                        <tr className="text-left">
                            <th className="px-6 py-4">Task Description:</th>
                            <td className="px-6 py-4">{task?.description}</td>
                        </tr>
                        <tr className="text-left">
                            <th className="px-6 py-4">Assigned Users:</th>
                            <td className="px-6 py-4">{task?.users?.map((user) => user.name).join(', ')}</td>
                        </tr>
                    </tbody>
                </table>
            }
            <hr />
        </div>
    )
}

export default ViewTask