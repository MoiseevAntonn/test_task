import React from "react";
import {Redirect,Link} from "react-router-dom";
import axios from 'axios'

class RegForm extends React.Component{
  constructor(props){
      super(props);
      this.state = {name : "", password : ""};
  }

  render(){
    if (this.props.user ) {
        return <Redirect to='/profile' />;
    }

    return (
      <div>
        <h1> Форма Регистрации </h1>
        <form onSubmit={this.onSubmit.bind(this)} className="custom_form">
            <label> Введите никнейм :</label>

            <input type="text" value={this.state.name} onChange={this.onChangeName.bind(this)}/>

            <label>  Введите пароль :</label>

            <input type="password" value={this.state.password} onChange={this.onChangePassword.bind(this)}/>

            <button type="submit" className="custom_button"> Подтвердить </button>

            <Link to="/login" className="custom_button"> To Log in </Link>
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

    axios.post("/register",{
      name : this.state.name,
      password  :this.state.password
    })
    .catch(()=>{
      alert("Проблемы с регистрацией");
    })

  }

};

export default RegForm;
