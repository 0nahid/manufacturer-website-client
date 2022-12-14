import { useEffect, useState } from "react";

const useShopdata = () => {
    const [shopdata, setShopdata] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "https://car-parts-bangladesh.herokuapp.com/api/services", {
                method: "GET",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('aceessToken')}`
                }
            }
            );
            const data = await response.json();
            setShopdata(data);
        };
        fetchData();
    }, []);

    return shopdata;
}
export default useShopdata;