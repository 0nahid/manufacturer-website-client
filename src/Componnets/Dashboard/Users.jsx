import React from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function Users({ user, index, refetch }) {
    const makeAdmin = (email) => {
        // asking confirmation with sweetalert
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, make admin!'
        }).then((result) => {
            if (result.value) {

                fetch(`http://localhost:5500/user/admin/${email}`, {
                    method: 'PUT',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('aceessToken')}`
                    }
                }).then(res => {
                    if (res.status === 403) {
                        toast.error('You are not authorized to make this user an admin');
                    }
                    return res.json()
                })
                    .then(data => {
                        console.log(data);
                        if (data.matchedCount === 1) {
                            toast.success(`${email} successfully an admin`);
                            refetch();
                        }
                    })
            }
        });
    }
    const deleteUser = (email) => {
        // asking confirmation with sweetalert
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {

                fetch(`http://localhost:5500/api/user/${email}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('aceessToken')}`
                    }
                }).then(res => {
                    if (res.status === 403) {
                        toast.error('You are not authorized to delete this user');
                    }
                    return res.json()
                })
                    .then(data => {
                        const errorMsg = data?.message;
                        if (data.deletedCount === 1) {
                            toast.success(`${email} successfully deleted`);
                            refetch();
                        }
                        else {
                            toast.error(`${email} could not be deleted because ${errorMsg}`);
                        }
                    })
            }
        });
    }
    return (
        <tr key={user?._id}>
            <td>{index + 1}</td>
            <td>{user?.email}</td>
            <td>
                {user?.role === 'admin' ?
                    <button className="btn btn-success">Already an admin</button>
                    : <button
                        onClick={() => makeAdmin(user?.email)}
                        className="btn btn-ghost">Make Admin</button>}
            </td>

            <td>
                <button
                    onClick={() => deleteUser(user?.email)}
                    className="btn btn-error">Delete</button>
            </td>

        </tr>
    )
}