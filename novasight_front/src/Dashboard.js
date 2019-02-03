import React, { Component } from 'react';

import './Style Sheets/site.min.css'
import './Style Sheets/site.min.css.map'
import './Style Sheets/style.scss'
import firebase from './firebase.js';


var isPastebin = true;
var isHaveIBeenPwnd = false;




var pasteSensors = [
    {
        key:"379ef4bd50c30e261ccfb18dfc626d9f",
        string:"umail.ucsb.edu"
    },{
        key:"6ad75c3aae78269d8527095cbbcade29",
        string:"derp"
    },{
        key:"c51cce226d131f8f263bd9561fcbe47a",
        string:"graham"
    }
]

var pwnedSensors = [
    {
        key:"cd861398247c70cc3d807cf7a978e976",
        string:"gfoster831@gmail.com"
    },
    {
        key:"64cbb14ec41478b5d9cdff67ee8320e0",
        string:"gmfoster@umail.ucsb.edu"
    }
];


class PastebinTable extends React.Component {
    constructor(){
        super();
        this.pasteList = [];

    }

    componentDidMount(){
        const itemsRef = firebase.database().ref('paste_search');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            
            var data = items[this.props.sensorKey]
            if(data == undefined){
                this.pasteList = <PastebinEntry
                    Key={this.props.sensorKey}
                    Description={"No data found for keyword" + this.props.sensorString}
                />
            }else{
                this.pasteList = Object.entries(data).map(([key,val])=>(
                    <PastebinEntry
                    key={key}
                    Date={1}
                    Link={"http://pastebin.com/" + key}
                    Preview={"Route, like everything else in React Router, is a component. The supplied path prop is matched against the browser’s location. If it matches, Route will return the component. If not, Route will return null, rendering nothing"}
                    />
                ));
            }
            this.forceUpdate()
            
        });
    }

    render(){
        return (
            <div class="my-3 p-3 bg-white rounded shadow-sm">
                <h6 class="border-bottom border-gray pb-2 mb-0">{this.props.sensorString}</h6>
                <table class="table table-responsive small">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Link</th>
                            <th scope="col">Preview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.pasteList}
                    </tbody>
                </table>
            </div>
        );

    }

}

class PastebinEntry extends React.Component{
    render(){
        return(
            <tr>
                <th scope="row">{this.props.Date}</th>
                <td>{this.props.Link}</td>
                <td>{this.props.Preview}</td>
            </tr>    
        );
    }
}



class HaveIBeenPwndTable extends React.Component{
    constructor(){
        super();
        this.pwndList = [];
    }

    componentDidMount(){
        var PWND_LIST = {};
        
        const itemsRef = firebase.database().ref('pwned_search');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            
            PWND_LIST = items[this.props.sensorKey]

            if (PWND_LIST["404"] != undefined){
                this.pwndList = <HaveIBeenPwndEntry
                    Key={this.props.sensorString}
                    Description={PWND_LIST["404"]}
                />
            }else{
                console.log("Not undefined")
                this.pwndList = PWND_LIST.map((entry)=>(
                    <HaveIBeenPwndEntry
                        key={entry.Description}
                        BreachDate={entry.BreachDate}
                        Domain={entry.Domain}
                        Name={entry.Name}
                        Description={entry.Description}
                    />
                ));
            }
            this.forceUpdate()
            

        });
    }
    
    render(){
        return (
            <div class="my-3 p-3 bg-white rounded shadow-sm">
                <h6 class="border-bottom border-gray pb-2 mb-0">{this.props.sensorString}</h6>
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
                        {this.pwndList}
                    </tbody>
                </table>
            </div>
        ); 
    }
    
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
        var SENSORS = [];

        if(isPastebin){
            SENSORS = pasteSensors.map((sensor)=>(
                <PastebinTable
                key={sensor.key}
                sensorKey={sensor.key}
                sensorString={sensor.string}
                />
            ));
        }

        if(isHaveIBeenPwnd){
            SENSORS = pwnedSensors.map((sensor)=>(
                <HaveIBeenPwndTable
                key={sensor.key}
                sensorKey={sensor.key}
                sensorString={sensor.string}
                />
                
            ));
        }


        

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
                    {SENSORS}
                    
                </main>
            </div>
        );
    }
}



  export default Dashboard