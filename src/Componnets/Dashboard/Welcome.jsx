import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

export default function Welcome() {
    const [user] = useAuthState(auth);
    // console.log(user?.photoURL);
    const dummpyPhoto = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';
    return (
        <div class="flex justify-center items-center min-h-screen bg-[#000000]">
            <div class="stack">
                <div class="text-center border border-base-content card  bg-gray-50">
                    <div class="card-body items-center">
                        <h1 class="text-2xl font-bold">Welcome {user.displayName}</h1>
                        <img src={user?.photoURL || dummpyPhoto} alt="user" class="rounded-full w-32 h-32" />
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
