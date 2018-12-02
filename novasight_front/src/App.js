
import React, { Component } from 'react';
import PropTypes from "prop-types";
import logo from './logo.svg';
import './App.css';


import createHistory from 'history/createBrowserHistory'; 
//const history = createHistory();


const INVESTIGATIONS = [
  {
      id:1,
      modules:"HIBP-Pastebin-Darknet",
      status:"Complete"
  },{
      id:2,
      modules:"HIBP",
      status:"Complete"
  },{
      id:3,
      modules:"Pastebin",
      status:"In Progress"
  }  
];

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


class InvestigationList extends React.Component {
  render() {
    
    const investigations = INVESTIGATIONS.map((investigation) => (
      <Investigation
        id={investigation.id}
        modules={investigation.modules}
        status={investigation.status}
      />
    ));

    return (
      <div class="centered_div">
        <table class="investigation_list">
          <tr>
            <th>Investigation</th>
            <th>Modules</th>
            <th>Status</th>
          </tr>
          {investigations}

        </table>
      </div>
      ); 
  }
}


class Investigation extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.modules}</td>
        <td>{this.props.status}</td>
      </tr>
    );
  }
}

const MyInvestigations = () => (
  <div class="centered_div">
    <h2> My Investigations</h2>
    <InvestigationList />
    
    <Link to='startinvestigation'>
      <code>Start Investigation</code>
    </Link>

  </div>
  
     
  
);

const StartInvestigation = () => (
  <div class="centered_div">
    <h2>Start Investigation</h2>
    <button> Investigate </button>
  </div>
);

const Atlantic = () => ( 
  <div>
    <h3>Atlantic Ocean</h3>
    <p>
      The Atlantic Ocean covers approximately 1/5th of the
      surface of the earth.
    </p>
  </div> 
);

const Pacific = () => ( 
  <div>
    <h3>Pacific Ocean</h3>
    <p>
      Ferdinand Magellan, a Portuguese explorer, named the ocean
      'mar pacifico' in 1521, which means peaceful sea. 
    </p>
  </div> 
);


const Link = ({ to, children }, {history}) => (
  <a
    onClick={(e) => {
      e.preventDefault();
      history.push(to);
    }}
    href={to} 
  >
    {children}
  </a>
);

Link.contextTypes = {
  history: PropTypes.object,
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
    <div className='ui text container'>

      <h6 className='ui dividing header'>  NovaSight
      </h6>
      <Link to='/myinvestigations'>
        <code>
          Home
        </code>
      </Link>

      <hr/>

      <Route path='/myinvestigations' component={MyInvestigations}/>
      <Route path='/startinvestigation' component={StartInvestigation}/>

      
    </div>
  </Router>
);

export default App;


