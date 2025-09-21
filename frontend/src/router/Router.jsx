import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import Login from "../pages/login";
import Signup from "../pages/Signup";
import PublishPaper from "../pages/publishPaper";
import PaperPage from "../pages/Paperpage";
import PaperDetailPage from '../pages/PaperDetailPage';
PaperPage
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
            },{
                path:"/papers",
                element:<PaperPage/>
            }

            , { path:"/papers/publish", element:<PublishPaper/> },
            { path: "/papers/:id", element: <PaperDetailPage /> }
             
            ]
    }
]);
export default router;