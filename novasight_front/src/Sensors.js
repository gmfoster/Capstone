import React, { Component } from 'react';
import Link from './Link';
import './Style Sheets/App.css';
import './Style Sheets/index.css';
import './Style Sheets/StartInvestigation.css';
import { link } from 'fs';
import HaveIBeenPwnd from './HaveIBeenPwnd';





class Sensors extends React.Component {
  handleClick() {
    
    //TODO: REST Api call and User input checker
    console.log("peen2"); 
    return(
      <div> 
      
      < Link to='/investigationprogress'>

          </Link>
        </div>

    );
  }



  render() { 
    console.log("peen1"); 
    return(
    <div class="centered_div_mod">
      <div class="module"> 
      <form>
        
      <h2 > Have I Been Pwned </h2>
              Input Key word:<br></br><br></br>
      <div> <input type="text" name="pwndUserInTxt"></input> <select>
            <option value="email">Email</option>
            <option value="password">Password</option>
            </select> </div><br></br> 
            <input type="reset"></input>
            </form><br></br>
      </div>


       <div class="module">   
      <form>
      <h2> Pastebin </h2>
              Input Key word:<br></br><br></br>
      <input type="text" name="pasteUserInTxt" ></input><br></br><br></br>
      <input type="reset"></input>
    </form><br></br>


      </div>
      
      <div class="module"> 
        
        <form>
        <h2> Dark web Sweep </h2>
                Input Key word:<br></br><br></br>
        <input type="text" name="darkUserInTxt" ></input><br></br><br></br>
        <input type="reset"></input>
      </form><br></br>
  
  
        </div>
     
     
     
      <br></br><br></br>
      <div class="button_link_start">
        <HaveIBeenPwnd />
        <Link to='/investigationprogress'><code class="button_link">Analyze Input</code></Link>
      </div>
      
    

 
      
    </div>
    );
  }
}

//  <code>Investigate</code>

  export default Sensors;