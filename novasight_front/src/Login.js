import React, { Component } from 'react';
import adobe from './images/adobe.png'
import wall_st_market from './images/wall_st_market.png';
import dream_market from './images/dream_market.png';
import silk_road_3 from './images/silk_road_3.png';
import berlusconi_market from './images/berlusconi_market.png';
import './Style Sheets/InvestigationResults.css';


const invesitgationInfo = {
    userInitated: "Fernando",
    number:1,
    duration: "15 mins",
    riskFactor:"2/10"
};


const hibpResults = {
    companyName: "Adobe",
    dateBreached:"4 October 2013",
    dateAdded:"4 December 2013",
    compromisedAccounts: "152,445,165",
    compromisedData: "Email addresses, Password hints, Passwords, Usernames",
    compromisedDescription: "In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text. The password cryptography was poorly done and many were quickly resolved back to plain text. The unencrypted hints also disclosed much about the passwords adding further to the risk that hundreds of millions of Adobe customers already faced."

}

const pastebinResults = [
    {
        linkName:"Netflix: camijames1987@gmail.com:Blue1987!",
        url:"https://pastebin.com/Uir4cpvn",
        description:"Aug 25, 2018 ... Netflix: really_cool69@yahoo.com:helpme88 ... Netflix: kodyrhurst@gmail.com: Koko1993 ... Netflix: krystalroney@hotmail.com:denise91."
    },{
        linkName:"by an4t0xic ------------------- Netflix accounts",
        url:"https://pastebin.com/TpbFSWB5",
        description:"Jun 4, 2017 ... acaciablack@yahoo.com:69022iam:HD:Netflix. academenam@yahoo.com: Divinebeauty7:SD:Netflix. acallreno@yahoo.com:fourkids:Ultra HD: ..."
    },{
        linkName:"mazao2907@hotmail.com peido2907 Netflix 25.08.2018 kingjerry4 ...",
        url:"https://pastebin.com/SubLDaBT",
        description:"Aug 25, 2018 ... kingjerry4@gmail.com king1432 Netflix 25.08.2018. ecmelsoylu@gmail.com felsefe Netflix 25.08.2018. jpotts104@gmail.com dogdog Netflix ..."
    },{
        linkName:"wpfd911tb94@gmail.com:Tommy94t ...",
        url:"https://pastebin.com/UMNq7b6P",
        description:"Jun 17, 2018 ... ... Netflix: aladeline1998@gmail.com:Seychelles1 ... Netflix: robertohernandez2275@gmail.com:beto2275 ..."
    },{
        linkName:"NEW BIN NETFLIX PREMIUM BIN: 524981xxxxxxxx05 IP ...",
        url:"https://pastebin.com/jLtzGfi7",
        description:"Feb 5, 2018 ... Not a member of Pastebin yet? Sign Up, it unlocks many cool features! raw downloadcloneembedreportprint text 0.14 KB. NEW BIN NETFLIX ..."
    }
];

const darknetResults = [
    {
        marketName:"Dream Market",
        totalListings:"120262",
        drugsListings:"61457",
        marketDescription:"Dream Market has been working since the latter part of 2013. It is a regular escrow marketplace",
        imgSrc: dream_market,
        url:"http://6khhxwj7viwe5xjm.onion/?ai=552713"
    },{
        marketName:"Wall Street Market",
        totalListings:"9604",
        drugsListings:"4685",
        marketDescription:"The Wall Street Market is one of the most modern, innovative and up-to-date marketplaces on the dark web, including a wide-range of special features. This multisig darknet market grants the capability of PGP 2-factor authentication, an auto shop for digital goods and a bit message notification system. Moreover, exit scams are impossible because users’ funds are never fully controlled by the marketplace. The site also features a number of interesting components, such as a badge reward system and a beneficial EXIF remover for uploaded images.",
        imgSrc: wall_st_market,
        url:"http://wallstyizjhkrvmj.onion/signup?ref=166794"
    },{
        marketName:"Silk Road 3 Market",
        totalListings:"51074",
        drugsListings:"33291",
        marketDescription:"The name Silk Road has become synonymous with buying drugs on the internet. Older Silk Road marketplaces have been closed down, however, every now and then, a new one with a similar name pops up. That’s why you should be wary of using this marketplace. Agora and other more trusted marketplaces are safer bets.",
        imgSrc: silk_road_3,
        url:"http://silkroad7rn2puhj.onion/?register&ref=bVehnOXR"
    },{
        marketName:"Berlusconi Market",
        totalListings:"12224",
        drugsListings:"6459",
        marketDescription:"Berlusconi Market surfaced in the summer of 2017. It does not contain multisig and forced vendor PGP but it does have 2FA. The commission is 2% and the vendor bond varies from $0-250.",
        imgSrc:berlusconi_market,
        url:" http://berluscqui3nj4qz.onion/"
    }
];

const Login = () => (
    <div>
        <h2 class='results' >Investigation Results</h2>

        <div class='pastebin_results'>
            <label> <b>User Intiated: </b><label> {invesitgationInfo.userInitated} </label></label><br/>
            <label><b> Investigation #: </b><label>{invesitgationInfo.number}</label></label><br/>
            <label> <b>Investigation Duration: </b><label> {invesitgationInfo.duration} </label></label><br/>
            <label> <b>Risk Factor:</b><label> {invesitgationInfo.riskFactor}</label></label>
        </div>

        <ResultsList/>
    </div>
);


class PastebinPaste extends React.Component{
    render(){
        return(
            <div class="pastebin_results">
                <a class="pastebin_ink" href={this.props.url}>
                    <code>
                        {this.props.linkName}
                    </code>
                </a> <br/>
                <label>
                    {this.props.url}
                </label><br/>
                <label>
                    {this.props.description}
                </label><br/>
            </div>
        );
    }
}

class PastebinList extends React.Component{

    render(){

        const results = pastebinResults.map((result) => (
            <PastebinPaste
                url = {result.url}
                linkName = {result.linkName}
                description = {result.description}
            />
        ));

        return (
            <div >
                  {results} 
            </div>
        );

    }
}

class HaveIBeenPwnedResults extends React.Component{

    render(){
        return(
            <div class='results'>
                <h3 class='results'>Have I Been Pwned Results</h3>
                <hr class='orange'></hr>
                
                <div class='results_hibpr_row'>
                    <div class='results_hibpr_column'>
                        <img src={adobe}></img>
                    </div>
                    <div class='results_hibpr_columnr'>
                        <h3>{hibpResults.companyName}</h3>
                        <p>
                            {hibpResults.compromisedDescription}
                        </p>
                        <label><b>Breach Date: </b>{hibpResults.dateBreached}</label><br/>
                        <label><b>Data added to HIBP: </b> {hibpResults.dateAdded}</label><br/>
                        <label><b>Compromised Accounts:</b> {hibpResults.compromisedAccounts}</label><br/>
                        <label><b>Compromised Data: </b>{hibpResults.compromisedData}</label><br/>
                        
                    </div>
                </div>
            </div>
        );
    }
}





class PastebinResults extends React.Component{
    render(){
        return(
            <div>
                <h3 class='results'>Pastebin Results</h3>
                <hr class='orange'></hr>
                <PastebinList />
            </div>
        );
    }
}



class DarknetList extends React.Component{
    render(){
        const results = darknetResults.map((result) => (
                <DarknetListing
                    imageSrc = {result.imgSrc}
                    drugsListings = {result.drugsListings}
                    totalListings = {result.totalListings}
                    description = {result.marketDescription}
                    marketName = {result.marketName}
                    url = {result.url}
                />
        ));


        return(
            <div>
                {results}
            </div>
        );
    }
}

class DarknetListing extends React.Component{
    render(){
        return(
            <div>
                <div class='results_hibpr_row'>
                    <div class='results_hibpr_column'>
                        <img src={this.props.imageSrc}></img>
                    </div>
                    <div class='results_hibpr_columnr'>
                        <h3>{this.props.marketName}</h3>
                        <p>
                            {this.props.description}
                        </p>
                        <label><b>Total Listings </b>{this.props.totalListings}</label><br/>
                        <label><b>Link: </b> {this.props.url}</label><br/>
                        
                        
                    </div>
                </div>
            </div>
        );
    }
}

class DarknetResults extends React.Component{
    render(){
        return (
            <div class='results'>
                <h3 class='results'>Darknet Results</h3>
                <hr class='orange'></hr>
                <DarknetList />
            </div>
        );
    }
}

class ResultsList extends React.Component {
    render() {
        return (
            <div class='centered_div'>
                <HaveIBeenPwnedResults/>
                <PastebinResults/>
                <DarknetResults/>

            </div>
        ); 
    }
}



  export default Login