import React from 'react'

const DeleteConfirmModal = ({ deleteTask, closeModal }) => {
    return (
        <>
            <div className='backdrop-blur-[1px] h-full w-full fixed top-0 left-0'></div>
            <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] drop-shadow-lg w-full md:w-1/5 bg-white p-5 rounded-md'>
                <p className="text-center font-bold">Delete this task!</p>
                <div className="flex justify-center gap-5 mt-5">
                    <button className="px-3 py-1 bg-blue-600 rounded-md text-white" onClick={closeModal}>Cancel</button>
                    <button className="px-3 py-1 bg-red-600 rounded-md text-white" onClick={deleteTask}>Confirm</button>
                </div>
            </div>
        </>
    )
}

export default DeleteConfirmModal