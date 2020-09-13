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
                style={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Link to="/">
                        <h3>IoT Final</h3>
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