import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import DashboardScreen from './DashboardScreen';
import LoginScreen from './Loginscreen'


class App extends Component {
  constructor(props) {
    super(props);
        var localdashboardComponent=[];
    localdashboardComponent.push(
      <MuiThemeProvider>
        <div>
           <RaisedButton label="Logout" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
    )
    this.state={      localdashboardComponent:localdashboardComponent    }
  }
  componentDidMount(){
    var currentScreen=[];
    currentScreen.push(<DashboardScreen appContext={this.props.appContext} role={this.props.role}/>);
    this.setState({currentScreen})
  }
  toggleDrawer(event){
  this.setState({draweropen: !this.state.draweropen})
  }
  handleClick(event){
      var loginPage =[];
      loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
      this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
  }
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar
            title="Dashboard Page"
          />
        </MuiThemeProvider>
        <div>
          {this.state.currentScreen}
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};

export default App;
