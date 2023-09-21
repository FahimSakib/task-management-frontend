import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

export default function Home({ loggedIn }) {
    const [user, setUser] = useState([])
    console.log(user)

    useEffect(() => {
        if (loggedIn) {
            axios.get('/api/user')
                .then(response => {
                    setUser(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!loggedIn) {
        return <Navigate to='/login' />
    }

    return (
        <div className="bg-gray-100">
            User Id: {user.id}
            User Name: {user.name}
            User Email: {user.email}
        </div>
    )
}