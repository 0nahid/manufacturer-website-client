import axios from "axios";
import { useEffect, useState } from "react";

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email;
        // console.log(email);
        const currentUser = { email: email };
        if (email) {
            axios.put(`https://car-parts-bangladesh.herokuapp.com/api/user/${email}`, currentUser)
                .then(res => {
                    // console.log(res?.data)
                    const aceessToken = res?.data?.token;
                    localStorage.setItem('aceessToken', aceessToken);
                    setToken(aceessToken);
                })

        }


    }, [user]);
    return [token];
}

export default useToken;