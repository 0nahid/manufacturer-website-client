import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
export default function NewsLetter() {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        const email = data.email;
        // console.log(`email:`, email);
        axios.post(`https://car-parts-bangladesh.herokuapp.com/api/newsletter/${email}`, { email })
            .then(res => {
                // console.log(res.data.ok);
                if (res.data.ok === 1) {
                    toast.success('Successfully subscribed to newsletter')
                    reset();
                }
            }
            ).catch(err => {
                // console.log(err)
                toast.error('Error subscribing to newsletter')
            });
    };

    return (
        <div className='flex justify-center items-center bg-gray-200 mt-10 -mb-4 p-5'>

            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-2xl font-bold text-primary">Subscribe to Our Nerwsletter</h1>
                <div className="form-control w-full max-w-lg">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder='example@example.com' className="input input-bordered w-full max-w-lg"{...register("email",
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
                <div className="form-control w-full max-w-lg">
                    <button className="btn btn-primary" type="submit">Subscribe</button>
                </div>
            </form>
        </div>
    )
}
