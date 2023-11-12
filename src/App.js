import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm/RegisterForm';
import Login from './pages/Login/Login';
import PrivateRoute from './privateRoute/PrivateRoute';
import Loader from './components/Loader/Loader';

// LazyLoad
const LazyHome = lazy(() => import('./pages/Home/Home'));
const LazyStatistic = lazy(() => import('./pages/Statistic/Statistic'));
const LazyCurrencies = lazy(() => import('./pages/Currencies/Currencies'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/home"
        element={
          <PrivateRoute
            redirectTo="/login"
            component={
              <Suspense fallback={<Loader />}>
                <LazyHome />
              </Suspense>
            }
          />
        }
      />

      <Route
        path="/statistic"
        element={
          <PrivateRoute
            redirectTo="/login"
            component={
              <Suspense fallback={<Loader />}>
                <LazyStatistic />
              </Suspense>
            }
          />
        }
      />

      <Route
        path="/currencies"
        element={
          <PrivateRoute
            redirectTo="/login"
            component={
              <Suspense fallback={<Loader />}>
                <LazyCurrencies />
              </Suspense>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
