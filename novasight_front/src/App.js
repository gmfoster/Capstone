
import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Style Sheets/App.css';
import Home from './Home';
import Link from './Link';
import Dashboard from './Dashboard';
import Sensors from './Sensors'
import Login from './Login'



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


const App = () => (
  <Router>

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">  
      
            <a class="navbar-brand" href="#">Project Bob</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                      <Link to='/home'>
                        <a class="nav-link">
                            Home
                        </a>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to='/dashboard'>
                        <a class="nav-link">
                            Dashboard
                        </a>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to='/sensors'>
                        <a class="nav-link">
                            Sensors
                        </a>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to='/sensors'>
                        <a class="nav-link">
                            Alerts
                        </a>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to='/login'>
                        <a class="nav-link">
                            Login
                        </a>
                      </Link>
                    </li>
                </ul>
            </div>
      </nav> 

      

      {/* <Route path='/login' component={Login}/> */}
      <Route path='/home' component={Home}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/sensors' component={Sensors}/>
      <Route path='/login' component={Login}/>


  </Router>
);

export default App;


