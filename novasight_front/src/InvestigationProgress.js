import React, { Component } from 'react';
import Link from './Link';
import logo from './logo.svg'
import './App.css';

const investigations = {
    investigation:1,
    modules:"HIBP-Pastebin",
    eta:"15 minutes"
}

const InvestigationProgress = () => (
    <div>
        
        


        <div class="centered_div">
            <div class="left_div">
                <label> Investigation #: <label class='white'> {investigations.investigation} </label><br></br></label>
                <label> Modules: <label class='white'> {investigations.modules} </label><br></br></label>
                <label> ETA: <label class='white'> {investigations.eta} </label><br></br></label>
            </div>
            <img className="App-logo" alt="logo"src={logo}></img>
        </div>
    </div>
  );

  export default InvestigationProgress