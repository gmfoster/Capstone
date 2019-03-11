import React, { Component } from 'react';
import Link from './Link';
import './Style Sheets/App.css';
import './Style Sheets/index.css';
import './Style Sheets/Sensors.css';
import { link } from 'fs';
import HaveIBeenPwnd from './HaveIBeenPwnd';
import Redirect from './Redirect' 

const iFrameStyle = {
  width:0,
  height:0,
  border:0,
  display:"none"
};

const pStyle= {
  color:"green",
  align:"center"

};

class Sensors extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sensorName:"",
      sensorKeywords:"",
      sensorType:""
    };
    this.submittedForm = false

    this.submitSensor = this.submitSensor.bind(this)
  }

  handleChange = (e) => {
    console.log(e.target.name);
    this.state[e.target.name] = e.target.value;
  }


  submitSensor(e){
    e.preventDefault();
    var sensorForm = document.getElementById("sensorForm");
    
    sensorForm.submit();
    this.submittedForm = true
    //console.log("In side the submit sensor formulat" + sensorForm.submit());
    sensorForm.reset();
    this.forceUpdate()
    return false;


  }

  render() { 
    return(
      <main role="main" class="container">
        <div class="my-3 p-3 rounded_25 my-shadow bg_theme">
          <p  class="form-text black_text "><b>Paste-Sites Suggested Keywords:</b> Account Usernamess, emails, IP addresses, Names </p>
          <p  class="form-text black_text"> <b>Breached Database Suggested Keywords:</b> Emails </p>
          <p  class="form-text black_text"><b>Dark Web Sweep Keywords:</b> Account Usernamess, emails, comapany name, API Keys </p>
          
          {/*<h6 class="border-bottom border-gray pb-2 mb-3">Sensors Configuration</h6>
          <div class="mb-3 clearfix">
            <button type="button" class="btn btn-light btn-sm float-left">Enable/Disable All</button>
            <button type="button" class="btn btn-light btn-sm float-right">Create New Rule</button>
          </div>*/}
          {/*<table class="table table-striped table-responsive-md small">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Rule</th>
                <th scope="col">Source</th>
                <th scope="col">Event Time</th>
                <th scope="col">Search Terms</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" checked="checked"></input>
                </td>
                <td>Manufacturing 1</td>
                <td>Pastebin</td>
                <td>+1d/-1d</td>
                <td>Manufacturing, PetroChina, 3M Company, Transportation, 3D Printing</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" checked="checked"></input>
                </td>
                <td>Manufacturing 2</td>
                <td>Have i been Pwned</td>
                <td>+1d/-1d</td>
                <td>Manufacturing, PetroChina, 3M Company, Transportation, 3D Printing</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" checked="checked"></input>
                </td>
                <td>Manufacturing 3</td>
                <td>Dark Web</td>
                <td>+1d/-1d</td>
                <td>Manufacturing, PetroChina, 3M Company, Transportation, 3D Printing</td>
              </tr>
            </tbody>
          </table>*/}
          </div>
          <div class="my-3 p-3 rounded_25 shadow-sm  bg_complement">

          <h6 class="border-bottom border-gray pb-2 mb-3">Add New Sensor or Change Existing</h6>

          {this.submittedForm &&
            <p  class="form-text " style={pStyle}> We have added your sensor</p>
          }
          <form action={"http://localhost:5000/add/"} method="get" id="sensorForm" target={"hiddenFrame"} onSubmit={this.submitSensor.bind(this)}>
            <div class="form-group">
              <label>Sensor Name</label>
              <input type="text" class="form-control" name="sensorName" placeholder="" onChange={e => this.handleChange(e)}></input>
            {/*</div>
            <div class="form-group">
            */}
              <label>Search Terms</label>
              
              <input type="text" class="form-control" name="sensorKeywords" onChange={e => this.handleChange(e)} placeholder=""></input>
              <small id="passwordHelpBlock"  class="form-text text-muted">
                Enter keywords separated by comma.
              </small>
            {/*</div>*/}
            {/*
            <label>Event Time</label>
            <div class="form-group clearfix">
              <div class="float-sm-left">
                <select class="form-control custom-select">
                  <option selected="selected">-1 day</option>
                  <option>0 days</option>
                  <option>+ 1 day</option>
                </select>
              </div>
              <div class="float-sm-left text-center inline-form-text">&nbsp;&nbsp;to&nbsp;&nbsp;</div>
              <div class="float-sm-left">
                <select class="form-control custom-select">
                  <option>-1 day</option>
                  <option>0 days</option>
                  <option selected="selected">+ 1 day</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Publish Time</label>
              <input type="text" class="form-control" placeholder="Anytime"></input>
            </div>
            */}
            {/*<div class="form-group">*/}
              <label for="exampleFormControlSelect1" >Source Type</label>
              <select class="form-control custom-select " name="sensorType" onChange={e => this.handleChange(e)}>
                <option>Select One</option>
                <option>paste</option>
                <option>pwned</option>
                <option>dark</option>
              </select>
            </div>
            {/* 
            <div class="form-group">
              <label>Source</label>
              <input type="text" class="form-control" placeholder="Any source"></input>
            </div>
            
            <div class="form-group">
              <label>Authors</label>
              <input type="text" class="form-control" placeholder="Any person"></input>
            </div>
            <div class="form-group">
              <label>Geofence</label>
              <input type="text" class="form-control" placeholder="Any Geofencee"></input>
            </div>
            <div class="form-group">
              <label>Source Location</label>
              <input type="text" class="form-control" placeholder="Anywhere"></input>
            </div>
            */}
            <center><button type="submit"  class="btn btn-primary" >Create</button></center>
          </form>
        </div>
        <iframe name="hiddenFrame"  style={iFrameStyle}></iframe>
      </main>
    );
  }
}

//  <code>Investigate</code>

  export default Sensors;