import React, { Component } from 'react';
import Link from './Link';
import logo from './logo.svg'
import './App.css';
import './InvestigationProgress.css'

const investigations = {
    investigation:5,
    modules:"HIBP-Pastebin",
    eta:"30 minutes"
}


class InvestigationProgress extends React.Component {

     update() {
        var text = "";
        console.log("omer");
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        console.log(text);
        return text;
    }

    render() { 
        return(
            <div>
                <div class='centered_div_2'>
                    <img className="App-logo" alt="logo"src={logo}></img>
                    <div class="tab">  
                        <h1 class ="prog">Analysis in progress... </h1>
                        <label> Investigation #: <label class='nova_label'> {investigations.investigation} </label><br></br></label>
                        <label> Modules: <label class='nova_label'> {investigations.modules} </label><br></br></label>
                        <label> ETA: <label class='nova_label'> {investigations.eta} </label><br></br></label>
                        {/* <label> Data: <label class='nova_label'> {this.update} </label><br></br></label> */}
                    </div>
                </div>
            </div>
        );
    }
}

  export default InvestigationProgress