import React, { Component } from 'react';

import './Style Sheets/site.min.css'
import './Style Sheets/site.min.css.map'
import './Style Sheets/style.scss'
import './Style Sheets/Dashboard.css'
import firebase from './firebase.js';



import ReactChartkick, { LineChart, AreaChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

var isPastebin = false;
var isHaveIBeenPwnd = true;



var bubbleSensors =[
    {
        name:"bUUUUUUUUU",
        key:"FDAF;ADF"
    },
    {
        name:"LLLLLLLLL",
        key:"FADF;OAD"
    }
]

var lineChartData = {
    "2019-01-01":10,
    "2019-01-02":20,
    "2019-01-03":13,
    "2019-01-04":15,
    "2019-01-05":2,
    "2019-01-06":50,
    "2019-01-07":10,
    "2019-01-08":20,
    "2019-01-09":13,
    "2019-01-10":15,
    "2019-01-11":2,
    "2019-01-12":50,
    "2019-01-13":10,
    "2019-01-14":20,
    "2019-01-15":13,
    "2019-01-16":15,
    "2019-01-17":2,
    "2019-01-18":50,
    "2019-01-19":10,
    "2019-01-20":20,
    "2019-01-21":13,
    "2019-01-22":15,
    "2019-01-23":2,
    "2019-01-24":50
}

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
    },{
        key:"65dc726e67621fcca86b0c92a0700710",
        string:"grahamimportantstuff96@gmail.com"
    },{
        key:"f4fad95f5b58463cd24ca59e35513874",
        string:"grahammfoster96@gmail.com"
    }
];


class PastebinTable extends React.Component {
    constructor(){
        super();
        this.pasteList = [];
        this.ref = firebase.database().ref('paste_search');
        this.number = 0;

    }

    componentDidMount(){
        this.ref.on('value', (snapshot) => {
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

    componentWillUnmount(){
        this.ref.off();
    }

    render(){
        return (
            <div className="my-3 p-3 bg-white rounded shadow-sm">
                <h6 className="border-bottom border-gray pb-2 mb-0">{this.props.sensorString}</h6>
                <table className="table table-responsive small">
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
                <td><a href={this.props.Link}>{this.props.Link}</a></td>
                <td>{this.props.Preview}</td>
            </tr>    
        );
    }
}



class HaveIBeenPwndTable extends React.Component{
    constructor(){
        super();
        this.pwndList = [];
        this.ref = firebase.database().ref('pwned_search');
        this.noData = false;
        this.number = 0;
    }

    componentDidMount(){
        var PWND_LIST = {};
        
        
        this.ref.on('value', (snapshot) => {
            let items = snapshot.val();
            
            PWND_LIST = items[this.props.sensorKey]

            if (PWND_LIST["404"] != undefined){
                this.noData = true;
                this.pwndList = <HaveIBeenPwndEntry
                    Key={this.props.sensorString}
                    Description={"<font size='3' color='green'>" + PWND_LIST["404"] + "</font>"}
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

    componentWillUnmount(){
        this.ref.off();
    }
    
    render(){
        return (
            <div className="my-3 p-3 bg-white rounded shadow-sm">
                <h6 className="border-bottom border-gray pb-2 mb-0">{this.props.sensorString}</h6>
                <table className="table table-responsive small">
                    <thead>
                        <tr>
                            {!this.noData &&
                                <th scope="col">Breach Date</th>
                            }
                            {!this.noData &&
                                <th scope="col">Domain</th>
                            }
                            {!this.noData &&
                                <th scope="col">Name</th>
                            }
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
                <td dangerouslySetInnerHTML={{__html: this.props.Description}}></td>
            </tr>    
        );
        
    }
}


class Bubble extends React.Component{
    render(){
        return(
            <div class="round-button">
                <div class="round-button-circle">
                    <a href="http://example.com" class="round-button">{this.props.name}</a>
                </div>
            </div>
        )
    }
}

class BubbleSensor extends React.Component { 
    constructor(){
        super();
        this.list = [];
    }

    render() { 
        this.list = bubbleSensors.map((sensor)=>(
            <Bubble
            name={sensor.name}
            key={sensor.key}
            />
        ));

        return (
            <div class="container-outer">
                        <div class="container-inner">
                      
                            <div class="wrapper">
                                {this.list}
                            </div>
                        </div>
                    </div>


            
        ); 
    }
}

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
                {/* <div className="nav-scroller bg-white shadow-sm">
                    <nav className="nav nav-underline">
                        <a className="nav-link active" href="#">This Link</a>
                        <a className="nav-link active" href="#">That Link</a>
                        <a className="nav-link active" href="#">The Other Link</a>
                    </nav>
                </div> */}
                <main role="main" className="container">
                    <BubbleSensor/>
                </main> 

                <main role="main" className="container">
                    <AreaChart title="Paste Dump" colors={["#007bff", "#666"]} data={lineChartData} xtitle="Time (days)" ytitle="Pastes"/>
                </main>

                <main role="main" className="container">
                    {SENSORS}
                </main>
                
            </div>
            
        );
    }
}



  export default Dashboard