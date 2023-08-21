import { useEffect, useState } from "react"

const useLocalStorage = (key, fallBack) => {
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) ?? fallBack)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}
 
export default useLocalStorage