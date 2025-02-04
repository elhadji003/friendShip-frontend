import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import publicRoutes from './routes/PublicRoutes';
import ProtectedRoutes from './auth/ProtectedRoutes';
import privateRoutes from './routes/PrivateRoutes';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';
import adminRoutes from './routes/AdminRoutes';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {publicRoutes.map(({ path, element: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
          <Route element={<ProtectedRoutes> <Layout /> </ProtectedRoutes>}>
            {privateRoutes.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
          </Route>
          <Route element={<ProtectedRoutes> <Layout /> </ProtectedRoutes>}>
            {adminRoutes.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
