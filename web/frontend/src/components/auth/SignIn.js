import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signInEmailPassword, signInGmail, fogotPassword } from '../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { Container, NoSsr, LinearProgress, withStyles ,Card } from '@material-ui/core'
import Button from '../layout/Button';
import GoogleButton from 'react-google-button'
import StyledButton from '../layout/StyledButton'
import "./style.css"
import TextField from '@material-ui/core/TextField';
import { roundTextFieldStylesHook } from '@mui-treasury/styles/textField/round';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
const ColorLinearProgress = withStyles({
    colorPrimary: {
        background: '#ffff'
    },
    barColorPrimary: {
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)"
    }
})(LinearProgress);


const CardLight = (props) => {
    const styles = useLightTopShadowStyles({
      inactive: true, // add this line to disable hover effect
    });
return <Card classes={styles} >{props.renderui}</Card>;
  };




const InputSign =(props)=>{

  const inputBaseStyles = roundTextFieldStylesHook.useInputBase();
  const inputLabelStyles = roundTextFieldStylesHook.useInputLabel();
  const helperTextStyles = roundTextFieldStylesHook.useHelperText();

  return (
<TextField
label={props.label}
         type={props.type} placeholder={props.placeholder} onChange={props.onChange} id={props.id} defaultValue={props.defaultValue}
        InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
        InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
        FormHelperTextProps={{ classes: helperTextStyles }}
      />

);
  }



const initialState = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    logging: false, authError: '',
    isForget: false,
}
class SignIn extends Component {
    state = initialState;
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    validate = () => {
        let emailError = "";
        let passwordError = "";
        if (!this.state.email.includes("@")) 
            emailError = "invalid email";
        if (!this.state.password) 
            passwordError = "Password cannot be blank"
        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
            return false;
        }
        return true;
    }
    validateForget = () => {
        let emailError = '';
        if (!this.state.email.includes("@")) {
            emailError = "Invalid email";
        }
        if (emailError) {
            this.setState({ emailError });
            return false;
        }
        return true;
    }
    handleForget = () => {
        this.setState({ isForget: !this.state.isForget })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ logging: true })
        const isValid = this.validate();
        if (isValid) {
            this.setState(initialState);
        }
        this.props.signIn(this.state)
    }
    handleSignInGmail = (e) => {
        e.preventDefault();
        this.setState(initialState)
        this.props.signInGmail(this.state)
    }
    handleResetPassword = (e) => {
        e.preventDefault();
        const isValid = this.validateForget();
        if (isValid) {
            this.props.fogotPassword(this.state.email)
            this.setState(initialState)
            window.alert('Reset Password Sent !! Check your email')
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.authError !== prevState.authError) {
            if (nextProps.authError === "Incorrect Email or Password") {
            }
            return { authError: nextProps.authError, logging: false };
        }
        else return null;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.authError !== this.props.authError) {
            if (this.props.authError !== undefined || this.props.authError !== null) {
                this.setState({ logging: false })
            }
        }
    }
    render() {
        const { authError, auth, currentUser } = this.props;
        console.log(this.props.auth)
        if (auth.uid) return <Redirect to='/user'/>
        return (
            <div className="base-container">
                <Container style={{ marginTop: "2%", width: "500px" , marginBottom:'2%'}}>
                <CardLight renderui =
                   { <form className="white auth" onSubmit={this.handleSubmit} style={{ padding: "2%" }}>
                        <h1 style={{marginBottom:'80px'}} >Login</h1>
                    
                        <div className="form" style={{ textAlign: 'center',marginBottom:'50px' }}>
                            <div className="form-group" style={{ marginBottom:'10px' }}>
                    
                                <InputSign
                                    required
                                    label ="Email"
                                    type="email"
                                    id='email'
                                    placeholder='Enter your Email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                         
                                />
                                <div style={{ fontSize: 11, color: "red" }}>
                                    {this.state.emailError}
                                </div>
                            </div>
                            {this.state.isForget === false ?
                                <div className="form-group">
                           
                                    <InputSign
                                    label="Password"
                                        type="password"
                                        id='password'
                                        placeholder='Enter your password'
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                    <div style={{ fontSize: 11, color: "red" }}>
                                        {this.state.passwordError}
                                    </div>
                                    <Button color='secondary'
                                    onClick={this.handleForget}>Forget Password?</Button>
                                </div> : <Button color="secondary"
                    size="large"
                    variant="contained" onClick={this.handleForget}>Back</Button>}
                        </div>
                        {this.state.isForget === false ?
                            <div className="input-field">
                                <div className="input-field" style={{display:"flex", justifyContent:"center",alignItems:"center" ,marginBottom:'50px'}}>
                                <NoSsr>
                                    <GoogleButton type="light" onClick={this.handleSignInGmail}/>
                                </NoSsr>
                            </div>
                                <NoSsr>
                                    <Button color="secondary"
                    size="large"
                    variant="contained" style={{marginBottom:'40px'}} onClick={this.handleSubmit}>Login</Button>
                                </NoSsr>                 
                                {this.state.logging ? <ColorLinearProgress style={{ marginBottom: "2%", marginTop: "2%", padding: "5px" }} /> : null}
                                <div className="center red-text">
                                    {authError ? <p>{authError}</p> : null}
                                </div>
                            </div> :
                            <div className="input-field">
                                <NoSsr>
                                    <Button color="secondary"
                    size="large"
                    variant="contained" onClick={this.handleResetPassword}>Confirm</Button>
                                </NoSsr>
                            </div>}
                            
                    </form>}/>
                </Container>
            </div>
        )
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
        signInGmail: () => dispatch(signInGmail()),
        fogotPassword: (email) => dispatch(fogotPassword(email)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
