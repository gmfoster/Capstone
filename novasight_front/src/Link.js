import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Style Sheets/App.css';
import './Style Sheets/index.css'

const Link = ({ to, children }, {history}) => (

    <a  class={to.class}
      onClick={(e) => {
        e.preventDefault();
        history.push({
          pathname:to.pathname,
          data:to.data
        });
      }}
      href={to.pathname} 
    >
      {children}
    </a>
  );
  
  Link.contextTypes = {
    history: PropTypes.object,
  };

  export default Link