import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';

export default function PrivateRoute() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth/login" />;
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}