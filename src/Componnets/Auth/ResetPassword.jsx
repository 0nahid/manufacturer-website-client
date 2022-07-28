import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

export default function ResetPassword() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
    );
    const navigate = useNavigate();
    const onSubmit = (data) => {
        sendPasswordResetEmail(data.email)
        toast.success(`Password reset email sent to ${data.email}`)

    };
    if (error) {
        toast.error(error.message)
    }
    if (sending) {
        navigate('/')
    }
    return (
        <div class="flex h-screen justify-center items-center px-4 lg:px-12">
             <Helmet>
                <title>Reset - Car Parts</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Reset Password!</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            <button className="btn btn-primary" type="submit">Send Email</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
