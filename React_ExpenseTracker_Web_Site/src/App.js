import React, { Suspense,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from './Redux/authSlicer';

const LazyUserProfile = React.lazy(() => import('./Components/UserProfile/UserProfile'));
const LazyExpense = React.lazy(() => import('./Components/Expenses/Expenses'));
const LazyPasswordChange = React.lazy(() => import('./Components/Auth/ChangePassword'));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authAction.login());
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const toggle = useSelector((state) => state.theme.toggletheme);

  return (
    <div
      style={{ backgroundColor: toggle ? 'grey' : '#f0f0f0', color: toggle ? 'white' : 'black',}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/ChangePassword' element={<Suspense fallback={<div>...Loading</div>}><LazyPasswordChange /></Suspense>}/>
          {isAuthenticated && (
            <>
          <Route path='/Expenses' element={ <Suspense fallback={<div>...Loading</div>}> <LazyExpense /></Suspense>}/>
          <Route path='/User'element={ <Suspense fallback={<div>...Loading</div>}> <LazyUserProfile /></Suspense>}/>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
