import React from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import Grinder from './Grinder';
import Login from './Login';
import Profile from './Profile';
import Home from './Home';
import Search from './Search';

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
    </Switch>
  );
};

export default Routes;
