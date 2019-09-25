import React from "react";
import axios from "axios";
import Select from "react-select";
import style from "./App.css";

class App extends React.Component{
  constructor(props){
      super(props);
      this.state = {currCodes : [],value : 0,fromCurr : null,toCurr : null,result : 0};
  }

  render(){
    return (
      <div>
        <label>
          Введите код преобразуемой валюты
          <Select options={this.state.currCodes} onChange={this.handleFromCurrChange.bind(this)}/>
        </label>
        <input value={this.state.value} onChange={this.handleValueChange.bind(this)} type="number" className="input_value"/>
        <label>
          Введите код конечной валюты
          <Select options={this.state.currCodes} onChange={this.handleToCurrChange.bind(this)}/>
        </label>
        <button type="submit" onClick={this.handleSubmit.bind(this)} className="input_submit"> Пересчет</button>
        <input value={this.state.result} readOnly={true} className="input_result"/>
      </div>
    )
  }

  componentWillMount(){
    axios.get("/currCodes")
    .then(res => {
      this.setState({currCodes : res.data})
    })
  }

  handleValueChange(event){
    this.setState({value : event.target.value})
  }

  handleFromCurrChange(selectedOption){
    this.setState({fromCurr : selectedOption})
  }

  handleToCurrChange(selectedOption){
    this.setState({toCurr : selectedOption})
  }

  handleSubmit(event){
    var {fromCurr,toCurr,value} = this.state;
    if (!this.checkPropsBeforeRequest()) return;

    axios.post("/convert",{
      fromCurr : fromCurr,
      toCurr : toCurr,
      value : parseFloat(value)
    })
    .then(response => response.data.result)
    .then(result => {
      this.setState({result:result})
    })
    .catch(err => {
      alert(err.message)
    })
  }

  checkPropsBeforeRequest(){
    var {fromCurr,toCurr,value} = this.state;
    if (!fromCurr || !toCurr || !! parseFloat(value) === NaN){
      alert("Введите все параметры!")
      return false
    }
    return true;
  }


};


export default App;
