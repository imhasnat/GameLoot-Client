import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AllBuyers from "../../Pages/Dashboard/Admin/AllBuyers";
import AllReportsProducts from "../../Pages/Dashboard/Admin/AllReportsProducts";
import AllSellers from "../../Pages/Dashboard/Admin/AllSellers";
import MyOrders from "../../Pages/Dashboard/Buyer/MyOrders";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import AddProducts from "../../Pages/Dashboard/Seller/AddProducts";
import ShowProducts from "../../Pages/Dashboard/Seller/ShowProducts";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import ProductOfCategory from "../../Pages/Home/Categories/ProductOfCategory";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/category/:id',
                element: <ProductOfCategory></ProductOfCategory>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>,
            },
            // buyer
            {
                path: '/dashboard/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`${process.env.REACT_APP_Server_URL}/booking/${params.id}`)
            },
            // seller
            {
                path: '/dashboard/addproduct',
                element: <AddProducts></AddProducts>
            },
            {
                path: '/dashboard/myproducts',
                element: <ShowProducts></ShowProducts>
            },
            // admin
            {
                path: '/dashboard/allsellers',
                element: <AllSellers></AllSellers>
            },
            {
                path: '/dashboard/allbuyer',
                element: <AllBuyers></AllBuyers>
            },
            {
                path: '/dashboard/reports',
                element: <AllReportsProducts></AllReportsProducts>
            }
        ]
    },
])