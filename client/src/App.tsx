import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Overview from './pages/Dashboard/Overview.tsx';
import BoardList from './pages/Dashboard/BoardList.tsx';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import { useAuth } from './contexts/AuthContext.tsx'
import api from './api'
import axios from 'axios'
import { googleLogout } from '@react-oauth/google'
import { UserProvider } from './contexts/UserContext';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(/* initial user data */);

  // Handle Login State
  const { isLoggedIn, logout } = useAuth();
  // const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (!token) {
      logout(); // Run to fully log out
      googleLogout(); // Run to fully log out
      navigate('auth/signin')
    }

    if (token) {
      api.get('/users/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setUser(response.data);
          console.error(response.data);
        })
        .catch(error => {
          setError(error.message);

          // If not logged in, request logout
          try {
            axios.post('http://localhost:5001/api/users/logout')
            logout();
            googleLogout();

            navigate('auth/signin')
          } catch (error) {
            console.log(error)
          }

        });
    }
  }, [setUser, isLoggedIn]);


  useEffect(() => {
    console.error('User updated:', user);
  }, [user]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <UserProvider user={user} setUser={setUser}>
        <Routes>
          <Route
            index
            element={
              <>
                <PageTitle title="NebulaAdmin" />
                <Overview />
              </>
            }
          />
          <Route
            path="/kanban"
            element={
              <>
                <PageTitle title="NebulaAdmin" />
                <BoardList />
              </>
            }
          />
          {isLoggedIn && (
            <>
              <Route
                path="/calendar"
                element={
                  <>
                    <PageTitle title="Calendar | NebulaAdmin" />
                    <Calendar />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <PageTitle title="Profile | NebulaAdmin" />
                    <Profile />
                  </>
                }
              />
              <Route
                path="/forms/form-elements"
                element={
                  <>
                    <PageTitle title="Form Elements | NebulaAdmin" />
                    <FormElements />
                  </>
                }
              />
              <Route
                path="/forms/form-layout"
                element={
                  <>
                    <PageTitle title="Form Layout | NebulaAdmin" />
                    <FormLayout />
                  </>
                }
              />
              <Route
                path="/tables"
                element={
                  <>
                    <PageTitle title="Tables | NebulaAdmin" />
                    <Tables />
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <>
                    <PageTitle title="Settings | NebulaAdmin" />
                    <Settings />
                  </>
                }
              />
              <Route
                path="/chart"
                element={
                  <>
                    <PageTitle title="Basic Chart | NebulaAdmin" />
                    <Chart />
                  </>
                }
              />
              <Route
                path="/ui/alerts"
                element={
                  <>
                    <PageTitle title="Alerts | NebulaAdmin" />
                    <Alerts />
                  </>
                }
              />
              <Route
                path="/ui/buttons"
                element={
                  <>
                    <PageTitle title="Buttons | NebulaAdmin" />
                    <Buttons />
                  </>
                }
              />
            </>
          )}

          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | NebulaAdmin" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | NebulaAdmin" />
                <SignUp />
              </>
            }
          />

        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
