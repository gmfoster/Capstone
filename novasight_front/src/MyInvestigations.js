import React, { Component } from 'react';
import Link from './Link';
import './Style Sheets/App.css';
import './Style Sheets/MyInvestigation.css';
import './Style Sheets/site.min.css'
import './Style Sheets/site.min.css.map'
import './Style Sheets/style.scss'

let styles = { 
    height: '150px'
}

const MyInvestigations = () => (
    <div>
        
        <html lang="en">
        {/* <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="stylesheets/site.min.css">

        <title>Welcome to Project Bob</title>
        </head> */}

        <body class="pt-0 mb-5">
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

        <div class="jumbotron jumbotron-fluid bg-primary text-light">
            <div class="container">
            <p class="lead text-uppercase">Name, Text & Layout Pending</p>
            <h1 class="display-4">Welcome to Project Bob!</h1>
            <p class="lead">Intelligence relevant to your organization is out there — from compromised credentials, customer data, and payment card information, to new vulnerabilities and exploits. But relying on open source tools or ad hoc approaches to monitor for this information will likely be time-consuming, generate noisy false positives, and miss hard-to-reach sources.</p>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row align-items-center px-3 py-5">
                <div class="col-6">
                    <img class="img-fluid rounded shadow" src="images/a.png"></img>
              
                <div class="col-5 mx-auto">
                    <p class="lead text-muted text-uppercase">Brand Monitoring</p>
                    <h1>Get Rapidly Alerted About Risks to Your Brand</h1>
                    <p>Intelligence collected from such a wide array of sources helps you identify risks to potential brand damage or data breaches. Our technology monitors and alerts you in real time to threats like domains registered for typosquatting, malicious twitter hashtags, or fake apps in mobile app stores that could all put your brand at risk.</p>
                </div>
            </div>
        </div>
 
        <div class="container-fluid">
            <div class="row align-items-center px-3 py-5">
                <div class="col-5 mx-auto">
                    <p class="lead text-muted text-uppercase">Brand Monitoring</p>
                    <h1>A Sens or on the Widest Breadth of Sources</h1>
                    <p>By configuring our technology to continuously monitor for threat-related references to your brand, industry, or technologies, you’ll have a sensor on the widest breadth of threat data sources, including paste sites and the dark web.</p>
                </div>
                <div class="col-6">
                    <img class="img-fluid rounded shadow" src="images/b.png"></img>
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row align-items-center px-3 py-5">
                <div class="col-6">
                    <img class="img-fluid rounded shadow" src="images/c.png"></img>
                </div>
                <div class="col-5 mx-auto">
                    <p class="lead text-muted text-uppercase">Brand Monitoring</p>
                    <h1>Cut Through the Noise</h1>
                    <p>Our machine learning and natural language processing can read the language of cyber threats. This moves your monitoring lightyears beyond simple keyword matching to identify relationships between emerging threats and your own brand and infrastructure.</p>
                </div>
            </div>
        </div>

        <div class="container-fluid px-3 py-5">
            <div class="row">
                <form class="form-inline mx-auto" style={styles}>
                    <div class="form-group mr-3">
                        <label for="businessEmail" class="sr-only">Enter your business email</label>
                        <input type="password" class="form-control form-control-lg" id="businessEmail" placeholder="Enter your business email"></input>
                    </div>
                    <button type="submit" class="btn btn-primary">Get Started</button>
                </form>
            </div>
        </div>


        <div class="jumbotron jumbotron-fluid bg-primary rounded shadow text-light mx-5 mb-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-6">
                        <h1 class="display-4">Project Bob</h1>
                    </div>
                    <div class="col">
                        <a href="#" class="text-reset">This Link</a>
                    </div>
                    <div class="col">
                        <a href="#" class="text-reset">That Link</a>
                    </div>
                    <div class="col">
                        <a href="#" class="text-reset">The Other Link</a>
                    </div>
                </div> 
                <hr class="border-light"></hr>
                <p><small>Copyright &copy; Capstone 2019</small></p>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
        <script src="js/bootstrap.min.js"></script>
        </div>
        </body>
     </html>
        
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

  export default MyInvestigations;