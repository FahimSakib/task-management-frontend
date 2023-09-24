import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import EyeIcon from "../components/icons/EyeIcon"
import PencilSquareIcon from "../components/icons/PencilSquareIcon"
import TrashIcon from "../components/icons/TrashIcon"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import toast from "react-hot-toast"
import Spiner from "../components/Spiner"

export default function Home({ loggedIn }) {
    const [tasks, setTasks] = useState([])
    const [loggedUserId, setLoggedUserId] = useState('')
    const [loading, setLoading] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [idForDelete, setIdForDelete] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (loggedIn) {
            fetchTasks()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    const fetchTasks = () => {
        setLoading(true)
        axios.get(`/api/tasks?page=${currentPage}`)
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

    const editAndDelete = (id) => (
        <div className="flex gap-2">
            <Link to={`/edit-task/${id}`}>
                <PencilSquareIcon />
            </Link>
            <button onClick={() => { setShowDeleteModal(true); setIdForDelete(id) }}>
                <TrashIcon />
            </button>
        </div>
    )

    const rows = tasks?.data?.map(task => (
        <tr className="bg-white border-b" key={task.id}>
            <td className="px-6 py-4">{task.name}</td>
            <td className="px-6 py-4">{task.description}</td>
            <td className="px-6 py-4">{task.users.map((user) => user.name).join(', ')}</td>
            <td className="px-6 py-4 flex gap-2">
                <Link to={`/view-task/${task.id}`}><EyeIcon /></Link>
                {(task.users.some(user => user.id === loggedUserId) || task.created_by === loggedUserId) && editAndDelete(task.id)}
            </td>
        </tr>
    ))

    const deleteTask = () => {
        if (!idForDelete) {
            return
        }

        axios.delete(`/api/delete-task/${idForDelete}`).then(response => {
            if (response.status === 200 && response.data.success === true) {
                fetchTasks()
                setShowDeleteModal(false)
                toast.success(response.data.msg)
            } else {
                toast.error(response.data.msg)
            }
        }).catch(err => {
            toast.error('Someting went wrong!')
            console.log(err)
        })
    }

    const closeModal = () => {
        setShowDeleteModal(false)
        setIdForDelete('')
    }

    const handlePagination = (url) => {
        const matches = url.match(/page=(\d+)/)

        if (matches) {
            setCurrentPage(matches[1])
        }
    }

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
                        {rows?.length ? rows : <tr className="bg-white border-b">
                            <td className="px-6 py-4 text-center" colSpan={4}>
                                {loading ? 'Loading...' : 'No data found!'}
                            </td>
                        </tr>}
                    </tbody>
                </table>
                {(loading && rows?.length) && <div className="absolute top-[40px] left-0 w-full backdrop-blur-[1px] h-[90%] flex justify-center items-center">
                    <Spiner />
                </div>}
            </div>
            {tasks?.links &&
                <div className="mt-5 ml-5">
                    {tasks?.links?.map(link => (
                        <button
                            className={`mr-3 px-3 py-2 rounded-lg ${link.active ? 'bg-violet-600 pointer-events-none' : 'bg-violet-200'} ${!link.url ? 'pointer-events-none	opacity-50' : ''}`}
                            key={link.label}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            onClick={() => handlePagination(link.url)}
                        />
                    ))}
                </div>
            }
            {showDeleteModal && <DeleteConfirmModal deleteTask={deleteTask} closeModal={closeModal} />}
        </div>
    )
}