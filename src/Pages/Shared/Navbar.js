import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import logo from '../../assets/logo.png'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
            .then(() => {
                navigate('/');
            })
            .catch(err => console.log(err))
    }

    const navItem =
        <>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/blog'}>Blog</Link></li>
            {/* <li><Link to={'/signup'}>SignUp</Link></li> */}

            <>
                {
                    user?.uid ?
                        <>
                            <li><Link to={'/dashboard'}>Dashboard</Link></li>
                            {/* <li>
                                <div className="drawer-content">
                                    <label htmlFor="dashboard" className="lg:hidden">Dashboard</label>
                                </div>
                            </li> */}
                            <li><Link><button onClick={handleLogout}>Logout</button></Link></li>
                        </>
                        :
                        <>
                            <li><Link to={'/login'}>Login</Link></li>
                        </>
                }
            </>
        </>

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost normal-case text-xl">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {navItem}
                    </ul>
                </div>
                <div className='navbar-end'>
                    {
                        user?.uid ?
                            <>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user?.photoURL} alt={''} title={user?.displayName} referrerPolicy="no-referrer" />
                                        </div>
                                    </label>
                                </div>
                            </>
                            :
                            <></>
                    }
                </div>
                <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div >
    );
};

export default Navbar;