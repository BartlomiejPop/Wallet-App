import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = localStorage.getItem('accessToken');
  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
