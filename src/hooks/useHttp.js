import {useState, useCallback} from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)


    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {

            console.log()
            if (body) {
                body = JSON.stringify(body);
                if(Object.keys(headers).length === 0)
                headers["Content-Type"] = "application/json";
                headers["Accept"] = "application/json"
            }

            const response = await fetch(url, {
                method,
                body,
                headers
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || "Something wrong")
            }
            setLoading(false)


            return data

        } catch (e) {
            setLoading(false)
            throw e
        }
    }, [])

    return {loading, request  }


}
