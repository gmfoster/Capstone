import React, { Component } from 'react';
import Link from './Link';
import './App.css';




const MyInvestigations = () => (
    <div>
        <div class="centered_div">
            <h2> My Investigations</h2>
            <InvestigationList />
        </div>
        <div class="padded" >
            <Link to='startinvestigation'>
                <code>Start Investigation</code>
            </Link>
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
                            <code>
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
        modules:"Pastebin",
        status:"In Progress"
    }  
  ];

  export default MyInvestigations;