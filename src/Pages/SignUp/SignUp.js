import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
// import { imageHost } from '../Shared/Function/imageHost';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signupError, setSignupError] = useState('');
    const navigate = useNavigate();

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    const handleSignUp = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        // const imageUrl = imageHost(image);
        setSignupError('');
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const imageUrl = imgData.data.url;

                    createUser(data.email, data.password)
                        .then(async result => {
                            console.log(result.user);
                            toast.success('User created Successfully');
                            const userInfo = {
                                displayName: data.name,
                                photoURL: imageUrl
                            }
                            await updateUser(userInfo)
                                .then(async res => {
                                    toast.success('Updated Successfully');
                                    saveUserDB(data.email, data.name, imageUrl, data.role);
                                })
                                .catch(err => {
                                    console.error(err.message);
                                })
                        })
                        .catch(err => {
                            console.error(err.message);
                            setSignupError(err);
                        })
                }
            })
    }

    const saveUserDB = async (email, name, img, role) => {
        // console.log('img', img);
        // console.log('role', role);
        const user = { name, email, img, role };
        // save to Database
        try {
            const res = await fetch(`${process.env.REACT_APP_Server_URL}/users`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const data = await res.json();

            //get Token 
            if (data.acknowledged) {
                toast.success('Database save Successfull');
                console.log('saved', data);
                fetch(`${process.env.REACT_APP_Server_URL}/jwt?email=${email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.accessToken) {
                            localStorage.setItem('accessToken', data.accessToken)
                            toast.success('Local Storage save successfull');
                            navigate('/');
                        }
                    })
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className='h-[800px] flex justify-center items-center'>
                <div className='w-96 p-7 rounded-lg bg-white m-3'>
                    <h2 className='text-xl text-center'>Sign Up to Join Us</h2>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Name</span></label>
                            <input
                                {...register("name", { required: "Name is required" })}

                                type="text"
                                className="input input-bordered w-full max-w-xs" />

                            {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">User Role</span></label>
                            <select
                                {...register("role")}
                                className="select select-bordered">
                                <option value={'buyer'}>Buyer</option>
                                <option value={'seller'}>Seller</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Email</span></label>
                            <input
                                {...register("email", { required: "Email is required" })}

                                type="text"
                                className="input input-bordered w-full max-w-xs" />

                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Password</span></label>
                            <input type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                })}
                                className="input input-bordered w-full max-w-xs" />
                            <label className="label"> <span className="label-text">Forget Password?</span></label>
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs mb-4">
                            <label className="label"><span className="label-text">Select Image</span></label>
                            <input
                                {...register("image", { required: 'image is required' })}
                                required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                            />
                        </div>
                        <input className='btn text-white transform bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 w-full' value="Sign Up" type="submit" />
                        <div>
                            {signupError && <p className='text-red-600'>{signupError}</p>}
                        </div>
                    </form>
                    <p>Already have an account? <Link className='text-purple-500' to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;