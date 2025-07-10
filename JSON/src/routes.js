import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import DashboardApp from './pages/DashboardApp';
import TestPage from './pages/TestPage';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import UserList from './pages/UserList';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import UserProfile from './pages/UserProfile'

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Navigate to="/login" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'testpage', element: <TestPage /> },
        { path: 'userlist', element: <UserList /> },
        { path: 'userprofile', element: <UserProfile /> }

      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'registerResp', element: <RegisterSuccess /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
