import React, { Component } from 'react';
import './Style Sheets/site.min.css'
import './Style Sheets/site.min.css.map'
import './Style Sheets/style.scss'

class Profile extends React.Component {

    handler(){
        var name = document.getElementById("name");
        var email = document.getElementById("email");
        var phone = document.getElementById("phone");
        var frequency = document.getElementById("frequency")
        console.log(name.value, email.value, phone.value, frequency.value);

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
                        <label>Priority</label>
                        <select class="custom-select" id = "frequency">
                            <option selected>Set Severity</option>
                            <option value="15">Low</option>
                            <option value="5">Medium</option>
                            <option value="1">High</option>
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