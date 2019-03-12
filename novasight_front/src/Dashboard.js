import React, { Component } from 'react';
import './Style Sheets/site.min.css'
import './Style Sheets/site.min.css.map'
import './Style Sheets/style.scss'
import './Style Sheets/Dashboard.css'
import firebase from './firebase.js';
import ReactChartkick, { LineChart, AreaChart } from 'react-chartkick'
import Chart from 'chart.js'
import { all } from 'q';

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
    "01/01/2019":10,
    "01/02/2019":20,
    
}

var allChartData = [
    {"name":"Pastebin", "data":{}},
    {"name":"Have I Been Pwned", "data":{}},
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
                    //console.log(" Key " + key)
                    //console.log("Date " +  date)
                    tempDict["link"] = data[key]["link"]
                    tempList.push(tempDict)
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
                    Key={val["key"]}
                    Link={val["link"]}
                    Preview={val["preview"]}
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
                            <th scope="col">Date</th>
                            <th scope="col">Key</th>
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
                <td scope="row">{this.props.Key}</td>
                <td scope="row"><a href={this.props.Link}>{this.props.Link}</a></td>
                <td>{this.props.Preview}</td>
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
        this.list = []; 
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

class ChartAll extends React.Component{
    constructor(){
        super()
        //super(props)
        this.pasteRef = firebase.database().ref("paste_search") 
        //this.pwndRef = firebase.database().ref("pwned_search")
        //this.darkRef = firebase.database().ref("dark_search")
        this.chartData = []
       this.MyallData = [];
    }


    componentDidMount(){
        this.pasteRef.on('value', (snapshot) => {
            //let items = snapshot.val();
            
            console.log("Chart all")
            console.log(this.props.PasteSensors)
            
            var allData =[]; 
            this.MyallData = allData;
            for (var i in this.props.PasteSensors){
                var key = this.props.PasteSensors[i]["key"]
                //var name = this.props.PasteSensors[i]["string"]
                var tempData = snapshot.val()[key]
                if (tempData != undefined){
                    for(var key in tempData){
                        var tempDict = {}
                        tempDict["key"] = key
                        tempDict["link"] = tempData[key]["link"]
                        tempDict["time posted"] = tempData[key]["time posted"]
                        tempDict["time discovered"] = tempData[key]["time discovered(day:hour:minute:second)"]
                        tempDict["preview"] = tempData[key]["preview"]
                        allData.push(tempDict)
                    }
                }
            }

            allData.sort(function(a,b){
                if (a["time posted"] == ""){
                    a["time posted"] = 0
                }

                if (b["time posted"] == ""){
                    b["time posted"] = 0
                }

                return  Number(b["time posted"]) - Number(a["time posted"])
            })
             
            
            
            console.log("Dates")
            var lastMonth = new Date()
            lastMonth.setMonth(lastMonth.getMonth() - 1)
            var lastMonthNumber = lastMonth.getTime()
            console.log(lastMonthNumber)
            var lastMonthCount = 0

            var last2Month = new Date()
            last2Month.setMonth(last2Month.getMonth() - 2)
            var last2MonthNumber = last2Month.getTime()
            console.log(last2MonthNumber)
            var last2MonthCount = 0

            var last3Months = new Date()
            last3Months.setMonth(last3Months.getMonth() - 3)
            var last3MonthsNumber = last3Months.getTime()
            console.log(last3MonthsNumber)
            var last3MonthsCount = 0


            var last4Months = new Date()
            last4Months.setMonth(last4Months.getMonth() - 4)
            var last4MonthsNumber = last4Months.getTime()
            console.log(last4MonthsNumber)
            var last4MonthsCount = 0

            var last5Months = new Date()
            last5Months.setMonth(last5Months.getMonth() - 5)
            var last5MonthsNumber = last5Months.getTime()
            console.log(last5MonthsNumber)
            var last5MonthsCount = 0

            var last6Months = new Date()
            last6Months.setMonth(last6Months.getMonth() - 6)
            
            var last6MonthsNumber = last6Months.getTime()
            console.log(last6MonthsNumber)
            var last6MonthsCount = 0
            

            var tempChartData = {}
            var now = new Date()

            for (var d = last6Months; d <= now ; d.setDate(d.getDate() + 5)){
                //console.log("d  " + d)
                tempChartData[d.toLocaleDateString()] = 0
            }

            for (var paste in allData){

                var date = new Date(1000 * Number(allData[paste]["time posted"]))

                if (date.getTime() >= last6MonthsNumber){
                    
                    if (tempChartData[date.toLocaleDateString()] == undefined){
                        tempChartData[date.toLocaleDateString()] = 0
                    }

                    tempChartData[date.toLocaleDateString()] = tempChartData[date.toLocaleDateString()] + 1

                }
                //console.log(paste)
                /*
                var date = new Date(1000 * Number(allData[paste]["time posted"]))
                //
                if(date.getTime() >= lastMonthNumber){
                    console.log("Paste " + paste)
                    console.log("Last month")
                    console.log(date)
                    lastMonthCount = lastMonthCount + 1
                }

                if(date.getTime() < lastMonthNumber && date.getTime() >= last2MonthNumber){
                    last2MonthCount = last2MonthCount + 1

                }else if(date.getTime() < last2MonthNumber && date.getTime() >= last3MonthsNumber){
                    last3MonthsCount = last3MonthsCount + 1

                }else if(date.getTime() < last3MonthsNumber && date.getTime() >= last4MonthsNumber){
                    last4MonthsCount = last4MonthsCount + 1

                }else if(date.getTime() < last4MonthsNumber && date.getTime() >= last5MonthsNumber){
                    last5MonthsCount = last5MonthsCount + 1

                }else if (date.getTime() < last5MonthsNumber && date.getTime() >= last6MonthsNumber){
                    last6MonthsCount = last6MonthsCount + 1

                }
                */
                
                
                
            }
            console.log("Number of pastes in last month")
            console.log(lastMonthCount)
            console.log(last2MonthCount)
            console.log(last3MonthsCount)
            console.log(last4MonthsCount)
            console.log(last5MonthsCount)
            console.log(last6MonthsCount)
            
            var dataC = {}
            dataC["2019-02-11"] = lastMonthCount
            dataC["2019-01-11"] = last2MonthCount
            dataC["2018-12-11"] = last3MonthsCount
            dataC["2018-11-11"] = last4MonthsCount
            dataC["2018-10-11"] = last5MonthsCount
            dataC["2018-9-11"] = last6MonthsCount


            console.log("Temp chart date")
            console.log(tempChartData)
            allChartData[0]["data"] = tempChartData
            
            console.log("All Data")
            console.log(allData)
            this.forceUpdate()
        });
    }

    getHealth() { 
        if (this.MyallData > 5 && this.MyallData < 20) { 
            return "Average"; 
        }
        else if (this.MyallData < 5) { 
            return "Good"; 
        } else { 
            return "Poor"; 
        }
    }

    getColor() { 
        if (this.MyallData > 5 && this.MyallData < 20) { 
            return "#FFD700"; 
        }
        else if (this.MyallData < 5) { 
            return "#7CFC00"; 
        } else { 
            return "#FF0000"; 
        }
    }

    
    render(){
        return (
            <main role="main" className="container">
                <div className="my-3 p-3 rounded_25 shadow-sm bg_complement" >
     
                    <div className="top_left_div"> <h1>{currentID}</h1> </div>
                    <div className="top_right_div">  <h1 color={this.getColor()}>{this.getHealth()}</h1></div>

                    <LineChart title="Elapsed Data"  curve={true} data={allChartData} xtitle="Time (Months)" ytitle="Data"/>
            
                 </div>
            </main>   
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
        console.log("Force update dashboa rd")
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
                PasteSensors={currentPasteSensors}
            />
            

            pwndSensor = currentPasteSensors.map((sensor)=>(
                <PastebinTable
                key={sensor.key}
                sensorKey={sensor.key}
                sensorString={sensor.string}
                />

                
            ));
        }else{
            this.chart= []
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
               
                
                {this.chart}
                

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