import App from "./components/App";
import VideoChat from "./pages/VideoChat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FileManagement from "./pages/file-management/FileManagement";
import PersonalDashboard from "./pages/personal-dashboard/PersonalDashboard"
import {createBrowserRouter} from "react-router-dom"
export default createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <div>Error occurred in app<br/><a href="/" className="text-blue-400">Return Home</a></div>,
    children: [
      {
        errorElement: <div>Error occurred in outlet</div>,
        children: [
          {
            index: true,
            element: <div>Welcome to Harmony!</div>
          },
          {
            path: "/files/:chatId?",
            element: <FileManagement />
          },
          {
            path: "/video",
            element: <VideoChat />
          },
          {
            path: "/login",
            element: <Login />
          },
          {
            path: "/register",
            element: <Register />
          },
          {
            path: "/personalDashboard",
            element: <PersonalDashboard />
          }
        ]
      },
      {
        path: "*",
        element: <div>Page does not exist<br/><a href="/" className="text-blue-400">Return Home</a></div>
      }
    ]
  }
])