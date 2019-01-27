import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Style Sheets/App.css';

const Link = ({ to, children }, {history}) => (
    <a  class='undecorated'
      onClick={(e) => {
        e.preventDefault();
        history.push(to);
      }}
      href={to} 
    >
      {children}
    </a>
  );
  
  Link.contextTypes = {
    history: PropTypes.object,
  };

  export default Link