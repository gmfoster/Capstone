
import React, { Component } from 'react';
import PropTypes from "prop-types";
import './App.css';
import MyInvestigations from './MyInvestigations';
import Link from './Link';
import StartInvestigation from './StartInvestigation';
import InvestigationProgress from './InvestigationProgress'


import createHistory from 'history/createBrowserHistory'; 
import InvestigationResults from './InvestigationResults';




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
      <Route path='/investigationprogress' component={InvestigationProgress}/>
      <Route path='/investigationresults' component={InvestigationResults}/>

      
    </div>
  </Router>
);

export default App;


