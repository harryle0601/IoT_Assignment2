import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/authActions'

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

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        cpassword: "",
        errMessage: ""
    }
    validatePassword() {
        if (this.state.password !== this.state.cpassword)
            return false
        return true
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }
    render() {
        const { auth, authError, classes } = this.props;
        if (auth.uid) return <Redirect to='/cars/book' />
        return (
            <div className={classNames(classes.session, classes.background)}>
                <div className={classes.content}>
                    <div className={classes.wrapper}>
                        <Card>
                            <CardContent>
                                <div>
                                    <div className={classNames(classes.logo, `text-xs-center pb-xs`)}>
                                        <img src={`${process.env.PUBLIC_URL}/static/images/logo-dark.svg`} alt="" />
                                        <Typography variant="caption">
                                            Create an app id to continue.
                                        </Typography>
                                    </div>
                                    <TextField
                                        id="email"
                                        label="Email address"
                                        className={classes.textField}
                                        fullWidth
                                        margin="normal"
                                        value={this.state.email}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <TextField
                                        id="password"
                                        label="Password"
                                        className={classes.textField}
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                        value={this.state.password}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <TextField
                                        id="cpassword"
                                        label="Confirm Password"
                                        className={classes.textField}
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                        value={this.state.cpassword}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    <div className="invalid" style={{
                                        display: ((this.state.password === this.state.cpassword) ? "none" : "block"),
                                        color: red
                                    }}>Confirm Password Must Matched</div>
                                    <div className="invalid" style={{
                                        display: ((authError === "") ? "none" : "block"),
                                        color: red
                                    }}>{authError}</div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        type="submit"
                                        onClick={this.handleSubmit}
                                        disabled={this.state.password !== this.state.cpassword}
                                    >
                                        Create your account
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SignUp))
