import React, { Component } from 'react';
import Link from './Link';
import './App.css';
import './index.css';
import './StartInvestigation.css';
import { link } from 'fs';


class StartInvestigation extends React.Component {
  handleClick() {
    //TODO: REST Api call and User input checker
    return(
      <Link to='/investigationprogress'>

          </Link>

    );
  }

  render() { 
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
        <h2> Dark web sweep </h2>
                Input Key word:<br></br><br></br>
        <input type="text" name="darkUserInTxt" value=""></input><br></br><br></br>
        <input type="reset"></input>
      </form><br></br>
  
  
        </div>
     
     
     
      <h2>Start Investigation</h2>
      <button>
      <Link to='/investigationprogress'><code>   Investigate   </code></Link>
      </button>
      
    </div>
    );
  }
}

//  <code>Investigate</code>

  export default StartInvestigation;