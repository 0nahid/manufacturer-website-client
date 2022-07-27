import { useEffect, useState } from "react";

const useShopdata = () => {
    const [shopdata, setShopdata] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "http://localhost:5500/api/services"
            );
            const data = await response.json();
            setShopdata(data);
        };
        fetchData();
    }, []);
    
    return shopdata;
}
export default useShopdata;