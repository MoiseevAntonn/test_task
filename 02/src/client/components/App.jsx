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
      this.state = {data : null};
  }

  render(){
    return (
      <div>
        <Switch>
          <Route path="/login" render={props => <LoginForm {...props} data={this.state.data} setUpUserData={(data) => this.setState({data : data})}/>}/>
          <Route path="/register" render={props => <RegForm {...props} data={this.state.data}/>}/>
          <Route path="/profile" render={props => <Profile {...props} data={this.state.data}/>}/>
        </Switch>
        {(!this.state.user) ? <Redirect to="/login"/> : <Redirect to="/profile"/>}
      </div>

    )
  }

};


export default App;
