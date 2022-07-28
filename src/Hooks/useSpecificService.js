import { useState } from "react"

const useSpecificService = id => {
    const [specificService, setSpecificService] = useState({})
    const url = `http://localhost:5000/api/services/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => setSpecificService(data))
    return specificService
}
export default useSpecificService