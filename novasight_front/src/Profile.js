import React, { Component } from 'react';
import './Style Sheets/site.min.css'
import './Style Sheets/site.min.css.map'
import './Style Sheets/style.scss'

class Profile extends React.Component {

    handler(){
        var name = document.getElementById("name");
        var email = document.getElementById("email");
        var phone = document.getElementById("phone");
        console.log(name.value, email.value, phone.value);

    }

    render(){
        return(
            <main role="main" class="container">
                <div class="my-3 p-3 bg-white rounded shadow-sm">
                    <h6 class="border-bottom border-gray pb-2 mb-3">Profile Information</h6>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="name" class="form-control" id="name" placeholder="Enter name"></input>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" id="email" placeholder="Enter email"></input>
                    </div>
                    <div class="form-group">
                        <label>SMS</label>
                        <input type="text" class="form-control" id="phone" placeholder="Enter your SMS number"></input>
                    </div>
                    <h6 class="border-bottom border-gray pb-2 mt-4 mb-3">Set Threshold</h6>
                    <div class="form-group">
                        <label>Severity Match</label>
                        <select class="custom-select">
                            <option selected>Set Severity</option>
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Alert Frequency</label>
                        <select class="custom-select">
                            <option selected>Set Alert Frequency</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            </select>
                    </div>
                    <button onClick={this.handler}  class="btn btn-primary" >Save</button>
                </div>
            </main>
        );
    }
}
//class="btn btn-primary"

export default Profile