import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BookCar from './pages/BookCar';
// import SearchCar from './pages/SearchCars';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={SignIn} />
                        <Route exact path="/signUp" component={SignUp} />
                        {/* <Route path="/cars/search" component={SearchCar} /> */}
                        <Route path="/cars/book" component={BookCar} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
export default App;
