import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import './App.css';
import Navbar from './components/layout/NavBar'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import UserDashboard from './components/pages/UserDashboard';
import AdminDashboard from './components/pages/AdminDashboard';
import EngineerDashboard from './components/pages/EngineerDashboard';
import ManagerDashboard from './components/pages/ViewStats';

class App extends Component {
    render() {
        const { currentUser, currentUserRentalList } = this.props
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar currentUser={currentUser} currentUserRentalList={currentUserRentalList}/>
                    <div style={{ paddingTop: "100px"}}>
                        <Switch >
                            <Route exact path="/" component={SignIn} />
                            <Route exact path="/signin" component={SignIn} />
                            <Route exact path="/signup" component={SignUp} />
                            <Route path='/user' component={(props) => <UserDashboard {...props}/>} />
                            <Route path='/engineer' component={(props) => <EngineerDashboard {...props}/>} />
                            <Route path='/admin' component={(props) => <AdminDashboard {...props}/>}/>
                            <Route path='/manager' component={(props) => <ManagerDashboard {...props}/>} />
                        </Switch>
                    </div>              
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    const users = state.firestore.ordered.currentUser
    const currentUser = users ? users[0] : null
    const userRentalList = state.firestore.ordered.currentUserRentalList
    const currentUserRentalList = userRentalList ? userRentalList : null

    return {
        auth: state.firebase.auth,
        currentUser: currentUser,
        currentUserRentalList: currentUserRentalList
    }
};

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect((props) => {
        if (!props.auth.uid) return [];
        else return [
            { collection: 'users', doc: props.auth.uid, storeAs: 'currentUser' }
        ]
    })
)(App);