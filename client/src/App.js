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
import House from './components/House';
import EditMaintenances from './components/EditMaintenances';
import EditAssessments from './components/EditAssessments';
import EditHome from './components/EditHome';
import PolicyForm from './components/forms/PolicyForm';
import EditPolicy from './components/EditPolicy'

const App = () => (
  <Fragment>
    <Navbar />
    <FetchUser>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/house" component={House} />
        <ProtectedRoute exact path="/items" component={Items} />
        <ProtectedRoute exact path="/album" component={Album} />
        <ProtectedRoute exact path="/policies" component={Policies} />
        <ProtectedRoute exact path="/reports" component={Reports} />
        <ProtectedRoute exact path="/inbox" component={Inbox} />
        <ProtectedRoute exact path="/userpage" component={UserPage} />
        <ProtectedRoute exact path="/add/policy" component={PolicyForm} />
        <ProtectedRoute exact path="/edit/maintenance" component={EditMaintenances} />
        <ProtectedRoute exact path="/edit/assessment" component={EditAssessments} />
        <ProtectedRoute exact path="/edit/home" component={EditHome} />
        <ProtectedRoute exact path="/edit/policy" component={EditPolicy} />
        <Route component={NoMatch} />
      </Switch>
    </FetchUser>
  </Fragment>
)

export default App;
