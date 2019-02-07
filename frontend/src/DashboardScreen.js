import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Loginscreen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import DashboardPage from './DashboardPage';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

var request = require('superagent');

class DashboardScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      role:'admin',
    }
  }
  componentWillMount(){
        var dashboardcreen=[];
    dashboardcreen.push(<DashboardPage parentContext={this} appContext={this.props.appContext}/>);
    this.setState({ dashboardcreen:dashboardcreen       })
  }

handleClick(event){
               var loginPage =[];
      loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
      this.props.appContext.setState({loginPage:loginPage,dashboardScreen:[]})
}

handleLogout(event){
  // console.log("logout event fired",this.props);
  var loginPage =[];
  loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
  this.props.appContext.setState({loginPage:loginPage,DashboardScreen:[]})
}
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
        <div>
           <RaisedButton label="Logout" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default DashboardScreen;