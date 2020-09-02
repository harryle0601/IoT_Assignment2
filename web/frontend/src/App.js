import React, { Component } from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import './App.css';
import Header from './components/layout/Header';
import Homepage from './components/pages/Hompage';
import Login from './components/pages/Login';

class App extends Component{
render(){
return(
<BrowserRouter>
<div className="App">
<Header/>
<Switch>
<Route exact path="/" component={Homepage}/>
<Route path="/login" component={Login}/>
</Switch>
</div>
</BrowserRouter>
);}}
export default App;
