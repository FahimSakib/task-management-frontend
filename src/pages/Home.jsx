import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import EyeIcon from "../components/icons/EyeIcon"
import PencilSquareIcon from "../components/icons/PencilSquareIcon"
import TrashIcon from "../components/icons/TrashIcon"

export default function Home({ loggedIn }) {
    const [tasks, setTasks] = useState([])
    const [loggedUserId, setLoggedUserId] = useState('')
    const [loading, setLoading] = useState(false)
    console.log(tasks, loggedUserId)

    useEffect(() => {
        if (loggedIn) {
            setLoading(true)
            axios.get('/api/tasks')
                .then(response => {
                    if (response.status === 200) {
                        setTasks(response.data.tasks)
                        setLoggedUserId(response.data.loggedUserId)
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

    const rows = tasks.map(task => (
        <tr className="bg-white border-b" key={task.id}>
            <td className="px-6 py-4">{task.name}</td>
            <td className="px-6 py-4">{task.description}</td>
            <td className="px-6 py-4">{task.users.map((user) => user.name).join(', ')}</td>
            <td className="px-6 py-4 flex gap-2">
                <Link to={`/view-task/${task.id}`}>

                    <EyeIcon />
                </Link>
                {task.users.some(user => user.id === loggedUserId) ? <div className="flex gap-2"><PencilSquareIcon /> <TrashIcon /></div> : (task.created_by === loggedUserId && <div className="flex gap-2"><PencilSquareIcon /> <TrashIcon /></div>)}
            </td>
        </tr>
    ))

    if (!loggedIn) {
        return <Navigate to='/login' />
    }

    return (
        <div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Task name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Assigned users
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ?
                            <tr className="bg-white border-b">
                                <td className="px-6 py-4 text-center" colSpan={4}>
                                    Loading..
                                </td>
                            </tr> :
                            rows.length ? rows : <tr className="bg-white border-b">
                                <td className="px-6 py-4 text-center" colSpan={4}>
                                    No data found!
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}