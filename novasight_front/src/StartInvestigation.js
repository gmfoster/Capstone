import React, { Component } from 'react';
import Link from './Link';



const StartInvestigation = () => (
    <div class="centered_div">
      <h2>Start Investigation</h2>
      <Link to='/investigationprogress'>
            <code>Investigate</code>
      </Link>
    </div>
  );


  export default StartInvestigation;