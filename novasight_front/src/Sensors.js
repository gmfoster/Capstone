import React, { Component } from 'react';
import Link from './Link';
import './Style Sheets/App.css';
import './Style Sheets/index.css';
import './Style Sheets/StartInvestigation.css';
import { link } from 'fs';
import HaveIBeenPwnd from './HaveIBeenPwnd';
import Redirect from './Redirect' 




const iFrameStyle = {
  width:0,
  height:0,
  border:0,
  display:"none"
};


class Sensors extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sensorName:"",
      sensorKeywords:"",
      sensorType:""
    };

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
    console.log("In side the submit sensor formulat" + sensorForm.submit());
    sensorForm.reset();
    return false;

  }

  render() { 
    return(
      <main role="main" class="container">
        <div class="my-3 p-3 bg-white rounded shadow-sm">
          <h6 class="border-bottom border-gray pb-2 mb-3">Sensors Configuration</h6>
          <div class="mb-3 clearfix">
            <button type="button" class="btn btn-light btn-sm float-left">Enable/Disable All</button>
            <button type="button" class="btn btn-light btn-sm float-right">Create New Rule</button>
          </div>
          <table class="table table-striped table-responsive-md small">
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
          </table>
          <h6 class="border-bottom border-gray pb-2 mt-5 mb-3">New Rule</h6>
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
            <button type="submit"  class="btn btn-primary" >Create</button>
          </form>
        </div>
        <iframe name="hiddenFrame"  style={iFrameStyle}></iframe>
      </main>
    );
  }
}

//  <code>Investigate</code>

  export default Sensors;