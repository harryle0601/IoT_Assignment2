import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import React from "react";
import { Tabs, Tab } from '@material-ui/core';
import { Container } from "@material-ui/core"
import { fade, withStyles } from '@material-ui/core/styles'
import { TabPanel, a11yProps } from '../layout/Tabs'
import SearchCar from "../view/searchCar"
import RentalHistory from "../view/rentalHistory"
import IssueHistory from "../view/issuesHistory"
import UsersList from "../view/usersList"

const useStyles = theme => ({
    search: {
        marginTop: '3%',
        backgroundColor: fade(theme.palette.common.white, 0.75),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.95),
        },
        display: 'flex',
        border: `1px solid ${'#dfe1e5'}`,
        boxShadow: '0 16px 40px -12.125px rgba(0,0,0,0.3)',
        borderRadius: 100,
        padding: `${theme.spacing(1) / 4}`,
        height: '50px',
        margin: 'auto',
        width: '482px'

    },
    searchIcon: {
        marginTop: '-5px',
        padding: `${theme.spacing(1) / 2}px ${theme.spacing(1)}px`,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 100,

    },
    inputRoot: {
        color: 'inherit',
        width: '85%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`
    },
    root: {
        display: 'flex',
        maxWidth: '500px',
        justifyContent: 'center',

    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '300px',
        height: '300px'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    container: {
        padding: "10px 10px 10px 10px",
        borderRadius: "16px",
        backgroundColor: "white",
        maxHeight: '100%'
    },
    filterContent: {
        marginTop: "20px"
    }
});

class AdminDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            tab: 0
        }
    }

    handleTabChange = (e, value) => {
        this.setState({ tab: value });
    }

    handleRemove = (e, rental) => {
        var d = new Date().getTime();
        this.props.returnCar(rental, d)
    }

    render() {
        const { auth, classes, cars, currentUser, rental, issues, users } = this.props;
        const { tab } = this.state
        if (!auth.uid) return <Redirect to='/signin' />
        else if (currentUser) {
            if (currentUser.Role === "Engineer") return <Redirect to='/engineer' />
            if (currentUser.Role === "Manager") return <Redirect to='/manager' />
        }
        if (cars && rental && issues && users) {
            return (
                <Container>
                    <Tabs
                        orientation="horizontal"
                        value={tab}
                        onChange={this.handleTabChange}
                        className={classes.tabs}
                        justify="center"
                    >
                        <Tab label="Search Car" {...a11yProps(0)} />
                        <Tab label="Rental History" {...a11yProps(1)} />
                        <Tab label="Issues History" {...a11yProps(2)} />
                        <Tab label="Users Informations" {...a11yProps(3)} />
                    </Tabs>
                    <div>
                        <TabPanel value={tab} index={0}>
                            {(props) => <SearchCar {...props} cars={cars} currentUser={currentUser} auth={auth}/>}
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            {(props) => <RentalHistory {...props} rental={rental} currentUser={currentUser} auth={auth}/>}
                        </TabPanel>
                        <TabPanel value={tab} index={2}>
                            {(props) => <IssueHistory {...props} issues={issues} currentUser={currentUser} auth={auth}/>}
                        </TabPanel>
                        <TabPanel value={tab} index={3}>
                            {(props) => <UsersList {...props} users={users} currentUser={currentUser} auth={auth}/>}
                        </TabPanel>
                    </div>
                </Container>
            );
        }
        return (<div></div>)
    }
}

const mapStateToProps = (state) => {
    const cu = state.firestore.ordered.currentUser
    const currentUser = cu ? cu[0] : null
    return {
        currentUser: currentUser,
        auth: state.firebase.auth,
        cars: state.firestore.ordered.cars,
        rental: state.firestore.ordered.rental,
        issues: state.firestore.ordered.issues,
        users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect((props) => {
        if (!props.auth.uid) return [];
        else return [
            { collection: 'cars' },
            { collection: 'rental' },
            { collection: 'issues' },
            { collection: 'users'}
        ]
    }),
)(withStyles(useStyles)(AdminDashboard))
