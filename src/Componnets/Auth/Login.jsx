import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

export default function Login() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        sUser,
        sLoading,
        sError,
    ] = useSignInWithEmailAndPassword(auth);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [user] = useAuthState(auth);
    const onSubmit = (data) => {
        console.log(data)
        signInWithEmailAndPassword(data.mail, data.password);
    };
    if (user) {
        navigate(from, { replace: true });
    }
    let signInError;
    (gError || sError) ?
        signInError = <p className='text-red-500'><small>{sError?.message || gError?.message}</small></p> : signInError = ''

    if (gLoading || sLoading) {
        return <Loading />
    }
    return (
        <div class="flex h-screen justify-center items-center px-4 lg:px-12">
            <div class="card w-96 ">
                <h1 className="text-center text-2xl font-bold mt-5">Login Here</h1>
                <div class="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" className="input input-bordered w-full max-w-xs"{...register("mail",
                                {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    },
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                        ,
                                        message: 'Email is not a valid email address'
                                        ,
                                    }
                                })} />
                            <label className="label">
                                <span className="label-text-alt"> <p className="text-error">{errors.mail?.message}</p></span>
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" className="input input-bordered w-full max-w-xs"{...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is required"
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: "Password must be at least 8 characters, contain at least one letter and one number"
                                }
                            })} />

                            <label className="label">
                                <span className="label-text-alt"> <p className="text-error">{errors.password?.message}</p></span>
                            </label>
                        </div>
                        <Link to="/reset-password" className="ml-2"> <small class="font-bold">Forgot password?</small> </Link>
                        {signInError}

                        <div className="form-control w-full max-w-xs">
                            <button className="btn btn-primary" type="submit">Login</button>
                        </div>
                        <small class="font-bold"> Don't have an account?  <Link to="/register" className="ml-2"> Create an account! </Link></small>
                    </form>
                    <div class="divider">OR</div>
                    <div className="form-control w-full max-w-xs">
                        <button className="btn btn-outline btn-dark text-black font-bold"
                        onClick={() => signInWithGoogle()}
                        ><FcGoogle className="w-6 h-6 mr-1" />Login with Google</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

