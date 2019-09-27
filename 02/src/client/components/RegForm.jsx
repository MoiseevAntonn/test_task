import React from "react";
import {Redirect,Link} from "react-router-dom";
import axios from 'axios'

class RegForm extends React.Component{
  constructor(props){
      super(props);
      this.state = {name : "", password : ""};
  }

  render(){
    if (this.props.data) {
        return <Redirect to='/profile' />;
    }

    return (
      <div>
        Регистрация
        <form onSubmit={this.onSubmit.bind(this)}>
            <label>
              Введите никнейм
              <input type="text" value={this.state.name} onChange={this.onChangeName.bind(this)}/>
            </label>

            <label>
              Введите пароль
              <input type="password" value={this.state.password} onChange={this.onChangePassword.bind(this)}/>
            </label>

            <button type="submit"> Подтвердить </button>
        </form>

        <Link to="/login"> To Log in </Link>
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

  }

};

export default RegForm;
