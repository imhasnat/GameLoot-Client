import { createBrowserRouter } from "react-router-dom";


import Main from "../../Layout/Main";
import AddProducts from "../../Pages/Dashboard/AddProducts";


import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
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
    }
])