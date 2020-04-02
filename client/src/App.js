import React, {Fragment, } from 'react';
import Navbar from './components/Navbar'
import NoMatch from './components/NoMatch'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Items from './components/Items'
import Album from './components/Album'
import Policies from './components/Policies'
import Reports from './components/Reports'
import Inbox from './components/Inbox'
import UserPage from './components/UserPage'
import FetchUser from './components/FetchUser';
import { Switch, Route, } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import PageLayout from './components/Layout'

const App = () => (
  <Fragment>
    <Navbar />
    <PageLayout/>
    <FetchUser>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/items" component={Items} />
        <Route exact path="/album" component={Album} />
        <Route exact path="/policies" component={Policies} />
        <Route exact path="/reports" component={Reports} />
        <Route exact path="/inbox" component={Inbox} />
        <Route exact path="/userpage" component={UserPage} />
        <Route component={NoMatch} />
      </Switch>
    </FetchUser>
  </Fragment>
)

export default App;
