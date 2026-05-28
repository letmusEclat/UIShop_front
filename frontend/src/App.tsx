import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudyCentersPage from './pages/StudyCentersPage';
import StudyCenterDetailPage from './pages/StudyCenterDetailPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import { isLoggedIn } from './services/auth';

const requireAuth = () => (isLoggedIn() ? null : redirect('/login'));

const router = createBrowserRouter([
  { path: '/', loader: () => redirect('/home') },
  { path: '/login', element: <LoginPage /> },
  { path: '/home', element: <HomePage /> },
  { path: '/study-centers', element: <StudyCentersPage /> },
  { path: '/study-centers/:id', element: <StudyCenterDetailPage /> },
  { path: '/wishlist', element: <WishlistPage />, loader: requireAuth },
  { path: '/profile', element: <ProfilePage />, loader: requireAuth },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
