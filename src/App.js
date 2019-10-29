import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
//pageContent contains the content for each of the cards
import * as pageContent from './pageContent.js';
let page = null;

function App() {

  return (
    <BodyContent />
  );

}
//Custom Class for Card Components, Made so each page makes an instance of the same class with the Name, Content, and ID passed as props
class Card extends React.Component{
  constructor(props){
    super(props);
    
//Setting initial state of cards to display the page name and initial class to be inactive, also binds the click event as state
    this.state = {
      "id" : "",
      "content" : this.props.pname,
      "classes" : this.props.classes,
      "cEvent" : this.clicked,
    }
  }
//ID shouldn't change, using this to keep the ID set to the one passed in props
  static getDerivedStateFromProps(props, state){
    return {
      id : props.id,
    }
  }
//Checks if class changed on component update
  componentDidUpdate(){
//If the state class is not equal to the props class passed by the BodyContent Parent component, state is changed
    if(this.state.classes !== this.props.classes){
      this.setState((state, props) => {
        return {classes: this.props.classes}
      });
    }
//If state classes is set to activated, yet the content state is still set to the pname prop, content state is changed to content prop
    if (this.state.classes === "activated" && this.state.content !== this.props.content){
      this.setState((state, props) => {
        return {content: this.props.content}
      })
    }
//If state classes is set to inactive, yet the state 'content' is still set to the prop 'content', state 'content' is set to prop 'pname'
    if(this.state.classes === "inactive" && this.state.content !== this.props.pname){
      this.setState((state, props) => {
        return {content: this.props.pname}
      });
    }
  }
//Returns a render for a div object with the state variables passed in, and calls handleClick method from BodyContent component
  render (){
    return(
      <div class={this.state.classes} id={this.state.id} onClick= {() => this.props.handleClick(this.props.id, this.state.classes)}>{this.state.content}</div>
    );
  }

}
//Parent Class created as container for Card classes
class BodyContent extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
//these state variables keep track of which cards have the activated class
    this.state = {
      item1 : "inactive",
      item2 : "inactive",
      item3 : "inactive",
      item4 : "inactive",
      item5 : "inactive",
    }
  }
//handleClick is binded to BodyContent Class and Called from Card Class. Set to Ensure only one card is activated at a time
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
//Renders each item as a component based on card class while passing in handleClick as a prop to be called in child components
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
