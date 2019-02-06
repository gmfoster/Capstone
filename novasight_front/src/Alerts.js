import React, { Component } from 'react';
import './Style Sheets/site.min.css'
import './Style Sheets/site.min.css.map'
import './Style Sheets/style.scss'

class Alerts extends React.Component {
    render(){
        return(
            <main role="main" class="container">
                <div class="my-3 p-3 bg-white rounded shadow-sm">
                    <h6 class="border-bottom border-gray pb-2 mb-3">Set Alert Type(s)</h6>
                    <form>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email"></input>
                        </div>
                        <div class="form-group">
                            <label>SMS</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter your SMS number"></input>
                        </div>
                        <h6 class="border-bottom border-gray pb-2 mt-4 mb-3">Set Threshold</h6>
                        <div class="form-group">
                            <label>Severity Match</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Set your severity match"></input>
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
                        <button type="submit" class="btn btn-primary">Save</button>
                    </form>
                </div>
            </main>
        );
    }
}

export default Alerts