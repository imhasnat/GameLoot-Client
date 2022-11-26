import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';
import Navbar from '../Pages/Shared/Navbar';
// import useAdmin from '../Hooks/useAdmin';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState([]);
    // const [isAdmin] = useAdmin(user?.email)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_Server_URL}/users/role?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setRole(data);
            })
    }, [user?.email])

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
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
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;