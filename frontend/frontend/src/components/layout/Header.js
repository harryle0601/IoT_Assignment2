

import React, {Component} from 'react'

class Header extends Component{
render(){
    return(

    <nav>
    <div class="nav-wrapper">
      <a href="/" class="brand-logo">Logo</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="/login">Login</a></li>
   
      </ul>
    </div>
  </nav>
        
    //     <nav>
    //     <ul class="menu">
    //         <li class="logo"><a href="/">ConCho</a></li>
    //         <li class="item"><a href="/">Home</a></li>
    //         <li class="item"><a href="/">About</a></li>
    //         <li class="item"><a href="/">Services</a></li>
    //         <li class="item button"><a href="/login">Log In</a></li>
    //         <li class="item button secondary"><a href="/">Sign Up</a></li>
    //         <li class="toggle"><span class="bars"></span></li>
    //     </ul>
    // </nav>
    );
}



}
export default Header