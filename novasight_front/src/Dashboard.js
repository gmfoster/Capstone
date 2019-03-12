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


var currentDataAll = {
    "paste":{},
    "pwned":{},
    "dark":{}
};

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
    "01/01/2019":10,
    "01/02/2019":20,
    
}

var allChartData = [
    {"name":"Pastebin", "data":{}},
    {"name":"Database Breach", "data":{}},
    {"name":"Darkweb", "data":{}}
];

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

class ChartAll extends React.Component{
    constructor(){
        super()
        //super(props)
        this.pasteRef = firebase.database().ref("paste_search") 
        //this.pwndRef = firebase.database().ref("pwned_search")
        //this.darkRef = firebase.database().ref("dark_search")
        this.chartData = []
    }

    
    render(){

        
        var now = new Date()
        var newDataPoints = []

        if (allCurrentPasteData != undefined){
            var last6Months = new Date()
            last6Months.setMonth(last6Months.getMonth() - 6)
            var last6MonthsNumber = last6Months.getTime()
            
            

            
            for (var paste in allCurrentPasteData){

                var date = new Date(1000 * Number(allCurrentPasteData[paste]["time posted"]))

                if (date.getTime() >= last6MonthsNumber){
                    newDataPoints.push(date.toLocaleDateString())
                }

            }
        
        }

        if (allCurrentPwndData != undefined){
            var last6Months = new Date()
            last6Months.setMonth(last6Months.getMonth() - 6)
            var last6MonthsNumber = last6Months.getTime()
            

            for(var i in allCurrentPwndData ){

                var tempDate = allCurrentPwndData[i].BreachDate
                if(tempDate.getTime() >= last6MonthsNumber){
                    newDataPoints.push(tempDate.toLocaleDateString())
                    
                }
            }
           
        }


        var last6Months = new Date()
        last6Months.setMonth(last6Months.getMonth() - 6) 
        var last6MonthsNumber = last6Months.getTime()

        var pasteChartData = {}
        var pwnedChartData = {}
            
            
        for (var d = last6Months; d <= now ; d.setDate(d.getDate() + 30)){
            //console.log("d  " + d)
            pasteChartData[d.toLocaleDateString()] = 0
            pwnedChartData[d.toLocaleDateString()] = 0
        }
        

        for (var i in newDataPoints){
            var date = newDataPoints[i]
            pasteChartData[date] = 0
            pwnedChartData[date] = 0
        }
        

        for(var paste in allCurrentPasteData){
            var tempDate = new Date(1000 * Number(allCurrentPasteData[paste]["time posted"]))
            if (tempDate.getTime() >= last6MonthsNumber){
                
                if (pasteChartData[tempDate.toLocaleDateString()] == undefined){
                    pasteChartData[tempDate.toLocaleDateString()] = 0
                }
                

                pasteChartData[tempDate.toLocaleDateString()] = pasteChartData[tempDate.toLocaleDateString()] + 1
            }
        }

        for(var i in allCurrentPwndData){
            var tempDate = allCurrentPwndData[i].BreachDate
            if (tempDate.getTime() >= last6MonthsNumber){
                pwnedChartData[tempDate.toLocaleDateString()] = 0
            }
            pwnedChartData[tempDate.toLocaleDateString()] = pwnedChartData[tempDate.toLocaleDateString()] + 1
        }

        allChartData[0]["data"] = pasteChartData
        allChartData[1]["data"] = pwnedChartData

        return (
            <main role="main" className="container">
                <div className="my-3 p-3  rounded_25 shadow-sm bg_complement" >
                    <LineChart title="Data Dump"  curve={true} data={allChartData} xtitle="Time (2018-2019)" ytitle="Data"/>
                </div>
            </main>   
        );

    }
}

//set in pastebin table and used in chart info
var allCurrentPasteData = []

class PastebinTable extends React.Component {
    constructor(props){
        super(props);
        this.forceDashboardUpdate = this.props.forceDashboardUpdate
        this.pasteList = [];
        this.ref = firebase.database().ref('paste_search');
        this.number = 0;

    }

    componentDidMount(){
        this.ref.on('value', (snapshot) => {
            let items = snapshot.val();
            if (snapshot.val() == undefined){
                return
            }


            var data = items[this.props.sensorKey]
            if(data == undefined){
                this.pasteList = <PastebinEntry
                    Key={this.props.sensorKey}
                    Description={"No data found for keyword" + this.props.sensorString}
                />
            }else{
                
                //.slice(0,5)
                var tempList = []
                for (var key in data){
                    var tempDict = {}
                    tempDict["key"] = key
                    tempDict["preview"] = data[key]["preview"]
                    
                    //var date = new Date(1000 * Number(data[key]["time posted"]))
                    tempDict["time posted"] = data[key]["time posted"]//date.toLocaleDateString()
                    var tempDate= data[key]["time discovered(day:hour:minute:second)"]
                    
                    var day = 1
                    if (tempDate != undefined){
                        tempDate = tempDate.split(":")
                        day = Number(tempDate[0])
                    }
                    
                    var now = new Date()

                    var newDate = new Date(now.getFullYear(), now.getMonth(), day)
                    tempDict["time discovered"] = newDate.toLocaleDateString()//data[key]["time discovered(day:hour:minute:second)"]
                    //console.log(" Key " + key)
                    //console.log("Date " +  date)
                    tempDict["link"] = data[key]["link"]
                    allCurrentPasteData.push(tempDict)
                    tempList.push(tempDict)
                    //allCurrentPasteData.push(tempDict)
                }

                //var newList = sorted(tempList, key=lambda k, k['time posted']) 
                tempList.sort(function(a,b){
                    if (a["time posted"] == ""){
                        a["time posted"] = 0
                    }

                    if (b["time posted"] == ""){
                        b["time posted"] = 0
                    }

                    return  Number(b["time posted"]) - Number(a["time posted"])
                })

                

                this.pasteList = tempList.map((val)=>(
                    <PastebinEntry
                    Date={ new Date(1000* Number(val["time posted"])).toLocaleDateString()}
                    key={val["key"]}
                    TimeDiscovered={val["time discovered"]}
                    Link={val["link"]}
                    Preview={val["preview"]}
                    />
                ));
                
                
                
            }


            this.forceDashboardUpdate()
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
                            <th scope="col">Date</th>
                            <th scope="col">Time Discovered</th>
                            <th scope="col">Link</th>
                            <th scope="col">Preview</th>
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
                <td scope="row">{this.props.Date}</td>
                <td scope="row">{this.props.TimeDiscovered}</td>
                <td scope="row"><a href={this.props.Link}>{this.props.Link}</a></td>
                <td>{this.props.Preview}</td>
            </tr>    
        );
    }
}


const pwnedStyles = {
    "background-color":"turquoise"
};


var allCurrentPwndData = []

class HaveIBeenPwndTable extends React.Component{
    constructor(props){
        super(props);
        this.pwndList = [];
        this.ref = firebase.database().ref('pwned_search');
        this.noData = false;
        this.number = 0;
        this.forceDashboardUpdate = this.props.forceDashboardUpdate
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
                    
                    for (var pwnd in PWND_LIST){
                        /*
                        var tempDate = allCurrentPwndData[i].BreachDate
                        console.log(tempDate)
                        tempDate = tempDate.split("-")
                        var date = new Date(Number(tempDate[0]), Number(tempDate[1]) -1, Number(tempDate[2]), 0 ,0 ,0,0,0)
                        console.log(date)
                        */
                        var tempDate = PWND_LIST[pwnd].BreachDate
                        console.log(tempDate)
                        tempDate = tempDate.split("-")
                        var date = new Date(Number(tempDate[0]), Number(tempDate[1]) -1, Number(tempDate[2]))
                        PWND_LIST[pwnd].BreachDate = date
                    
                        allCurrentPwndData.push(PWND_LIST[pwnd])
                    }

                    PWND_LIST.sort(function(a,b){
                        return  b.BreachDate.getTime() - a.BreachDate.getTime()
                    })

                    this.pwndList = PWND_LIST.map((entry)=>(
                        <HaveIBeenPwndEntry
                            key={entry.Description}
                            BreachDate={entry.BreachDate.toLocaleDateString()}
                            Domain={entry.LogoPath}
                            Name={entry.Name}
                            Description={entry.Description}
                            Breached={true}
                        />
                    ));
                }
            }
            this.forceDashboardUpdate()
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

        allCurrentPwndData = []
        allCurrentPasteData = []
        currentPwnedSensors = pwnSensors
        currentPasteSensors = pasteSensors
        currentDarkSensors = darkSensors


        currentID = this.props.name
        //currentPwnedSensors = pwnSensors
        
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
                /*
                console.log("KEY");
                console.log(key);
                console.log("Pwnd Sensor")
                console.log(tempPwnedSensor)
                console.log("Paste Sensor")
                console.log(tempPasteSensors)
                console.log("DarkSensors")
                console.log(tempDarkSensors)
                console.log("\n\n")
                */

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

                //console.log("All Sensors")
                //console.log(allSensors)
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
        this.chart =[]
    }

    handler(){
        this.forceUpdate()
        //console.log("Force update dashboa rd")
    }

    render(){
        var pwndSensor = [];
        var pastSensors = [];
        var darkSensors = [];



        if (currentPasteSensors != undefined ){
            //console.log("Current Paste Sensors")
            //console.log(currentPasteSensors)
            
            this.chart = <ChartAll
                key = {currentPasteSensors[0]["key"]}
                //PasteSensors={currentPasteSensors}
            />
            

            
            pastSensors = currentPasteSensors.map((sensor)=>(
                <PastebinTable
                key={sensor.key}
                sensorKey={sensor.key}
                sensorString={sensor.string}
                forceDashboardUpdate={this.handler}
                
                />

                
            ));
        }
            
        

        if(currentPwnedSensors != undefined){

            this.chart = <ChartAll
                key = {currentPwnedSensors[0]["key"]}
                //PasteSensors={currentPasteSensors}
            />

            pwndSensor = currentPwnedSensors.map((sensor)=>(
                <HaveIBeenPwndTable
                key={sensor.key}
                sensorKey={sensor.key}
                sensorString={sensor.string}
                forceDashboardUpdate={this.handler}
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
                <h3 className="center" >{currentID}</h3>
                
                {this.chart}
                

                <main role="main" className="container">
                {/*SENSORS*/}
                
                
                {pwndSensor}
                {pastSensors}
                {darkSensors}
                </main>
                
            </div>
            
        );
    }
}





  export default Dashboard