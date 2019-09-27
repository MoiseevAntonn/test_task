import React from "react";
import {Redirect,Link} from "react-router-dom";
import axios from 'axios'

class LoginForm extends React.Component{
  constructor(props){
      super(props);
      this.state = {name : "",password : ""};
  }

  render(){
    if (this.props.user) {
        return <Redirect to='/profile' />;
    }

    return (
      <div>
        Log in
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

        <Link to="/register"> Зарегистрироваться </Link>
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
      if (response.status === 200) return response.json()
    })
    .then(user => {
      this.props.setUpUser(user);
    })
    .catch(err => {console.log(err)})
  }

};

export default LoginForm;
