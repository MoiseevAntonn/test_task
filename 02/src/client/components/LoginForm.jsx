import React from "react";
import {Redirect,Link} from "react-router-dom";
import axios from 'axios'
import style from "./LoginForm.css";

class LoginForm extends React.Component{
  constructor(props){
      super(props);
      this.state = {name : "",password : ""};
  }

  render(){
    if (this.props.userFlag ) {
        return <Redirect to='/profile' />;
    }

    return (
      <div>
        <h1> Форма Авторизации </h1>
        <form onSubmit={this.onSubmit.bind(this)} className="custom_form">

            <label> Введите никнейм : </label>

            <input type="text" value={this.state.name} onChange={this.onChangeName.bind(this)}/>

            <label> Введите пароль: </label>

            <input type="password" value={this.state.password} onChange={this.onChangePassword.bind(this)}/>

            <button type="submit" className="custom_button"> Подтвердить </button>

            <Link to="/register" className="custom_button"> Зарегистрироваться </Link>
        </form>
      </div>
    )
  }



  onChangeName(event){
    this.setState({
      name :event.target.value
    })
  }

  onChangePassword(event){
    this.setState({
      password : event.target.value
    })
  }

  onSubmit(event){
    event.preventDefault();

    axios.post("/login",{
      name : this.state.name,
      password  :this.state.password
    })
    .then(response => {
      if (response.status === 200) return axios.get("/profile/get",{withCredentials : true});
    })
    .then(response => response.data)
    .then(data => {
      this.props.setUpData(data);
    })

    .catch(err => alert("Неправильная авторизация"))
  }

};

export default LoginForm;
