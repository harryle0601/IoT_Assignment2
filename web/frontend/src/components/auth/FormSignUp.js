import React, { Component } from 'react'
import { Container, NoSsr } from '@material-ui/core'
import Button from '../layout/Button';
import "./style.css"
import { useRoundInputBaseStyles } from '@mui-treasury/styles/inputBase/round';
import InputBase from '@material-ui/core/InputBase';



const InputSign =(props)=>{

    const styles = useRoundInputBaseStyles();

  return (

    <InputBase style={{marginTop:'8px',marginBottom:'10px'}} type={props.type} classes={styles} placeholder={props.placeholder} onChange={props.onChange} id={props.id} defaultValue={props.defaultValue}/>
);








    
}











const initialState = {
    firstNameError:'',
    lastNameError:'',
    emailError: '',
    passwordError: '',
    rePasswordError: '',
    avatarImgError:'',
    uploading: false
}

class FormSignUp extends Component {
    state = initialState;
    validate = () => {
        let firstNameError = '';
        let lastNameError = '';
        let emailError = '';
        let passwordError = '';
        let rePasswordError = '';
        let avatarImgError = '';

        if (!this.props.values.firstName) {
            firstNameError = "First name cannot be blank"
        }

        if (!this.props.values.lastName) {
            lastNameError = "Last name cannot be blank"
        }

        if (!this.props.values.email.includes("@")) {
            emailError = "Invalid Email";
        }

        if (!this.props.values.password) {
            passwordError = "Password cannot be blank"
        }

        if (!this.props.values.rePassword || this.props.values.rePassword !== this.props.values.password ){
            rePasswordError = "Password does not match"
        }

        if(this.props.values.avatarImg === null ){
            avatarImgError = 'Avatar cannot be blank'
        }

        if (firstNameError || lastNameError || emailError || passwordError || rePasswordError || avatarImgError ) {
            this.setState({ firstNameError, lastNameError, emailError, passwordError, rePasswordError, avatarImgError });
            return false;
        }
        return true;

    }
    continue = e => {
        const isValid = this.validate();
        if (isValid) {
            this.setState(initialState);
            e.preventDefault();
            this.setState({ uploading: true });
            this.props.handleUploadAvatar(e);
            this.props.nextStep();
        }
    }
    render() {
        const { values, handleChange, handleChangeAvatar } = this.props;
        console.log(this.state)
        return (
            <div className="base-container">
                
                    <form className="white auth"
                        // onSubmit={this.handleSubmit} 
                        style={{ padding: "2%" }}>
            
                        {/* <div className="image">
                            <img src="handshake.png"></img>
                        </div> */}
                        <div className="form" style={{ textAlign: 'left', alignSelf: 'stretch' }}>
                            <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                                <div className="input-field">                                   
                                    <InputSign type="text" id='firstName' placeholder="Enter your first name" onChange={handleChange('firstName')} defaultValue={values.firstName}  />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.firstNameError} </div>
                                </div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                                <div className="input-field">
                                    <InputSign type="text" id='lastName' placeholder="Enter your last name" onChange={handleChange('lastName')} defaultValue={values.lastName} />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.lastNameError} </div>
                                </div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="email">Email</label>
                                <div className="input-field">
                                    <InputSign type="email" id='email' placeholder="Enter your email" onChange={handleChange('email')} defaultValue={values.email} />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.emailError} </div>
                                </div>
                                
                            </div>
                            <div className="form-group">
                            <label htmlFor="password">Password</label>
                                <div className="input-field">
                                    <InputSign type="password" id='password' placeholder="Enter your password" onChange={handleChange('password')} defaultValue={values.password} />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.passwordError} </div>
                                </div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="rePassword">Re-enter Password</label>
                                <div className="input-field">
                                    <InputSign type="password" id='rePassword' placeholder="Re-enter your password" onChange={handleChange('rePassword')} defaultValue={values.rePassword} />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.rePasswordError} </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image" style={{marginBottom:'20px'}} >Avatar</label>
                                <br />
                                <input
                                    defaultValue={values.image}
                                    onChange={handleChangeAvatar}
                                    type="file"
                                    id='avatar'
                                    
                                    style={{marginBottom:'50px',display:'none'}}
                                />
                                 <label htmlFor="avatar">
        <Button style={{marginBottom:'25px',marginTop:'5px', marginLeft:'21%'}} variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>



                                <div style={{ fontSize: 11, color: "red" }}> {this.state.avatarImgError} </div>
                            </div>
                            <div className="input-field" style={{ textAlign: 'center'}}>
                                <NoSsr>
                                    <Button color="secondary"
                    size="large"
                    variant="contained" onClick={this.continue}>Continue</Button>
                                </NoSsr>
                                <div className="center red-text">
                                    {this.state.authError ? <p>{this.state.authError}</p> : null}
                                </div>
                            </div>
                        </div>
                    </form>
       
            </div>
        )
    }
}

export default FormSignUp
