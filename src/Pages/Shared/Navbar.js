import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch(err => console.log(err))
    }

    const navItem =
        <>
            <li><Link to={'/blog'}>Blog</Link></li>
            <li><Link to={'/login'}>Login</Link></li>
            <li><Link to={'/signup'}>SignUp</Link></li>
            <li><Link><button onClick={handleLogout}>Logout</button></Link></li>
            <li><Link to={'/dashboard/addproduct'}>Add Product</Link></li>
            <li><Link to={'/dashboard/myproducts'}>My Products</Link></li>
            <li>
                <div className="drawer-content">
                    <label htmlFor="dashboard" className="lg:hidden">Dashboa</label>
                </div>
            </li>
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
                    <Link className="btn btn-ghost normal-case text-xl">daisyUI</Link>
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
                                {
                                    user?.photoURL ?
                                        <>
                                            <div className="dropdown dropdown-end">
                                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                                    <div className="w-10 rounded-full">
                                                        <img src={user?.photoURL} alt={user?.displayName} />
                                                    </div>
                                                </label>
                                            </div>
                                        </>
                                        :
                                        <>
                                        </>
                                }
                            </>
                            :
                            <></>
                    }
                </div>
                <label htmlFor="dashboard" tabIndex={2} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div >
    );
};

export default Navbar;