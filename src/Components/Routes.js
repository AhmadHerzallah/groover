import React from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import Grinder from './Pages/Grinder';
// import Login from './Pages/Login';
import Login from './Authentication/LogIn';

import Profile from './Pages/Profile';
import Home from './Pages/Home';
import Search from './Pages/Search';

// Authentication
import Signup from './Authentication/Signup';

const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/search' exact component={Search} />
      <Route path='/login' exact component={Login} />
      <Route path='/profile' exact component={Profile} />
      <Route path='/grinder' exact component={Grinder} />
      <Route path='/signup' exact component={Signup} />
    </Switch>
  );
};

export default Routes;
