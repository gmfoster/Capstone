import React, { Component } from 'react';

class HaveIBeenPwnd extends React.Component {
    
    constructor(){
        console.log("constructor"); 
        super();
    };

    componentDidMount() {
        console.log("fetch"); 
        fetch('https://picsum.photos/list')
        .then(results => {
           
            console.log(results.json());
            //eturn results.json();
        }).then(data => {
            
        })
    }

    render(){
        return (
            <div>
            </div>
        )
    }
}






export default HaveIBeenPwnd;