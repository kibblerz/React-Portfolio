import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import * as pageContent from './pageContent.js';
let page = null;

function App() {

  return (
    <BodyContent />
  );

}

class Card extends React.Component{
  constructor(props){
    super(props);
    

    this.state = {
      "id" : "",
      "content" : this.props.pname,
      "classes" : this.props.classes,
      "cEvent" : this.clicked,
    }
  }

  static getDerivedStateFromProps(props, state){
    return {
      id : props.id,
    }
  }

  componentDidUpdate(){
    if(this.state.classes !== this.props.classes){
      this.setState((state, props) => {
        return {classes: this.props.classes}
      });
    }

    if (this.state.classes === "activated" && this.state.content !== this.props.content){
      this.setState((state, props) => {
        return {content: this.props.content}
      })
    }

    if(this.state.classes === "inactive" && this.state.content !== this.props.pname){
      this.setState((state, props) => {
        return {content: this.props.pname}
      });
    }
  }

  render (){
    return(
      <div class={this.state.classes} id={this.state.id} onClick= {() => this.props.handleClick(this.props.id, this.state.classes)}>{this.state.content}</div>
    );
  }

}

class BodyContent extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      item1 : "inactive",
      item2 : "inactive",
      item3 : "inactive",
      item4 : "inactive",
      item5 : "inactive",
    }
  }

  handleClick(cardID, isActive){
    var aString;
    if(isActive == "activated"){
      aString = "inactive";
    } else {
      aString = "activated";
    }
    this.setState((state, props) => {
      return {
        item1 : "inactive",
        item2 : "inactive",
        item3 : "inactive",
        item4 : "inactive",
        item5 : "inactive",
        [cardID]: aString,
      }
    });
  }

  render (){
    const App = (<div id="bodyContainer">
      <div id="Header"><h3>Russ Websites</h3></div>
      <Card classes={this.state.item1} handleClick={this.handleClick} id="item1" pname="Why Your Website Matters" content={pageContent.WhyContent()} />
      <Card classes={this.state.item2} handleClick={this.handleClick} id="item2" pname="Search Engine Optimization" content={pageContent.SeoContent()} />
      <Card classes={this.state.item3} handleClick={this.handleClick} id="item3" pname="Responsive Design" content={pageContent.ResponsiveContent()} />
      <Card classes={this.state.item4} handleClick={this.handleClick} id="item4" pname="Ecommerce" content={pageContent.EcommerceContent()} />
      <Card classes={this.state.item5} handleClick={this.handleClick} id="item5" pname="Analytics" content={pageContent.AnalyticsContent()} />
      <div><h3>Contact Me</h3></div>
    </div>)
    return App;
  };
}

export default App;
