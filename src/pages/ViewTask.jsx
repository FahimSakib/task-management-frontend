import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useParams } from 'react-router-dom'
import Spiner from '../components/Spiner'

const ViewTask = ({ loggedIn }) => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [task, setTask] = useState([])
    const [currentUserId, setCurrentUserId] = useState('')
    const [errors, setErrors] = useState({})
    const [comment, setComment] = useState('')
    const [submitLoading, setSubmitLoading] = useState(false)

    useEffect(() => {
        if (loggedIn) {
            setLoading(true)
            axios.get(`/api/view-task/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        setTask(response.data.task)
                        setCurrentUserId(response.data.currentUserId)
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

    const showComments = task?.comments?.map(comment => (
        <div className="m-3" key={comment.id}>
            <p className="font-bold">{comment.user.name}</p>
            <p className="ml-3">{comment.comment}</p>
        </div>
    ))

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({})
        setSubmitLoading(true)
        axios.post('/api/add-comment', { comment, user_id: currentUserId, task_id: task.id }).then(response => {
            if (response.status === 200 && response.data.success === true) {
                setComment('')
                setTask(response.data.data)
                toast.success(response.data.msg)
            }
            setSubmitLoading(false)
        }).catch(err => {
            if (err.response.status === 422) {
                setErrors(err.response.data.errors)
            }
            console.log(err)
            setSubmitLoading(false)
        })
    }

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
                <div>
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
                    <hr />
                    <h4 className="mt-3 font-bold">Comments({task?.comments?.length})</h4>
                    {showComments}
                    {(task?.users?.some(user => user.id === currentUserId) || task.created_by === currentUserId) ?
                        <form className="space-y-4 md:space-y-6 mt-3" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="comment"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Add comment
                                </label>
                                <textarea
                                    id="comment"
                                    rows={4}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                {errors?.comment && <p className="text-xs text-red-600 mt-1 ml-2">{errors?.comment[0]}</p>}
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center"
                            >
                                {submitLoading && <Spiner height="4" width="4" />}Comment
                            </button>
                        </form>
                        :
                        <p className="mt-3">
                            Only the creator of the task or the assigned users can add comment!
                        </p>
                    }
                </div>
            }
        </div>
    )
}

export default ViewTask