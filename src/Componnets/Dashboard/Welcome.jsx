import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet';
import auth from '../../firebase.init';
import useAdmin from '../../Hooks/useAdmin';

export default function Welcome() {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    // console.log(user?.photoURL);
    const dummpyPhoto = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <Helmet>
                <title>Dashboard - Car Parts</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="stack">
                <div className="text-center border border-base-content card  bg-gray-50">
                    <div className="card-body items-center">
                        <h1 className="text-2xl font-bold">Welcome {user.displayName} <span className="badge">{
                            admin ? 'Admin' : 'User'
                        }</span> </h1>
                        {/* <img src={user?.photoURL || dummpyPhoto} alt="user" className="rounded-full w-32 h-32" /> */}
                        {
                            admin ?
                                <div className="avatar online">
                                    <div className="w-24 rounded-full">
                                        <img src={user?.photoURL} alt="admin" />
                                    </div>
                                </div>
                                :
                                <div className="avatar offline">
                                    <div className="w-24 rounded-full">
                                        <img src={dummpyPhoto} alt="user" />
                                    </div>
                                </div>
                        }

                        <p className="text-lg">
                            You are logged in with {user.email}
                        </p>
                    </div>
                </div>
                <div className="text-center border border-base-content card  bg-primary">
                    <div className="card-body"></div>
                </div>
                <div className="text-center border border-base-content card  bg-info">
                    <div className="card-body"></div>
                </div>
            </div>
        </div>
    )
}
