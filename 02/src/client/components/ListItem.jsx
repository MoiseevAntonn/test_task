import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

class ListItem extends React.Component{

  render(){
    return (
      <li>
        {this.props.link.longlink} : <input maxLength={"40"} value={this.props.link.shortlink} readOnly={true}/>,  количество переходов : {this.props.link.count}
      </li>
    )
  }

};

export default ListItem;
