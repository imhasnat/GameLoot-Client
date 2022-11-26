import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';
import Navbar from '../Pages/Shared/Navbar';
// import useAdmin from '../Hooks/useAdmin';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    // const [isAdmin] = useAdmin(user?.email)
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
                        <li><Link to={'/dashboard/myorders'}>My Orders</Link></li>
                        <li><Link to={'/dashboard/addproduct'}>Add Product</Link></li>
                        <li><Link to={'/dashboard/myproducts'}>My Products</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;