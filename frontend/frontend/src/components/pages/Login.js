import React, { Component } from 'react';


class Login extends Component{
render(){
return(
<div class="login-div">
      <div class="row">
        <div class="logo"></div>
      </div>
      <div class="row center-align">
        <h5>Sign in</h5>
        <h6>Use your ConCho Account</h6>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="user_name" type="email" class="validate" />
          <lable for="user_name">Email</lable>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password_input" type="password" class="validate" />
          <lable for="password_input">Password</lable>
        </div>
      </div>

      <div class="row">
        <div class="col s6"><a href="sign_up.html">Create Account</a></div>
        <div class="col s6 right-align">
          <a class="waves-effect waves-light btn" href="#"> Login </a>
        </div>
      </div>
    </div>
    
);}}
export default Login;
