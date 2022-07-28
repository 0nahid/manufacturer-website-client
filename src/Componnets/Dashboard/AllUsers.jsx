import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Loader from "../Shared/Loader"
import Loading from "../Shared/Loading"
import Users from "./Users"


export default function AllUsers() {
    const { data: users, isLoading, refetch } = useQuery(['available'], () => axios.get(`http://localhost:5500/api/users`,
        {
            headers: {
                authorization: `Bearer ${localStorage.getItem('aceessToken')}`
            }
        }
    ))
    // console.log(users?.data);


    if (isLoading) return <Loading />
    return (
        <>
            {
                !isLoading ? (
                    <>
                      <h1 className="text-center text-xl font-medium mb-5">All user</h1>
                        <div className="container flex justify-center items-center">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Email</th>
                                        <th>Admin</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.data?.map((user, index) => (
                                        <Users user={user} key={user?._id} index={index} refetch={refetch} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <Loader />
                )
            }
        </>
    )
}