import React from "react";
import axios from "axios";
import ListItem from "./ListItem.jsx";
import {Redirect} from "react-router-dom";
import style from "./Profile.css";

class Profile extends React.Component{

  constructor(props){
      super(props);
      this.state = {longLink : ""};
  }

  render(){
    var i = 0;
    if (!this.props.user) return <Redirect to="/login"/>;

    return (
        <div className="custom_form">
            <label className="center_element"> Привет ! {  (this.props.user) ? this.props.user.name: ""} </label>

            <label className="center_element">Создать ссылку </label>

            <form onSubmit={this.onSubmit.bind(this)} className="center_element">
                <input type="text" value={this.state.longLink} onChange={this.onChangeLink.bind(this)}/>
                <button type="submit"> Создать </button>
            </form>

            <ul>
                {this.props.links.map(link => <ListItem key={i++} link={link}/>)}
            </ul>

            <button onClick={this.logOutHandler.bind(this)} className="custom_button"> Logout </button>
        </div>
    )
  }

  onChangeLink(event){
    this.setState({
      longLink :event.target.value
    })
  }

  onSubmit(event){
    event.preventDefault();

    if (this.state.longLink === ""){
      alert("Введите пожалуйста ссылку")
    }
    axios.post("/profile/createLink",{
      longLink : this.state.longLink,
      id : this.props.user.id
    })
    .catch(err => {
      alert("Что то пошло не так")
    })
  }


  logOutHandler(event){
    axios.get("/profile/logout")
    .then(response => {
      this.props.clearUser();
    })
  }

  componentWillUnmount(){
    this.props.clearUser();
  }




};

export default Profile;
