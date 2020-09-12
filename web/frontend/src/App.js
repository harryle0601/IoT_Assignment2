import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import './App.css';
import Navbar from './components/layout/NavBar'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import SearchCar from './components/pages/SearchCars';
import AdminDashboard from './components/pages/AdminDashboard';
import ViewStatistic from './components/pages/ViewStats';
import ViewIssues from './components/pages/ViewIssues';

class App extends Component {
    render() {
        const { currentUser, carList, issuesList, rentalList, currentUserRentalList, statsList } = this.props
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar currentUser={currentUser} currentUserRentalList={currentUserRentalList}/>
                    <div style={{ paddingTop: "140px"}}>
                        <Switch >
                            <Route exact path="/signin" component={SignIn} />
                            <Route exact path="/signup" component={SignUp} />
                            <Route path='/user' component={(props) => <SearchCar {...props}/>} />
                            <Route path='/engineer' component={(props) => <ViewIssues {...props} currentUser={currentUser} issuesList={issuesList}/>} />
                            <Route path='/admin' component={(props) => <AdminDashboard {...props} currentUser={currentUser} carList={carList} issuesList={issuesList} rentalList={rentalList}/>} />
                            <Route path='/manager' component={(props) => <ViewStatistic {...props} currentUser={currentUser} statsList={statsList}/>} />
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
            { collection: 'users', doc: props.auth.uid, storeAs: 'currentUser' },
            { collection: 'rental', where:[['user', '==',  props.auth.uid]],queryParams:['orderByChild=RentDate'] , storeAs: 'currentUserRentalList' }
        ]
    })
)(App);