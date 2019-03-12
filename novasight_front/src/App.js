
import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Style Sheets/App.css';
import Home from './Home';
import Link from './Link';
import Dashboard from './Dashboard';
import Sensors from './Sensors'
import Login from './Login'
import Redirect from './Redirect'
import Profile from './Profile'
import firebase from './firebase.js';


import createHistory from 'history/createBrowserHistory'; 


var onlyOnce = true

const iFrameStyle = {
  width:0,
  height:0,
  border:0,
  display:"none"
};

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

var isAuthenticated = false

class App extends React.Component {

  constructor(){
    super()
    this.ref = firebase.database().ref('users');
  }

  componentDidMount(){
    
    this.ref.on('value', (snapshot) => {
      let items = snapshot.val();
      
      if(items["isLoggedIn"] == true){
        isAuthenticated = true
        onlyOnce = true
      }else{
        isAuthenticated = false
        onlyOnce = false
      }
      this.forceUpdate()
      
  });

  }

  handleLogout(){
    isAuthenticated = false
    this.forceUpdate();
    this.ref.update({
      isLoggedIn:false     
    })
  }

  render(){
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">  
          
          <Link to={{pathname:'/home', class:"navbar-brand"}}>
            NovaSight
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
                  <Link to={{pathname:'/profile',class:"nav-link"}}>
                    Profile
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
                    Logout
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
          <Redirect to='/dashboard'/>
        }

        <Route path='/home' component={Home}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/sensors' component={Sensors}/>
        <Route path='/login' component={Login}/>
        <Route path='/profile'component={Profile}/>
        <form id={"scanForm"} action={"http://localhost:5000/scan/"} target="hiddenFrame" method={"get"}>
          
        </form>
        <iframe name="hiddenFrame"  style={iFrameStyle}></iframe>
      </Router>
      
    );
  }
}



export default App;


