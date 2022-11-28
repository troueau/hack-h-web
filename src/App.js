import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { UserProvider, UserConsumer } from './UserContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import SignIn from './pages/SignIn';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FestivalPage from './pages/FestivalPage';
import Notifications from './pages/Notifications';
import CustomizedSnackbars from './components/CustomizedSnackbars';


function App() {

  const ProtectedRoute = ({ auth, children }) => {
    if (!auth || !auth.isAuth) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // clear local storage after 1 hour
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.clear();
    }, 1000 * 3600);
    return () => clearInterval(interval);
  }, []);

  return (
    <UserProvider>
      <Router>
        <Header />
        <CustomizedSnackbars />
        <Routes>
          <Route
            path='/home'
            exact
            element={
              <UserConsumer>
                {({ authenticatedUser }) => {
                  return <ProtectedRoute auth={authenticatedUser}>
                    <HomePage />
                  </ProtectedRoute>
                }}
              </UserConsumer>
            } />
          <Route
            path='/festivalpage/:id'
            exact
            element={
              <UserConsumer>
                {({ authenticatedUser }) => {
                  return <ProtectedRoute auth={authenticatedUser}>
                    <FestivalPage />
                  </ProtectedRoute>
                }}
              </UserConsumer>
            } />
          <Route
            path='/notification/:id'
            exact
            element={
              <UserConsumer>
                {({ authenticatedUser }) => {
                  return <ProtectedRoute auth={authenticatedUser}>
                    <Notifications />
                  </ProtectedRoute>
                }}
              </UserConsumer>
            } />
          <Route
            path='/festivalcreation'
            exact
            element={
              <UserConsumer>
                {({ authenticatedUser }) => {
                  return <ProtectedRoute auth={authenticatedUser}>
                    <FestivalPage />
                  </ProtectedRoute>
                }}
              </UserConsumer>
            } />

          <Route exact element={<SignIn />} path="/login" />
          {/* <Route exact path="/festivalpage/:id" element={<FestivalPage />} />
          <Route exact path="/notification/:id" element={<Notifications />} />
          <Route exact path="/festivalcreation" element={<FestivalPage />} /> */}
          {/* <Route exact path="/about" element={<About />} /> */}
          {/* default route */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </UserProvider>

  );
}

export default App;
