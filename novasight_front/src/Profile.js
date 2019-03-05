import React, { Component } from 'react';
import './Style Sheets/site.min.css'
import './Style Sheets/site.min.css.map'
import './Style Sheets/style.scss'
import { format } from 'url';


    const pStyle= {
    color:"green",
    align:"center"
  
  };

  const iFrameStyle = {
    width:0,
    height:0,
    border:0,
    display:"none"
  };

class Profile extends React.Component {
    constructor(props){
        super(props)
        this.submittedForm = false
    }


    handler(){
        var name = document.getElementById("name");
        var email = document.getElementById("email");
        var phone = document.getElementById("phone");
        var frequency = document.getElementById("frequency")
        this.submittedForm = true
        var profileForm = document.getElementById("profileForm")
        profileForm.reset()
        this.forceUpdate()
        
        

    }

    render(){
        return(
            <main role="main" class="container">
                
                <form action="#" target={"hiddenFrame"} id="profileForm">
                <div class="my-3 p-3 bg_complement rounded_25 shadow-sm">
                    <h6 class="border-bottom border-gray pb-2 mb-3">Profile Information</h6>
                    {this.submittedForm &&
                        <p  class="form-text " style={pStyle}> Notification infomation has been saved and activated</p>
                    }
                    <div class="form-group">
                        <label>Name</label>
                        <input type="name" class="form-control" id="name" placeholder="Omer Cohen"></input>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" id="email" placeholder="omer@gmail.com"></input>
                    </div>
                    <div class="form-group">
                        <label>SMS</label>
                        <input type="text" class="form-control" id="phone" placeholder="619-991-9097"></input>
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

                    <center><button onClick={this.handler.bind(this)}  class="btn btn-primary" >Save</button></center>

                </div>
                </form>
                <iframe name="hiddenFrame"  style={iFrameStyle}></iframe>
            </main>
        );
    }
}
//class="btn btn-primary"

export default Profile