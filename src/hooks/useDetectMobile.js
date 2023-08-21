import { useEffect, useState } from "react"

const detectState = () => {
    return window.innerWidth <= 576 ? "mobile" : "desktop"
} 
const useDetectMobile = () => {
    const [device, setDevice] = useState(() => detectState());

    useEffect(() => {   
        const handleResize = () => {
            setDevice(detectState())
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    }, [])
    return device
}

export default useDetectMobile