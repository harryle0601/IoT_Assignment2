import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signInEmailPassword, signInGmail } from '../store/actions/authActions'
import { Redirect } from 'react-router-dom'

const useStyles = theme => ({
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
});

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }
    handleSubmitEmail = (e) => {
        e.preventDefault();
        this.props.signInGmail()
    }
    render() {
        // const classes = useStyles();
        const { auth, classes } = this.props;
        if (auth.uid) return <Redirect to='/cars/book' />
        return (
            <div className={classNames(classes.session, classes.background)}>
                <div className={classes.content}>
                    <div className={classes.wrapper}>
                        <Card>
                            <CardContent>
                                <form onSubmit={this.handleSubmit}>
                                    <div className={classNames(classes.logo, `text-xs-center pb-xs`)} >
                                        <img src={`${process.env.PUBLIC_URL}/static/images/logo-dark.svg`} alt="" className="block" />
                                        <Typography variant="caption">Sign in with your app id to continue.</Typography>
                                    </div>
                                    <TextField
                                        id="username"
                                        label="Username"
                                        className={classes.textField}
                                        fullWidth
                                        margin="normal"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <TextField
                                        id="password"
                                        label="Password"
                                        className={classes.textField}
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        type="submit"
                                        onClick={this.handleSubmitEmail.bind(this)}
                                    >
                                        Sign in with Google account
                                    </Button>
                                    <div className="pt-1 text-md-center">
                                        <Link to="/forgot">
                                            <Button>Forgot password?</Button>
                                        </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Link to="/signUp">
                                            <Button>Create new account.</Button>
                                        </Link>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signInEmailPassword(creds)),
        signInGmail: () => dispatch(signInGmail())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SignIn));

