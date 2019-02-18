import React, { Component } from 'react';
import './Style Sheets/InvestigationResults.css';
import './Style Sheets/App.css';
import './Style Sheets/site.min.css'
import './Style Sheets/site.min.css.map'
import './Style Sheets/style.scss'
import Redirect from './Redirect'

class Login extends React.Component{


    handleClick(e){
        console.log("print")
        return (
            <Redirect to='/dashboard'/>
        );
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
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.handleClick}>
                        Sign in
                    </button>
                    <p className="mt-5 mb-3 text-muted">Copyright &copy; Capstone 2019</p>
                </form>
            </div>
        );
    }
}

  export default Login