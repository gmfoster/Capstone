
import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Style Sheets/App.css';
import Home from './Home';
import Link from './Link';
import Dashboard from './Dashboard';
import Sensors from './Sensors'
import Login from './Login'
import Redirect from './Redirect'
import Alerts from './Alerts'



import createHistory from 'history/createBrowserHistory'; 

const Route = ({ path, component}, {location}) => {
  const pathname = location.pathname;
  if (pathname.match(path)) {
    return (
      React.createElement(component)
);
} else {
    return null;
  }
};

Route.contextTypes = {
  location: PropTypes.object,
};

class Router extends React.Component {
  static childContextTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.history = createHistory();
    this.history.listen(() => this.forceUpdate());
  }
  getChildContext() {
    return {
      history: this.history,
      location: window.location,
    };
  }
  render(){
    return this.props.children
  };

}

var isAuthenticated = true

class App extends React.Component {
  handleLogout(){
    isAuthenticated = false
    this.forceUpdate();
    console.log("Handle Louto")
  }

  render(){
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">  
          
          <Link to={{pathname:'/home', class:"navbar-brand"}}>
            Novasight
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={{pathname:'/home', class:"nav-link"}}>
                  Home
                </Link>
              </li>
              {isAuthenticated &&
                <li className="nav-item">
                  <Link to={{pathname:'/dashboard',class:"nav-link"}}>
                    Dashboard
                  </Link>
                </li>
              }
              { isAuthenticated &&
                <li className="nav-item">
                  <Link to={{pathname:'/sensors',class:"nav-link"}}>
                    Sensors
                  </Link>
                </li>
              }
              {isAuthenticated &&
                <li className="nav-item">
                  <Link to={{pathname:'/alerts',class:"nav-link"}}>
                    Alerts
                  </Link>
                </li>
              }
              {!isAuthenticated &&
                <li className="nav-item">
                  <Link to={{pathname:'/login',class:"nav-link"}}>
                    Login
                  </Link>
                </li>
              }
              {isAuthenticated &&
                <li onClick={this.handleLogout.bind(this)} className="nav-item">
                  <Link to={{pathname:'/login',class:"nav-link"}}>
                    Lougout
                  </Link>
                </li>
              }
            </ul>
          </div>
      </nav> 

        
        {!isAuthenticated && 
          <Redirect to='/login'/>
        }
        {isAuthenticated && 
          <Redirect to='/home'/>
        }
        <Route path='/home' component={Home}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/sensors' component={Sensors}/>
        <Route path='/login' component={Login}/>
        <Route path='/alerts'component={Alerts}/>

      </Router>
    );
  }
}



export default App;


