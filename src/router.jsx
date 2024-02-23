import App from "./components/App";
import Login from "./pages/Login";
import FileManagement from "./pages/file-management/FileManagement";
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
            path: "/files",
            element: <FileManagement />
          },
          {
            path: "/login",
            element: <Login />
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