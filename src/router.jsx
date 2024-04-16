import App from "./components/App";
import VideoCall from "./pages/video-call/VideoCallPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FileManagementPage from "./pages/file-management/FileManagementPage";
import Profile from "./pages/profile/Profile";
import GroupDashboard from "./pages/group-dashboard/GroupDashboard";
import PersonalDashboard from "./pages/personal-dashboard/PersonalDashboard";
import { createBrowserRouter } from "react-router-dom";
export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div>
        Error occurred in app
        <br />
        <a href="/" className="text-blue-400">
          Return Home
        </a>
      </div>
    ),
    children: [
      {
        errorElement: <div>Error occurred in outlet</div>,
        children: [
          {
            index: true,
            element: <div>Welcome to Harmony!</div>,
          },
          {
            path: "/files/:chatId?",
            element: <FileManagementPage />
          },
          {
            path: "/video",
            element: <VideoCall />
          },
          {
            path: "/video/:group/:uid",
            element: <VideoCall />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/profile",
            element: <Profile />
          },
          {
            path: "/group/:group/:uid",
            element: <GroupDashboard />,
          },
          {
            path: "/personalDashboard",
            element: <PersonalDashboard />,
          },
        ],
      },
      {
        path: "*",
        element: (
          <div>
            Page does not exist
            <br />
            <a href="/" className="text-blue-400">
              Return Home
            </a>
          </div>
        ),
      },
    ],
  },
]);
