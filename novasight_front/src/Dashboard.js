import React, { Component } from 'react';

import './Style Sheets/site.min.css'
import './Style Sheets/site.min.css.map'
import './Style Sheets/style.scss'


const investigations = {
    investigation:5,
    modules:"HIBP-Pastebin",
    eta:"30 minutes"
}

let styles = { 
    height: '150px'
}
/*

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
                                <tr>
                                    <th scope="row">01/24/19</th>
                                    <td>Manufacturing</td>
                                    <td>Leaked Credentials Document</td>
                                    <td>Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                        tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum 
                        massa justo sit amet risus.</td>
                                </tr>
                                <tr>
                                    <th scope="row">01/24/19</th>
                                    <td>Manufacturing</td>
                                    <td>Leaked Credentials Document</td>
                                    <td>Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                        tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum 
                        massa justo sit amet risus.</td>
                                </tr>
                                <tr>
                                    <th scope="row">01/24/19</th>
                                    <td>Manufacturing</td>
                                    <td>Leaked Credentials Document</td>
                                    <td>Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                        tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum 
                        massa justo sit amet risus.</td>
                                </tr>
                                <tr>
                                    <th scope="row">01/24/19</th>
                                    <td>Manufacturing</td>
                                    <td>Leaked Credentials Document</td>
                                    <td>Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                        tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum 
                        massa justo sit amet risus.</td>
                                </tr>
                                <tr>
                                    <th scope="row">01/24/19</th>
                                    <td>Manufacturing</td>
                                    <td>Leaked Credentials Document</td>
                                    <td>Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                        tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum 
                        massa justo sit amet risus.</td>
                                </tr>
                                <tr>
                                    <th scope="row">01/24/19</th>
                                    <td>Manufacturing</td>
                                    <td>Leaked Credentials Document</td>
                                    <td>Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                        tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum 
                        massa justo sit amet risus.</td>
                                </tr>
                                <tr>
                                    <th scope="row">01/24/19</th>
                                    <td>Manufacturing</td>
                                    <td>Leaked Credentials Document</td>
                                    <td>Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                        tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum 
                        massa justo sit amet risus.</td>
                                </tr>
                                <tr>
                                    <th scope="row">01/24/19</th>
                                    <td>Manufacturing</td>
                                    <td>Leaked Credentials Document</td>
                                    <td>Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                        tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum 
                        massa justo sit amet risus.</td>
                                </tr>
                                <tr>
                                    <th scope="row">01/24/19</th>
                                    <td>Manufacturing</td>
                                    <td>Leaked Credentials Document</td>
                                    <td>Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                        tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum 
                        massa justo sit amet risus.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        );
    }
}

  export default Dashboard