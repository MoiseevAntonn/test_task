import React from "react";
import axios from "axios";

class Profile extends React.Component{
  constructor(props){
      super(props);
      this.state = {longLink : ""};
  }

  render(){
    return (
      <div>
        { "Привет ! " + this.props.data.user.name}
        <div>
          <label>Создать ссылку
            <form onSubmit={this.onSubmit.bind(this)}>
              <input type="text" value={this.state.longLink} onChange={this.onChangeLink.bind(this)}/>
              <button type="submit"> Создать </button>
            </form>
           </label>
         </div>

         <ul>
          {this.props.data.links.map(link => <li key={link.shortLink}> {link.longLink + " : " + link.shortLink} </li>)}
         </ul>
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
    axios.post("/createLink",{
      longLink : this.state.longLink,
      id : this.props.data.user.id
    })
  }

  componentWillMount(){
    axios.post("/login")
  }


};

export default Profile;
