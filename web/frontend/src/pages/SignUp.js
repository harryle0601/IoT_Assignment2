import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { auth, db } from "../firebase";
import { red } from "@material-ui/core/colors";

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


class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            cpassword: "",
            errMessage: ""
        }
    }

    validatePassword() {
        if (this.state.password !== this.state.cpassword) 
            return false
        return true
    }

    createNewUser() {
        var errMessage = ""
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(function success(userData){
            console.log("created new user");
            var uid = userData.user.uid; // The UID of recently created user on firebase
            console.log(uid)
            var email = userData.user.email;
            console.log(email)
            var emailVerified = userData.user.emailVerified;
            var photoURL = userData.user.photoURL;
            var user = {
                Email: email,
                Role: "User"
            }
            db.collection("users").doc(uid).set(user)
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("error code " + errorCode);
            console.log("error message " + errorMessage);
            if (errorCode == "auth/email-already-in-use") {
                errMessage = errorMessage
            }
        });
        this.setState({
            errMessage: errMessage
        });
    }

    submitHandler = (event) => {
        console.log("Start creating user")
        if (this.validatePassword()) this.createNewUser()
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
        console.log("name ", name, " value ", value);
    }

    render() {
        const { classes } = this.props;
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
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                    <TextField
                                        id="password"
                                        label="Password"
                                        className={classes.textField}
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                        value={this.state.password}
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                    <TextField
                                        id="cpassword"
                                        label="Confirm Password"
                                        className={classes.textField}
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                        value={this.state.cpassword}
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                    <div className="invalid" style={{
                                        display: ((this.state.password === this.state.cpassword) ? "none" : "block"),
                                        color: red
                                    }}>Confirm Password Must Matched</div>
                                    <div className="invalid" style={{
                                        display: ((this.state.errMessage === "") ? "none" : "block"),
                                        color: red
                                    }}>{this.state.errMessage}</div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        type="submit"
                                        onClick={this.submitHandler}
                                        disabled={this.state.password !== this.state.cpassword}
                                    >
                                        Create your account
                                    </Button>
                                    <div className="pt-1 text-xs-center">
                                        <Link to="/forgot">
                                            <Button>Forgot password?</Button>
                                        </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Link to="/">
                                            <Button>Access your account.</Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(SignUp);
