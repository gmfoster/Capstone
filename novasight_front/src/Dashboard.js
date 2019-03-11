import React, { Component } from 'react';
import './Style Sheets/site.min.css'
import './Style Sheets/site.min.css.map'
import './Style Sheets/style.scss'
import './Style Sheets/Dashboard.css'
import firebase from './firebase.js';
import ReactChartkick, { LineChart, AreaChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

var isPastebin = true;
var isHaveIBeenPwnd = false;

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

var currentID = ""

var sensorsIndexMap = [{
    "name":0
}]

var allSensors = []



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

var currentPasteSensors = undefined

var currentPwnedSensors = undefined


var currentDarkSensors=[]

var pwnedPicStyle = {
    width:"75px",
    height:"75px",
    "object-fit":"contain"
}

class DarkWebTable extends React.Component{
    constructor(props){
        super(props)
        this.darkList = []
        this.foundData = false
        this.ref = firebase.database().ref('dark_search');
    }


    componentDidMount(){
        this.ref.on('value',(snapshot) =>{
            let items = snapshot.val();
            var data = items[this.props.sensorKey]

            

            if (data == undefined){
                this.foundData = false
                this.darkList = <DarkwebEntry
                    key={this.props.sensorKey}
                    foundData={false}
                />
            }else{
                this.foundData = true
                this.darkList = Object.entries(data).map(([key,val]) =>(
                    <DarkwebEntry
                    key={key}
                    title={val["title"]}
                    link={val["link"]}
                    foundData={true}
                    />
                ));
            }
            this.forceUpdate();
        })
    }
    render(){
        return(
            <div className="my-3 p-3 rounded_25 shadow-sm bg_complement" >
                <h6 className="border-bottom border-gray pb-2 mb-0">{this.props.sensorString}</h6>
                <table className="table table-responsive small">
                    <thead>
                        <tr>
                            {this.foundData &&
                                <th scope="col">Title</th>
                            }
                            {this.foundData &&
                                <th scope="col">Link</th>
                            }
                            {!this.foundData &&
                                <th scope="col">Description</th>
                            }
                            
                            
                            {/*<th scope="col">Preview</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                        {this.darkList}
                    </tbody>
                </table>
            </div>
        )  
    }
}


class DarkwebEntry extends React.Component{
    render(){
        
        return(
            <tr>
                {this.props.foundData &&
                    <td scope="row">{this.props.title}</td>
                }
                {this.props.foundData &&
                    <td scope="row">{this.props.link}</td>
                }
                {!this.props.foundData &&
                    <td scope="row">No data found for this keyword</td>
                }
                
            </tr>    
        );
    }
}


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
                //.slice(0,5)
                this.pasteList = Object.entries(data).map(([key,val])=>(
                    <PastebinEntry
                    key={key}
                    Key={key}
                    //Date={1}
                    Link={"http://pastebin.com/" + key}
                    //Preview={""}
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
            <div className="my-3 p-3 rounded_25 shadow-sm bg_complement scrollable" >
                <h6 className="border-bottom border-gray pb-2 mb-0">{this.props.sensorString}</h6>
                <table className="table table-responsive small">
                    <thead>
                        <tr>
                            <th scope="col">Key</th>
                            <th scope="col">Link</th>
                            {/*<th scope="col">Preview</th>*/}
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
                <td scope="row">{this.props.Key}</td>
                <td scope="row"><a href={this.props.Link}>{this.props.Link}</a></td>
                {/*<td>{this.props.Preview}</td>*/}
            </tr>    
        );
    }
}


const pwnedStyles = {
    "background-color":"turquoise"
};

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
            if(PWND_LIST != undefined){
                if (PWND_LIST["404"] != undefined){
                    this.noData = true;
                    this.pwndList = <HaveIBeenPwndEntry
                        Key={this.props.sensorString}
                        Description={"<font size='3' color='green'>" + PWND_LIST["404"] + "</font>"}
                        Breached={false}
                    />
                }else{
                    console.log("Not undefined")
                    this.pwndList = PWND_LIST.map((entry)=>(
                        <HaveIBeenPwndEntry
                            key={entry.Description}
                            BreachDate={entry.BreachDate}
                            Domain={entry.LogoPath}
                            Name={entry.Name}
                            Description={entry.Description}
                            Breached={true}
                        />
                    ));
                }
            }
            
            this.forceUpdate()
            

        });
    }

    componentWillUnmount(){
        this.ref.off();
    }
    
    render(){
        return (
            <div className="my-3 p-3  rounded_25 shadow-sm bg_complement" >
                <h6 className="border-bottom border-gray pb-2 mb-0" >{this.props.sensorString} </h6>
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
                
                {this.props.Breached &&
                    <th scope="row">{this.props.BreachDate}</th>
                }
                {this.props.Breached &&
                    <td><img src={this.props.Domain} style={pwnedPicStyle}/></td>
                }
                {this.props.Breached &&
                    <td>{this.props.Name}</td>
                }
                
                <td dangerouslySetInnerHTML={{__html: this.props.Description}}></td>
            </tr>    
        );
        
    }
}


class Bubble extends React.Component{
    constructor(props){
        super(props)
        this.handler = this.props.handler
        this.popTables = this.popTables.bind(this)
    }

    popTables(id) { 
        var pasteSensors = allSensors[this.props.name]["paste"]
        //currentPasteSensor = pasteSensors

        var pwnSensors = allSensors[this.props.name]["pwned"]
        var darkSensors = allSensors[this.props.name]["dark"]

        currentPwnedSensors = pwnSensors
        currentPasteSensors = pasteSensors
        currentDarkSensors = darkSensors


        currentID = this.props.name
        //currentPwnedSensors = pwnSensors
        console.log("Pop Tables")
        console.log("Pwned Senors")
        console.log(pwnSensors)

        console.log("Paste Senors")
        console.log(pasteSensors)
        
        this.handler()
        
    }

    render(){
        //console.log(this.props.id);
        return(
            <div class="round-button">
                <div class="round-button-circle">
                    {/* onclick={this.popTables(this.props.id)} */}
                    <a  className="round-button" id={this.props.id} onClick={this.popTables}>{this.props.name}</a>
                {/* href = "#" */}
                </div>
            </div>
            
        )
    }
}

class BubbleSensor extends React.Component { 
    constructor(props){
        super(props);
        this.list = [];
        //this.ref = firebase.database().ref('sensors').child('paste_sensors');
        this.ref = firebase.database().ref('sensors'); 
        this.sensorList = []
        this.sensorNames = []
        this.handler = this.props.handler
    }
    
    componentDidMount() { 
    
        this.ref.on('value', (snapshot) => { 

            //var tempSensor = [];
            var i = 0;
            for(var key in snapshot.val()) { 
                allSensors[key] = {}
                //paste_sensors
                var tempPwnedSensor = snapshot.val()[key]["pwned_sensors"];
                var tempPasteSensors = snapshot.val()[key]["paste_sensors"];
                var tempDarkSensors = snapshot.val()[key]["dark_sensors"]
               
                // var tempSensor = snapshot.val(); 
                // tempSensor.key = snapshot.key;

                
                this.sensorNames.push(key);
                console.log("KEY");
                console.log(key);
                console.log("Pwnd Sensor")
                console.log(tempPwnedSensor)
                console.log("Paste Sensor")
                console.log(tempPasteSensors)
                console.log("DarkSensors")
                console.log(tempDarkSensors)
                console.log("\n\n")

                if(tempPwnedSensor != undefined){

                    
                    for (var sensorKey in tempPwnedSensor){
                            var tempDict = {}
                            var sensorVal = tempPwnedSensor[sensorKey]
                            
                            tempDict["string"] = sensorVal["sensor"]
                            tempDict["key"] = sensorKey
                            
                            if (allSensors[key]["pwned"] == undefined){
                                allSensors[key]["pwned"] = []
                            }
                            
                            allSensors[key]["pwned"].push(tempDict)
                            

                            
                    }
                    if (i == 0){
                        currentPwnedSensors = allSensors[key]["pwned"]
                        currentID = key
                    }
                }
                if(tempPasteSensors != undefined){
                    
                    for (var sensorKey in tempPasteSensors){
                            var tempDict = {}
                            var sensorVal = tempPasteSensors[sensorKey]
                            
                            tempDict["string"] = sensorVal["sensor"]
                            tempDict["key"] = sensorKey
                            
                            if(allSensors[key]["paste"] == undefined){
                                allSensors[key]["paste"] = []
                            }
                            allSensors[key]["paste"].push(tempDict)
                            
                             
                    }
                    if (i == 0){
                        currentPasteSensors = allSensors[key]["paste"]
                        currentID = key
                    }
                }
                if(tempDarkSensors != undefined){
                    
                    for (var sensorKey in tempDarkSensors){
                            var tempDict = {}
                            var sensorVal = tempDarkSensors[sensorKey]
                        
                            tempDict["string"] = sensorVal["sensor"]
                            tempDict["key"] = sensorKey
                            
                            if(allSensors[key]["dark"] == undefined){
                                allSensors[key]["dark"] = []
                            }
                            allSensors[key]["dark"].push(tempDict)

                    }
                    if (i == 0){
                        currentDarkSensors = allSensors[key]["dark"]
                        currentID = key
                    }
                }

                console.log("All Sensors")
                console.log(allSensors)
                this.sensorList.push(snapshot.val()[key]);
                i = i + 1
            }
            this.forceUpdate()
        
        }); 
        //console.log(this.sensorList);
        
    }
    
    componentWillUnmount() { 
        this.ref.off(); 
    }
    render() { 
        var count = 0; 
        this.list = this.sensorNames.map((entry) => (
            <Bubble
                name={entry}
                key={entry}
                id={++count}
                handler={this.handler}
            /> 
        )); 
        
        

        return (
            <div class="container-outer">
                {/* <h2>My Sensors </h2>  */}
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
    constructor(props){
        super(props)
        this.handler = this.handler.bind(this)
    }

    handler(){
        this.forceUpdate()
        console.log("Force update dashboa rd")
    }

    render(){
        var pwndSensor = [];
        var pastSensors = [];
        var darkSensors = [];

        if (currentPasteSensors != undefined ){
            pwndSensor = currentPasteSensors.map((sensor)=>(
                <PastebinTable
                key={sensor.key}
                sensorKey={sensor.key}
                sensorString={sensor.string}
                />
            ));
        }
            
        

        if(currentPwnedSensors != undefined){
            pastSensors = currentPwnedSensors.map((sensor)=>(
                <HaveIBeenPwndTable
                key={sensor.key}
                sensorKey={sensor.key}
                sensorString={sensor.string}
                />
                
            ));
        }

        if (currentDarkSensors != undefined){
            darkSensors = currentDarkSensors.map((sensor)=>(
               <DarkWebTable
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
                    
                </main>
                
                <main>
                    <BubbleSensor handler={this.handler}/>
                </main> 
                <center><h3 className="center">{currentID}</h3></center>
                {/*
                <main role="main" className="container">
                    <AreaChart title="Paste Dump" colors={["#007bff", "#666"]} data={lineChartData} xtitle="Time (days)" ytitle="Pastes"/>
                </main>
                */}

                <main role="main" className="container">
                {/*SENSORS*/}
                
                {pastSensors}
                {pwndSensor}
                {darkSensors}
                </main>
                
            </div>
            
        );
    }
}



  export default Dashboard