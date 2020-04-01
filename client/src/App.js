import React, {Fragment, } from 'react';
import Navbar from './components/Navbar'
import NoMatch from './components/NoMatch'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Items from './components/Items'
import Album from './components/Album'
import Policies from './components/Policies'
import Inbox from './components/Inbox'
import UserPage from './components/UserPage'
import { Switch, Route, } from 'react-router-dom';
import './App.css';


const App = () => (
  <Fragment>
    <Navbar />
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/items" component={Items} />
        <Route exact path="/album" component={Album} />
        <Route exact path="/policies" component={Policies} />
        <Route exact path="/inbox" component={Inbox} />
        <Route exact path="/userpage" component={UserPage} />
        <Route component={NoMatch} />
      </Switch>
      </div>
  </Fragment>
)

export default App;
