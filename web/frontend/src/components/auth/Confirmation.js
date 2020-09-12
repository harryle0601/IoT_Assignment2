import React, { Component } from 'react'
import { Container, NoSsr, LinearProgress, withStyles } from '@material-ui/core'
import StyledButton from '../layout/StyledButton'
import "./style.css"

const initialState = {
    passwordError: '',
}

export class Confirmation extends Component {

    state = initialState;

    validate = () => {
        let passwordError = '';

        if (!this.props.values.password) passwordError = "Password does not match";

        if (passwordError) {
            this.setState({ passwordError })
            return false;
        }
        return true;
    }

    continue = e => {
        const isValid = this.validate();
        if (isValid) {
            this.setState(initialState);
            e.preventDefault();
            this.props.handleSubmit(e);
            this.props.nextStep();
        }

    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { values: { firstName, lastName, email } } = this.props;
        return (
            <div className="base-container">
                <Container style={{ marginTop: "2%", width: "500px" }}>
                    <form className="white auth"
                        // onSubmit={this.handleSubmit} 
                        style={{ padding: "2%" }}>
                        <div className="header">Confirm sign up</div>
                        <div className="image">
                            <img src="handshake.png"></img>
                        </div>
                        <div className="form" style={{ textAlign: 'left', alignSelf: 'stretch' }}>
                            <div className="form-group">
                                <label htmlFor="firstName" >First Name</label>
                                <p>{firstName}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" >Last Name</label>
                                <p>{lastName}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" >Email</label>
                                <p>{email}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" >Password</label>
                                <p>********</p>
                            </div>
                        </div>
                        <div className="input-field">
                            <NoSsr>
                                <StyledButton onClick={this.continue}>Confirm and Continue</StyledButton>
                            </NoSsr>
                            {/* {this.state.logging ? <ColorLinearProgress style={{ marginBottom: "2%", marginTop: "2%", padding: "5px" }} /> : null} */}
                            <div className="center red-text">
                                {this.state.authError ? <p>{this.state.authError}</p> : null}
                            </div>
                        </div>
                        <div className="input-field">
                            <NoSsr>
                                <StyledButton onClick={this.back}>Back</StyledButton>
                            </NoSsr>
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}

export default Confirmation
