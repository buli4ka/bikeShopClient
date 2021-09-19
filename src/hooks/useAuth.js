import {useCallback, useState, useEffect} from "react"


const storageName = require("../config").client.storageName

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userRole, setRole] = useState(null)
    const [ready, setReady] = useState(false)


    const login = useCallback((jwtToken, id, role) => {
        setToken(jwtToken)
        setUserId(id)
        setRole(role)


        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken,
            userRole: role
        }))
    }, [])

    const logout = useCallback((jwtToken, id) => {
        setToken(null)
        setUserId(null)
        setRole(null)

        localStorage.removeItem(storageName)

    }, [])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))


        if (data && data.token) {
            login(data.token, data.userId, data.userRole)
        }
        setReady(true)
    }, [login])


    return {login, logout, token, userId, userRole, ready}
}
