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
      this.state = {user:null,links : []};
  }

  render(){
    return (
      <div>
        <Switch>

          <Route path="/login" render={props => <LoginForm {...props} user={this.state.user} setUpData={data => this.setState({user : data.user,links:data.links})}/>}/>
          <Route path="/register" render={props => <RegForm {...props} user={this.state.user}/>}/>
          <Route path="/profile" render={props => <Profile {...props} user={this.state.user} links={this.state.links} clearUser={()=>{this.setState(this.getInitialData())}}/>}/>

        </Switch>
        {(!this.state.user) ? <Redirect to="/login"/> : <Redirect to="/profile"/>}
      </div>

    )
  }

  componentDidMount(){
    //if (!document.cookie) return;

    axios.get("/profile/get",{
      withCredentials : true
    })
    .then(response => response.data)
    .then(data => {
      this.setState({user : data.user,links : data.links});
    })
  }

  getInitialData(){
    return {
      user : null,
      links : []
    }
  }

};


export default App;
