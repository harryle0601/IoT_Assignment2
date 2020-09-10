import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import React from 'react';
import { Link } from "react-router-dom";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from "../firebase";
import firebase from "firebase";

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/cars',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
};

const useStyles = makeStyles(theme => ({
    card: {
        overflow: "visible"
    },
    session: {
        position: "relative",
        zIndex: 4000,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    background: {
        backgroundColor: theme.palette.primary.main
    },
    content: {
        padding: `40px ${theme.spacing(1)}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "1 0 auto",
        flexDirection: "column",
        minHeight: "100%",
        textAlign: "center"
    },
    wrapper: {
        flex: "none",
        maxWidth: "400px",
        width: "100%",
        margin: "0 auto"
    },
    fullWidth: {
        width: "100%"
    },
    logo: {
        display: "flex",
        flexDirection: "column"
    }
}));

const Signin = () => {
    const classes = useStyles();
    return (
        <div className={classNames(classes.session, classes.background)}>
            <div className={classes.content}>
                <div className={classes.wrapper}>
                    <Card>
                        <CardContent>
                        <div className={classNames(classes.logo, `text-xs-center pb-xs`)}>
                            <img src={`${process.env.PUBLIC_URL}/static/images/logo-dark.svg`} alt="" className="block" />
                            <Typography variant="caption">Sign in with your app id to continue.</Typography>
                        </div>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                        <div className="pt-1 text-md-center">
                                    <Link to="/forgot">
                                        <Button>Forgot password?</Button>
                                    </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link to="/signup">
                                        <Button>Create new account.</Button>
                                    </Link>
                                </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Signin;

