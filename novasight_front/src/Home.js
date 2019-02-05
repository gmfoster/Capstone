
import React, { Component } from 'react';
import Link from './Link';
import './Style Sheets/App.css';
import './Style Sheets/MyInvestigation.css';
import './Style Sheets/site.min.css';
import './Style Sheets/site.min.css.map';
import './Style Sheets/style.scss';
import './images/a.png';
import './images/b.png'; 
import './images/c.png';  


let styles = { 
    height: '150px'
}

const Home = () => (
    <div>
        <div className="jumbotron jumbotron-fluid bg-primary text-light">
            <div className="container">
            {/* <p class="lead text-uppercase">Name, Text & Layout Pending</p> */}
            <h1 className="display-4">Welcome to Novasight</h1>
            {/* <p class="lead">Intelligence relevant to your organization is out there — from compromised credentials, customer data, and payment card information, to new vulnerabilities and exploits. But relying on open source tools or ad hoc approaches to monitor for this information will likely be time-consuming, generate noisy false positives, and miss hard-to-reach sources.</p> */}
            <p className="lead">The real time online security feed and monitoring application.</p> 
            
            </div>
        </div>

        <div className="container-fluid">
            <div className="row align-items-center px-3 py-5">
                <div className="col-6">
                    <img className="img-fluid rounded shadow" src={require('./images/a.png')}></img>
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
                    <p className="lead text-muted text-uppercase">Brand Monitoring</p>
                    <h1>A Sensor on the Widest Breadth of Sources</h1>
                    <p>By configuring our technology to continuously monitor for threat-related references to your brand, industry, or technologies, you’ll have a sensor on the widest breadth of threat data sources, including paste sites and the dark web.</p>
                </div>
                <div className="col-6">
                    <img className="img-fluid rounded shadow" src={require('./images/b.png')}></img>
                </div>
            </div>
        </div>

        <div className="container-fluid">
            <div className="row align-items-center px-3 py-5">
                <div className="col-6">
                    <img className="img-fluid rounded shadow" src={require('./images/c.png')}></img>
                </div>
                <div className="col-5 mx-auto">
                    <p className="lead text-muted text-uppercase">Brand Monitoring</p>
                    <h1>Cut Through the Noise</h1>
                    <p>Our machine learning and natural language processing can read the language of cyber threats. This moves your monitoring lightyears beyond simple keyword matching to identify relationships between emerging threats and your own brand and infrastructure.</p>
                </div>
            </div>
        </div>

        <div className="container-fluid px-3 py-5">
            <div className="row">
                <form className="form-inline mx-auto" style={styles}>
                    <div className="form-group mr-3">
                        <label htmlFor="businessEmail" className="sr-only">Enter your business email</label>
                        <input type="password" className="form-control form-control-lg" id="businessEmail" placeholder="Enter your business email"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Get Started</button>
                </form>
            </div>
        </div>


        <div className="jumbotron jumbotron-fluid bg-primary rounded shadow text-light mx-5 mb-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-6">
                        <h1 className="display-4">Novasight</h1>
                    </div>
                    <div className="col">
                        <a href="#" className="text-reset">About Us</a>
                    </div>
                    <div className="col">
                        <a href="#" className="text-reset">That Link</a>
                    </div>
                    <div className="col">
                        <a href="#" className="text-reset">The Other Link</a>
                    </div>
                </div>
                <hr className="border-light"></hr>
                <p><small>Copyright &copy; Capstone 2019</small></p>
            </div>
        </div>
    </div>
   
  );

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