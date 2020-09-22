import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/authActions'
import "./style.css"
import FormSignUp from './FormSignUp'
import Confirm from './Confirmation'
import Success from './Success'
import { uploadToStorage } from '../store/actions/uploadAction'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Card, Container } from '@material-ui/core'
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';

const CardLight = (props) => {
    const styles = useLightTopShadowStyles({
        inactive: true, // add this line to disable hover effect
    });
    return <Card classes={styles} >{props.renderui}</Card>;
};

const initialState = {
    step: 1,
    progress: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    avatarImg: null,
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: '',
    rePasswordError: '',
    avatarImgError: '',
    logging: false, authError: '',
}

class SignUp extends Component {
    state = initialState;
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }
    handleChange = input => e => {
        e.preventDefault();
        this.setState({ [input]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const userInfo = {
            ...this.state,
            avatar: this.props.avatar
        }
        console.log(userInfo)
        this.props.signUp(userInfo);
    }
    handleChangeAvatar = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ avatarImg: image });
        }
    }
    handleUploadAvatar = (e) => {
        e.preventDefault();
        const { avatarImg } = this.state;
        if (avatarImg !== undefined && avatarImg !== null) {
            const file = {
                image: avatarImg,
                path: '/users/'
            }
            this.props.uploadToStorage(file)
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.progress !== this.props.progress) {
            console.log('loading work')
            this.setState({ progress: this.props.progress })
        }
        if (prevProps.authError !== this.props.authError) {
            if (this.props.authError !== undefined || this.props.authError !== null) {
                this.setState({ logging: false })
            }
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.progress !== prevState.progress) {
            return { progress: nextProps.progress };
        }
        else return null;
    }

    render() {
        console.log(this.state)
        const { step, firstName, lastName, email, password, rePassword, image, url, progress } = this.state;
        const { auth, authError, currentUser, avatar } = this.props;
        const values = { firstName, lastName, email, password, rePassword, image, url, progress }
        const { firstNameError, lastNameError, emailError, passwordError, rePasswordError, avatarImgError } = this.state
        const error = { firstNameError, lastNameError, emailError, passwordError, rePasswordError, avatarImgError }

        if (auth.uid) return <Redirect to='/user' />

        switch (step) {
            case 1:
                const renderui = <div><h1 className="header" style={{ marginBottom: '50px', marginTop: '40px' }}>Sign Up</h1><FormSignUp
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    handleChangeAvatar={this.handleChangeAvatar}
                    handleUploadAvatar={this.handleUploadAvatar}
                    values={values}
                    error={error}
                /></div>
                return (
                    
                    <Container style={{ marginTop: "2%", width: "500px",marginBottom:'100px' }}>
                    
                                    
                                    <CardLight renderui ={renderui}/>
                    </Container>
                )
            case 2:
                return (
                    <Container style={{ marginTop: "2%", width: "500px",marginBottom:'100px' }}>
                    
                                    
                                    <CardLight renderui ={<Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        values={values}
                        error={error}
                    /> }/>
                   
                    </Container>
                )
            case 3:
                return (
                    <Container style={{ marginTop: "2%", width: "500px",marginBottom:'100px' }}>
                    
                                    
                    <CardLight renderui ={ <Success
                        prevStep={this.prevStep}
                    />}/>
                   
                    </Container>
                )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const url = state.uploadReducer.url ? state.uploadReducer.url : null
    if (url !== undefined && url !== null)
        if (url.path === '/users/')
            sessionStorage.setItem("userAvatar", url.url);

    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        progress: state.uploadReducer.progress,
        avatar: sessionStorage.getItem("userAvatar")
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds)),
        uploadToStorage: (file) => dispatch(uploadToStorage(file))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)