
import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Style Sheets/App.css';
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

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">  
      
            <a class="navbar-brand" href="#">Project Bob</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">This Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">That Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">The Other Link</a>
                    </li>
                </ul>
            </div>
      </nav> 

      

      {/* <Route path='/login' component={Login}/> */}
      <Route path='/myinvestigations' component={MyInvestigations}/>
      <Route path='/startinvestigation' component={StartInvestigation}/>
      <Route path='/investigationprogress' component={InvestigationProgress}/>
      <Route path='/investigationresults' component={InvestigationResults}/>


  </Router>
);

export default App;


