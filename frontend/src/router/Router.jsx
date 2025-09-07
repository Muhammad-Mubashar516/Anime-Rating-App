import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import Login from "../pages/login";
import Signup from "../pages/Signup";
const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement:<PageNotFound/>,
        children:[
            {
            path:"/",
            element:<Home/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/Signup",
                element:<Signup/>
            }
        ]
    }
]);
export default router;