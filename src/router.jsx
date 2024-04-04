import App from './components/App';
import VideoChat from './pages/VideoChat';
import Login from './pages/Login';
import Register from './pages/Register';
import FileManagement from './pages/file-management/FileManagement';
import GroupDashboard from './pages/group-dashboard/GroupDashboard';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { checkLoggedIn } from './utils/db';

const redirectToLogin = () => {
  const isLoggedIn = checkLoggedIn();
  if (isLoggedIn) return null;
  return redirect("/login");
}

const redirectToDashboard = () => {
  const isLoggedIn = checkLoggedIn();
  if (isLoggedIn) return redirect("/dashboard");
  return null;
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
            loader: redirectToLogin
          },
          {
            path: '/video',
            element: <VideoChat />,
            loader: redirectToLogin
          },
          {
            path: '/login',
            element: <Login />,
            loader: redirectToDashboard
          },
          {
            path: '/register',
            element: <Register />,
            loader: redirectToDashboard
          },
          {
            path: '/group/:group',
            element: <GroupDashboard />,
            loader: redirectToLogin
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
