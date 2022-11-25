import { createBrowserRouter } from "react-router-dom";


import Main from "../../Layout/Main";
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
            }

        ]
    },
    {
        path: '/category/:id',
        element: <ProductOfCategory></ProductOfCategory>
    },
    {
        // path: '/dashboard',
        // element: <Dashboard></Dashboard>,
        // children: [
        //     {
        path: '/dashboard/addproduct',
        element: <AddProducts></AddProducts>
        //     },
        //     {
        //         path: '/dashboard/myproduct',
        //         element: <AddProducts></AddProducts>
        //     }
        // ]
    },
    {
        path: '/dashboard/myproducts',
        element: <ShowProducts></ShowProducts>
    }
])