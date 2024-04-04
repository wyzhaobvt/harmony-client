import App from './components/App';
import VideoChat from './pages/VideoChat';
import Login from './pages/Login';
import Register from './pages/Register';
import FileManagement from './pages/file-management/FileManagement';
import GroupDashboard from './pages/group-dashboard/GroupDashboard';
import { createBrowserRouter, redirect } from 'react-router-dom';

const checkLoggedIn = () => {
  return localStorage.getItem("harmony_email");
}

const redirectToLogin = () => {
  const isLoggedIn = checkLoggedIn();
  if (isLoggedIn) return isLoggedIn;
  return redirect("/login");
}

export default createBrowserRouter([
  {
    path: '/',
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
            loader: () => {
              const isLoggedIn = checkLoggedIn();
              if (isLoggedIn) return redirect("/dashboard");
              return redirect("/login");
            },
            element: <div>Welcome to Harmony!</div>,
          },
          {
            path: '/files',
            element: <FileManagement />,
            loader: () => {
              return redirectToLogin();
            }
          },
          {
            path: '/video',
            element: <VideoChat />,
            loader: () => {
              return redirectToLogin();
            }
          },
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },
          {
            path: '/group/:group',
            element: <GroupDashboard />,
            loader: () => {
              return redirectToLogin();
            }
          },
        ],
      },
      {
        path: '*',
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
