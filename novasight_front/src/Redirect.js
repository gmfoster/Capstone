import React, { Component } from 'react';
import PropTypes from "prop-types";
//import createHistory from 'history/createBrowserHistory';

class Redirect extends React.Component {
    static contextTypes = {
      history: PropTypes.object,
    }
    
    componentDidMount() {
      const history = this.context.history;
      const to = this.props.to;
      history.push(to);
    }

    render() {
      return null;
    } 
}


export default Redirect;