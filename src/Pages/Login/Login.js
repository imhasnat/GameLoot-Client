import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loginError, setLoginError] = useState('');
    const { login, loginPopup } = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate();
    const from = location.state?.from.pathname || '/';
    const provider = new GoogleAuthProvider();

    const handleLogin = data => {
        setLoginError('')
        login(data.email, data.password)
            .then(result => {
                toast.success('Login Successfully')
                console.log(result);
                if (data.email) {
                    getToken(data.email)
                }
            })
            .catch(err => {
                console.error(err.message)
                setLoginError(err);
            })
    }

    const handleGoogleLogin = () => {
        loginPopup(provider)
            .then(result => {
                toast.success('Login Successfully')
                console.log(result.user);
                const email = result?.user?.email;
                const name = result?.user?.displayName;
                const img = result?.user?.photoURL;
                const role = 'user';
                saveUserDB(email, name, img, role);
            })
            .catch(err => {
                console.log(err.message);
                setLoginError(err)
            })
    }

    const saveUserDB = async (email, name, img, role) => {
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
                getToken(email);
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    const getToken = email => {
        fetch(`${process.env.REACT_APP_Server_URL}/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken)
                    toast.success('Local Storage save successfull');
                    navigate(from, { replace: true });
                }
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div>
            <div className='h-[800px] flex justify-center items-center'>
                <div className='w-96 p-7'>
                    <h2 className='text-xl text-center'>Login</h2>
                    <form onSubmit={handleSubmit(handleLogin)}>
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
                        <input className='btn text-white transform bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 w-full' value="Login" type="submit" />
                        <div>
                            {loginError && <p className='text-red-600'>{loginError}</p>}
                        </div>
                    </form>
                    <p>New to Doctors Portal <Link className='text-purple-500' to="/signup">Create new Account</Link></p>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleLogin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div>
    );
};

export default Login;