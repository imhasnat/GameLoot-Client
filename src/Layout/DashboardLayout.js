import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';
import Navbar1 from '../Pages/Shared/Navbar1';
// import useAdmin from '../Hooks/useAdmin';
import logo from '../assets/logo.png'
import { FiLogOut } from "react-icons/fi";
import { HiHomeModern } from "react-icons/hi2";
import { BsCartPlusFill, BsCartFill, BsCartCheckFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";

const DashboardLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const [role, setRole] = useState([]);
    const navigate = useNavigate();

    // const [isAdmin] = useAdmin(user?.email)
    useEffect(() => {
        fetch(`${process.env.REACT_APP_Server_URL}/users/role?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setRole(data);
            })
    }, [user?.email])

    const handleLogout = () => {
        logout()
            .then(() => {
                navigate('/');
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Navbar1></Navbar1>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700">
                        <img src={logo} alt="logog" className='hidden lg:block' />
                        <div className="flex flex-col items-center mt-6 -mx-2">
                            <img className="object-cover w-24 h-24 mx-2 rounded-full" src={user?.photoURL} alt="avatar" />
                            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{user?.displayName}</h4>
                            <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{user?.email}</p>
                        </div>
                        <div className="flex flex-col justify-between items-center flex-1 mt-6">
                            <ul className="menu p-4 sm:bg-base-100 lg:bg-inherit text-base-content">
                                {
                                    role[0]?.role === 'buyer' && <li><Link to={'/dashboard/myorders'} className='flex items-center'>
                                        <BsCartCheckFill className='mr-1' />
                                        My Orders
                                    </Link></li>
                                }
                                {
                                    role[0]?.role === 'seller' &&
                                    <>
                                        <li><Link to={'/dashboard/addproduct'} className='flex items-center'>
                                            <BsCartPlusFill className='mr-1' />
                                            Add Product
                                        </Link></li>
                                        <li><Link to={'/dashboard/myproducts'} className='flex items-center'>
                                            <BsCartFill className='mr-1' />
                                            My Products
                                        </Link></li>
                                    </>
                                }
                                {
                                    role[0]?.role === 'admin' &&
                                    <>
                                        <li><Link to={'/dashboard/allsellers'} className='flex items-center'>
                                            <FaUserAlt className='mr-1' />
                                            All Sellers</Link></li>
                                        <li><Link to={'/dashboard/allbuyer'} className='flex items-center'>
                                            <FaUserAlt className='mr-1' />
                                            All Buyers</Link></li>
                                        <li><Link to={'/dashboard/reports'} className='flex items-center'>
                                            <MdReportProblem className='mr-1' />
                                            Reported Items</Link></li>
                                    </>
                                }
                                <li><Link to={'/'} className='flex items-center'>
                                    <HiHomeModern className='mr-1' />
                                    Home
                                </Link></li>
                                <li><Link><button onClick={handleLogout} className='flex items-center'>
                                    <FiLogOut className='mr-1' />
                                    Logout</button>
                                </Link></li>
                            </ul>
                        </div>
                    </div>
                    {/* <ul className="menu p-4 w-80 sm:bg-base-100 lg:bg-inherit text-base-content">
                        {
                            role[0]?.role === 'buyer' && <li><Link to={'/dashboard/myorders'}>My Orders</Link></li>
                        }
                        {
                            role[0]?.role === 'seller' &&
                            <>
                                <li><Link to={'/dashboard/addproduct'}>Add Product</Link></li>
                                <li><Link to={'/dashboard/myproducts'}>My Products</Link></li>
                            </>
                        }
                        {
                            role[0]?.role === 'admin' &&
                            <>
                                <li><Link to={'/dashboard/allsellers'}>All Sellers</Link></li>
                                <li><Link to={'/dashboard/allbuyer'}>All Buyers</Link></li>
                                <li><Link to={'/dashboard/reports'}>Reported Items</Link></li>
                            </>
                        }
                    </ul> */}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;