
import React, { Component } from 'react';
import Link from './Link';
import './Style Sheets/App.css';
import './Style Sheets/Home.css';
import './Style Sheets/site.min.css';
import './Style Sheets/site.min.css.map';
import './Style Sheets/style.scss';
import './images/a.jpeg';
import './images/b.png'; 
import './images/c.png'; 
import './images/sensor.png'; 
import './images/noti.png'; 
import PropTypes from "prop-types";
import './images/ezgif-3-88d63871ccb9.gif';  
import Sensors from './Sensors'
import Login from './Login'
import Redirect from './Redirect'
import Router from './App.js'
import Route from './App.js'

import createHistory from 'history/createBrowserHistory'; 

let styles = { 
    height: '150px'
}

const iFrameStyle = {
    width:0,
    height:0,
    border:0,
    display:"none"
  };

// const Route = ({ path, component}, {location}) => {
//     const pathname = location.pathname;
//     if (pathname.match(path)) {
//       return (
//         React.createElement(component)
//   );
//   } else {
//       return null;
//     }
//   };
  
//   Route.contextTypes = {
//     location: PropTypes.object,
//   };

class Home extends React.Component { 
    linkBtn() { 

       

    }

    render() { 
        return( 
    <div>
         {/* <div className="jumbotron jumbotron-fluid bg-primary text-light"> */}
             {/* <div className="container"> */}
            {/* <p class="lead text-uppercase">Name, Text & Layout Pending</p> */}
            {/* <h1 className="display-4">Welcome to NovaSight</h1> */}
            {/* <p class="lead">Intelligence relevant to your organization is out there — from compromised credentials, customer data, and payment card information, to new vulnerabilities and exploits. But relying on open source tools or ad hoc approaches to monitor for this information will likely be time-consuming, generate noisy false positives, and miss hard-to-reach sources.</p> */}
            {/* <p className="lead">The real time online security feed and monitoring application.</p>  */}
            
            {/* <button type="submit" onclick="linkBtn()" className="btn" >Get Started</button> */}
          {/* </div>    */}
        {/* </div>  */}
        <div class="grid-container">
            <div>
            <img className="resize" src={require('./images/ezgif-3-88d63871ccb9.gif')}></img>
            </div>
            <div class="inner-grid"> 
                <div><h1 className="display-4">Welcome to NovaSight</h1></div>
                <div><p className="lead">The real time online security feed and monitoring application.</p></div>   
                <div className="getStartedDiv"> 
                    
                    <Link to={{pathname:'/sensors',class:"nav-link"}}>
                    Get Started
                    </Link>
                    
                    {/* <Router>   
                        <Link to={{pathname:'/sensors',class:"nav-link"}}>
                        Get Started
                        </Link>
                        <Route path='/sensors' component={Sensors}/>
                        <form id={"scanForm"} action={"http://localhost:5000/scan/"} target="hiddenFrame" method={"post"}>
                        </form>
                        <iframe name="hiddenFrame"  style={iFrameStyle}></iframe>
                    </Router> */}
                </div>
            </div> 
        </div>
        
        {/*
        ******************* 
            GRID LAYOUT  
        *******************
        */}
        
        <div className="container-fluid">
            <div className="row align-items-center px-3 py-5">
                <div className="col-6">
                    <img className="img-fluid rounded shadow" src={require('./images/noti.png')}></img>
                </div>
                <div className="col-5 mx-auto">
                    <p className="lead text-muted text-uppercase">Brand Monitoring</p>
                    <h1>Get Rapidly Alerted About Risks to Your Brand</h1>
                    <p>Intelligence collected from such a wide array of sources helps you identify risks to potential brand damage or data breaches. Our technology monitors and alerts you in real time to threats like domains registered for typosquatting, malicious twitter hashtags, or fake apps in mobile app stores that could all put your brand at risk.</p>
                </div>
            </div>
        </div>

        <div className="container-fluid">
            <div className="row align-items-center px-3 py-5">
                <div className="col-5 mx-auto">
                    <p className="lead text-muted text-uppercase">Build your sensors</p>
                    <h1>A Sensor on the Widest Breadth of Sources</h1>
                    <p>By configuring our technology to continuously monitor for threat-related references to your brand, industry, or technologies, you’ll have a sensor on the widest breadth of threat data sources, including paste sites and the dark web. Click get started to create your unique sensor.</p>
                </div>
                <div className="col-6">
                    <img className="img-fluid rounded shadow" src={require('./images/sensor.png')}></img>
                </div>
            </div>
        </div>

        <div className="container-fluid">
            <div className="row align-items-center px-3 py-5">
                <div className="col-6">
                    <img className="img-fluid rounded shadow" src={require('./images/noti.png')}></img>
                </div>
                <div className="col-5 mx-auto">
                    <p className="lead text-muted text-uppercase">Brand Monitoring</p>
                    <h1>Cut Through the Noise</h1>
                    <p>Our machine learning and natural language processing can read the language of cyber threats. This moves your monitoring lightyears beyond simple keyword matching to identify relationships between emerging threats and your own brand and infrastructure.</p>
                </div>
            </div>
        </div>

        <div className="container-fluid px-3 py-3">
            <div className="row">
                <form className="form-inline mx-auto" style={styles}>
                    <div className="form-group mr-3">
                        {/* <label htmlFor="businessEmail" className="sr-only">Enter your business email</label> */}
                        {/* <input type="password" className="form-control form-control-lg" id="businessEmail" placeholder="Enter your business email"></input> */}
                    </div>
                    {/* <button type="submit" className="btn btn-primary">Get Started</button> */}
                </form>
            </div>
        </div>


        <div className="jumbotron jumbotron-fluid bg-primary rounded shadow text-light mx-5 mb-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-6">
                        <h1 className="display-4">NovaSight</h1>
                    </div>
                    <div className="col">
                        <a href="#" className="text-reset">About Us</a>
                    </div>
                    <div className="col">
                        <a href="#" className="text-reset">Pricing</a>
                    </div>
                    <div className="col">
                        <a href="#" className="text-reset">Locations</a>
                    </div>
                    <div className="col">
                        <a href="#" className="text-reset">Careers</a>
                    </div>
                </div>
                <hr className="border-light"></hr>
                <p><small>Copyright &copy; Capstone 2019</small></p>
            </div>
        </div>
    </div>
   
  ); }} 

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

        if(this.props.status == "Complete"){
            return (
                <tr>
                    <td>{this.props.id}</td>
                    <td>{this.props.modules}</td>
                    <td>
                        <Link to="investigationresults">
                            <code class='status_link'>
                                {this.props.status}
                            </code>
                        </Link>
                    </td>
                </tr>
              );
        }else {
            return (
                <tr>
                  <td>{this.props.id}</td>
                  <td>{this.props.modules}</td>
                  <td>{this.props.status}</td>
                </tr>
              );
        }
      
    }
  }


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
        modules:"Pastebin-Darknet",
        status:"Complete"
    },{
        id:4,
        modules:"Pastebin",
        status:"Complete"
    }
  ];

  export default Home;