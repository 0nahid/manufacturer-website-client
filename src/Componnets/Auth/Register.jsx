import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../Hooks/useToken';
import Loading from '../Shared/Loading';

export default function Register() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        cUser,
        cLoading,
        cError,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [updateProfile, updating, uError] = useUpdateProfile(auth);
    const [token] = useToken(cUser || gUser);

    const navigate = useNavigate();
    let signUpError;
    if (gError || cError || uError) {
        signUpError = <p className="text-error">{gError?.message || cError?.message || uError?.message}</p>
    }
    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.displayName })
        toast(`Welcome ${data.displayName}! You are now registered. ${data.email} check your email/spambox to verify your account.`, {
            icon: '⚠️',
        });

    };
    if (cLoading || gLoading || updating) {
        <Loading />
    }
    if (gError || cError || uError) {
        signUpError = <p className="text-error">{gError?.message || cError?.message || uError?.message}</p>
    }
    if(token) {
        navigate('/', { replace: true });
    }
    return (
        <div className="flex justify-center items-center h-screen">
             <Helmet>
                <title>Register - Car Parts</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="card w-96 ">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Sign up</h2>
                    <div className="flex flex-col w-full border-opacity-50">
                        <div className="grid place-items-center">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" className="input input-bordered w-full max-w-xs"{...register("displayName",
                                        {
                                            required: {
                                                value: true,
                                                message: "Name is required"
                                            },
                                            pattern: {
                                                value: /^[a-z ,.'-]+$/i,
                                                message: 'Name is not valid',
                                            }
                                        })} />
                                    <label className="label">
                                        <span className="label-text-alt"> <p className="text-error">{errors.name?.message}</p></span>
                                    </label>
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" className="input input-bordered w-full max-w-xs"{...register("email",
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
                                        <span className="label-text-alt"> <p className="text-error">{errors.email?.message}</p></span>
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
                                {signUpError}
                                <div className="form-control w-full max-w-xs">
                                    <button className="btn btn-primary" type="submit">Register</button>
                                </div>
                            </form>
                            <p className="text-sm mt-2">Already have an account? <Link className="text-primary" to="/login">Login here!!!</Link> </p>
                        </div>
                        <div className="divider">OR</div>
                        <div className="form-control w-full max-w-xs">
                            <button className="btn btn-outline btn-dark text-black font-bold"
                                onClick={() => signInWithGoogle()}
                            ><FcGoogle className="w-6 h-6 mr-1" />Login with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
