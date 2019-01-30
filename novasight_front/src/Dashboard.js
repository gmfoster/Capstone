import React, { Component } from 'react';

import './Style Sheets/site.min.css'
import './Style Sheets/site.min.css.map'
import './Style Sheets/style.scss'
import firebase from './firebase.js';


const investigations = {
    investigation:5,
    modules:"HIBP-Pastebin",
    eta:"30 minutes"
}


const THREATS = [{
    date: "1/24/2019",
    type: "Manufacturing",
    involving:"Leaked credentials",
    description: "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."

},{
    date: "1/25/2019",
    type: "Manufacturing",
    involving:"Leaked credentials",
    description: "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
}]


let styles = { 
    height: '150px'
}

var HAVE_I_BEEN_PWNED_DATA = {
    Key:"",
    BreachData:"1/24/2019",
    Description:"",
    Domain:"",
    isSensitive:"",
    logoPath:"",
    Name:"",
    PwnCount:""
}

class HaveIBeenPwndEntry extends React.Component{
    render(){
        return(
            <tr>
                <th scope="row">{this.props.BreachDate}</th>
                <td>{this.props.Domain}</td>
                <td>{this.props.Name}</td>
                <td>{this.props.Description}</td>
            </tr>    
        );
        
    }
}

var pwndList;

class HaveIBeenPwndTable extends React.Component{
   
    componentDidMount(){
        var PWND_LIST = {};
        
        const itemsRef = firebase.database().ref('pwned_search');
            itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            
            PWND_LIST = items["cd861398247c70cc3d807cf7a978e976"]
            
            console.log(PWND_LIST)
            
            pwndList = PWND_LIST.map((entry)=>(
                console.log(entry.Name),


                <HaveIBeenPwndEntry
                    Key={entry.Name}
                    BreachDate={entry.BreachDate}
                    Domain={entry.Domain}
                    Name={entry.Name}
                    Description={entry.Description}
                />
                

            ));
            this.forceUpdate()
            

        });
    }
    
    render(){
        return (
            <div class="my-3 p-3 bg-white rounded shadow-sm">
                <h6 class="border-bottom border-gray pb-2 mb-0">Have I Been Pwned</h6>
                <table class="table table-responsive small">
                    <thead>
                        <tr>
                            <th scope="col">Breach Date</th>
                            <th scope="col">Domain</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pwndList}
                        
                    </tbody>
                </table>
            </div>
            
        ); 
    }
    
}
/*
class DashboardList extends React.Component {
    render() {

      const threatList = THREATS.map((threatEntry) =>(
            <DashboardEntry
                key={threatEntry.date+threatEntry.description}
                date={threatEntry.date}
                type={threatEntry.type}
                involving={threatEntry.involving}
                description={threatEntry.description}
            />
      ));
  
      return (
        <div class="my-3 p-3 bg-white rounded shadow-sm">
            <h6 class="border-bottom border-gray pb-2 mb-0">Threats</h6>
            <table class="table table-responsive small">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Type</th>
                        <th scope="col">Involving</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {threatList}
                </tbody>
            </table>
        </div>
        
        ); 
    }
  }

  class DashboardEntry extends React.Component {
    render() {

        return (
            <tr>
                <th scope="row">{this.props.date}</th>
                <td>{this.props.type}</td>
                <td>{this.props.involving}</td>
                <td>{this.props.description}</td>
            </tr>
        );
    }
  }


update() {
        var text = "";
        console.log("omer");
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        console.log(text);
        return text;
    }
    
    
    
    render() { 
        return(
            <div>
                <div class='centered_div_2'>
                    <img className="App-logo" alt="logo"src={logo}></img>
                    <div class="tab">  
                        <h1 class ="prog">Analysis in progress... </h1>
                        <label> Investigation #: <label class='nova_label'> {investigations.investigation} </label><br></br></label>
                        <label> Modules: <label class='nova_label'> {investigations.modules} </label><br></br></label>
                        <label> ETA: <label class='nova_label'> {investigations.eta} </label><br></br></label>
                        <label> Data: <label class='nova_label'> {this.update} </label><br></br></label> 
                        </div>
                        </div>
                    </div>
                );
            }

*/


class Dashboard extends React.Component {
    render(){
        return (
            <div>
                <div class="nav-scroller bg-white shadow-sm">
                    <nav class="nav nav-underline">
                        <a class="nav-link active" href="#">This Link</a>
                        <a class="nav-link active" href="#">That Link</a>
                        <a class="nav-link active" href="#">The Other Link</a>
                    </nav>
            </div>

                <main role="main" class="container">
                    <HaveIBeenPwndTable/>
                </main>
            </div>
        );
    }

    componentDidMount(){
        const itemsRef = firebase.database().ref('pwned_search');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            console.log(items)
            
          });
    }
}



  export default Dashboard