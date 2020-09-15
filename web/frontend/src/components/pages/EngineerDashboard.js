import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import React from "react";
import { fade, withStyles } from '@material-ui/core/styles'
import { returnCar } from "../store/actions/rentalActions"
import IssueHistory from "../view/issuesHistory"

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

class EngineerDashboard extends React.Component {

    render() {
        const { auth, currentUser, issues } = this.props;
        console.log(this.props)
        if (!auth.uid) return <Redirect to='/signin' />
        else if (currentUser) {
            if (currentUser.Role === "Admin") return <Redirect to='/admin' />
            if (currentUser.Role === "Manager") return <Redirect to='/manager' />
        }
        if (issues) {
            console.log("issues recedived")
            return <IssueHistory {...this.props} issues={issues} currentUser={currentUser} auth={auth}/>;
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
        issues: state.firestore.ordered.issues
    }
}

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect((props) => {
        if (!props.auth.uid) return [];
        else return [
            { collection: 'issues' }
        ]
    }),
)(withStyles(useStyles)(EngineerDashboard))
