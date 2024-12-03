import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Layout from './Components/Layout/Layout';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Dashboard from './Components/Home/Dashboard';
import Send from './Components/Send/Send';
import Received from './Components/Received/Received';
import Pending from './Components/Pending/Pending';
import Completed from './Components/Completed/Completed';
import Compress from './Components/Compress/Compress';
import History from './Components/History/History';


const router = createBrowserRouter([
  {
    path: "/",element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",element: <Dashboard></Dashboard>,
      },
      {
        path: "/send",element: <Send></Send>,
      },
      {
        path: "/received",element: <Received></Received>,
      },
      {
        path: "/pending",element: <Pending></Pending>,
      },
      {
        path: "/completed",element: <Completed></Completed>,
      },
      {
        path: "/compress",element: <Compress></Compress>,
      },
      {
        path: "/history",element: <History></History>,
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
