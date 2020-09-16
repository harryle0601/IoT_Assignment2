import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles, useTheme, AppBar, Toolbar, Typography } from '@material-ui/core'
import SignedOutLinks from './SignedOutLinks'
import SignedInLinks from './SignedInLinks'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        color: "black"
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = (props) => {
    console.log('navbar', props)
    const { auth } = props;
    const classes = useStyles();
    const links = auth.uid ? <SignedInLinks props={props}/> : <SignedOutLinks/>;

    return (
        <div >
            <AppBar position="fixed"
                style={{ background: '#393e46', boxShadow: 'none' }}>
                <Toolbar>
                    <Link to="/">
                        <img src='/logo.png' alt='logo' style={{paddingTop:'5px'}} height='65px'></img>
                    </Link>
                    <div className={classes.root} />
                    {links}
                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)