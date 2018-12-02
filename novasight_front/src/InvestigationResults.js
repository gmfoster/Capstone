import React, { Component } from 'react';
import adobe from './images/adobe.png'

const invesitgationInfo = {
    userInitated: "Fernando",
    number:1,
    duration: "15 mins",
    riskFactor:"2/10"
};

const InvestigationResults = () => (
    <div>
        <h2 >Investigation Results</h2>

        <div >
            <label> User Intiated: <label> {invesitgationInfo.userInitated} </label></label><br/>
            <label> Investigation #: <label>{invesitgationInfo.number}</label></label><br/>
            <label>Investigation Duration: <label> {invesitgationInfo.duration} </label></label><br/>
            <label>Risk Factor:<label> {invesitgationInfo.riskFactor}</label></label>
        </div>

        <ResultsList/>
    </div>
);

class HaveIBeenPwnedResults extends React.Component{

    render(){
        return(
            <div>
                <h3 class='results'>Have I Been Pwned Results</h3>
                <hr/>
                <div class='results_hibpr_row'>
                    <div class='results_hibpr_column'>
                        <img src={adobe}></img>
                    </div>
                    <div class='results_hibpr_columnr'>
                        <p>
                        Adobe: In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text. The password cryptography was poorly done and many were quickly resolved back to plain text. The unencrypted hints also disclosed much about the passwords adding further to the risk that hundreds of millions of Adobe customers already faced.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

class PastebinResults extends React.Component{
    render(){
        return(
            <div>
                <h3 class='results'>Pastebin Results</h3>
                <hr/>
                
            </div>
        );
    }
}

class DarknetResults extends React.Component{
    render(){
        return (
            <div>
                <h3 class='results'>Darknet Results</h3>
                <hr/>
            </div>
        );
    }
}

class ResultsList extends React.Component {
    render() {
        return (
            <div class='centered_div'>
                <HaveIBeenPwnedResults/>
                <PastebinResults/>
                <DarknetResults/>

            </div>
        ); 
    }
}



  export default InvestigationResults