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
        <div class="flex justify-center items-center min-h-screen ">
             <Helmet>
                <title>Dashboard - Car Parts</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div class="stack">
                <div class="text-center border border-base-content card  bg-gray-50">
                    <div class="card-body items-center">
                        <h1 class="text-2xl font-bold">Welcome {user.displayName} <span className="badge">{
                            admin ? 'Admin' : 'User'
                        }</span> </h1>
                        {/* <img src={user?.photoURL || dummpyPhoto} alt="user" class="rounded-full w-32 h-32" /> */}
                        {
                            admin ?
                                <div class="avatar online">
                                    <div class="w-24 rounded-full">
                                        <img src={user?.photoURL} alt="admin" />
                                    </div>
                                </div>
                                :
                                <div class="avatar offline">
                                    <div class="w-24 rounded-full">
                                        <img src={dummpyPhoto} alt="user" />
                                    </div>
                                </div>
                        }

                        <p class="text-lg">
                            You are logged in with {user.email}
                        </p>
                    </div>
                </div>
                <div class="text-center border border-base-content card  bg-primary">
                    <div class="card-body"></div>
                </div>
                <div class="text-center border border-base-content card  bg-info">
                    <div class="card-body"></div>
                </div>
            </div>
        </div>
    )
}
