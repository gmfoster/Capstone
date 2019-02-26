import React, { Component } from 'react';
import './Style Sheets/InvestigationResults.css';
import './Style Sheets/App.css';
import './Style Sheets/site.min.css'
import './Style Sheets/site.min.css.map'
import './Style Sheets/style.scss'
import Redirect from './Redirect'
import firebase from './firebase.js';
import './Style Sheets/login.css';

class Login extends React.Component{

    constructor(){
        super()
        this.ref = firebase.database().ref('users')

    }
    handleClick(e){
       
        this.ref.update({
            isLoggedIn:true     
        })
    }

    componentWillUnmount(){
        this.ref.off()
    }
    //class="btn btn-lg btn-primary btn-block" type="submit"

    render(){
        return (
            <div>
                <form className="form-signin">
                    <h1 className="display-4 text-primary">Nova Sight</h1>
                    <h6 className="mb-3 font-weight-normal">Please sign in</h6>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
                    <label htmlFor="inputPassword" clasclassNames="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                    

                    <div className="checkbox mb-3">
                        <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                        <div className="outerDivCreateAccount">
                            <div className="createAccount">
                                <a href="#" className="nav-link">First timer? Create new account</a> 
                            </div> 
                        </div>  
                    </div>

                    

                    <button className="btn btn-lg btn-primary btn-block" onClick={this.handleClick.bind(this)}>
                        Sign in
                    </button>
                    <p className="mt-5 mb-3 text-muted">Copyright &copy; Capstone 2019</p>
                </form>
            </div>
        );
    }
}

  export default Login