import React from "react";
import {Route,Switch,Redirect} from "react-router-dom";
import LoginForm from "./LoginForm.jsx";
import RegForm from "./RegForm.jsx";
import Profile from "./Profile.jsx";

import axios from "axios";
import style from "./App.css";

class App extends React.Component{
  constructor(props){
      super(props);
      this.state = {user : null};
  }

  render(){
    return (
      <div>
        <Switch>
          <Route path="/login" render={props => <LoginForm {...props} user={this.state.user} setUpUser={(user) => this.setState({user : user})}/>}/>
          <Route path="/register" render={props => <RegForm {...props} user={this.state.user}/>}/>
          <Route path="/profile" render={props => <Profile {...props} user={this.state.user}/>}/>
        </Switch>
        {this.state.user === null ? <Redirect to="/login"/> : <Redirect to="/profile"/>}
      </div>

    )
  }

};


export default App;
