import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AuthPage } from '../../../../pages/auth'
import { MainPage } from '../../../../pages/main'
import { RegisterPage } from '../../../../pages/register'
import Layout from '../../../layout/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/main" replace /> },
      {
        path: '/main',
        element: <MainPage />,
      },
    ]
  },

  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
])

function AppRouter() {
  return <RouterProvider router={router} />
}

export default AppRouter

