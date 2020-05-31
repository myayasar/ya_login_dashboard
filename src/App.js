import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from "react-router-dom";
import {accessCookie,clearCookies,setCookies} from './components/common';

import Login from "./components/login";
import SignUp from "./components/signup";
import Profile from "./components/profile";

const ProtectedRoute = ({ component: Comp, logged_in, data, path, ...rest }) => {
  return (
    <Route 
      path={path}
      {...rest}
      render={(props) => {
        return (logged_in) ? (
          <Comp {...props} {...data} {...rest}/>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                prevLocation: path,
                error: "You need to login first!",
              },
            }}
          />
        );
      }}
    />
  );
};

const PrivateRoute = ({ component: Comp, logged_in, data, path, ...rest }) => {
  return (
    <Route 
      path={path}
      {...rest}
      render={(props) => {
        return (!logged_in) ? (
          <Comp {...props} {...data} {...rest}/>
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: {
                prevLocation: path,
                error: "You need to login first!",
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends Component {
  constructor(props){
    super(props);
    this.state={logged_in:false,data:{}}
    let data=accessCookie("MEST")
    if(data.username){
      this.state={logged_in:true,data}
    }
  }
  logout = () => {
    clearCookies();
    this.setState({logged_in:false,data:{}})
  }
  login = (data) => {
    setCookies(data);
    this.setState({logged_in:true,data})
  }
  render(){
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Demo Login</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {!this.state.logged_in && (<React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li></React.Fragment>)}
              {this.state.logged_in && (<React.Fragment>
              <li className="nav-item">
              <a onClick={()=>this.logout()} className="btn btn-primary">Log out</a>
              </li>
             </React.Fragment>)}
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <PrivateRoute exact path='/' component={Login} login={this.login} {...this.state}/>
            <PrivateRoute path="/sign-in" component={Login} login={this.login} {...this.state}/>
            <PrivateRoute path="/sign-up" component={SignUp} {...this.state}/>
            <ProtectedRoute path="/dashboard" component={Profile} logout={this.logout} {...this.state}  />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
  }
}

export default App;