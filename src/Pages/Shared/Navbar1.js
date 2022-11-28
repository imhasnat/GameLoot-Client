import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import logo from '../../assets/logo.png'

const Navbar1 = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
            .then(() => {
                navigate('/');
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className="navbar bg-base-100 lg:hidden">
                <div className="navbar-start">
                    <Link to={'/'} className="btn btn-ghost normal-case text-xl w-64">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className='navbar-end'>
                    <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
            </div>
        </div >
    );
};

export default Navbar1;