import React from "react";
import { connect } from 'react-redux'
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, Grid, MenuItem } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { uploadToStorage } from '../store/actions/uploadAction'
import { editProfile } from '../store/actions/userActions'

const useStyles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%"
    },
    menu: {
        width: 200,
    },
    imageContainer: {
        display: 'block',
        position: 'relative',
        zIndex: 2,
    },
    image: {
        marginTop: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        zIndex: 10,
        width: '100%',
        maxHeight: '600px',
        minHeight: '400px',
        objectFit: 'cover',
    }
});

class BookingDialog extends React.Component {
    constructor() {
        super();
        this.state = {
            dialog: false,
            available: "Idle",
            firstName: '',
            lastName: '',
            phone: '',
            address: "",
            userImg: '',
            isUploading: false
        }
    }

    handleInputChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleChangeImage = (e) => {
        console.log(e.target)
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ userImg: image });
        }
    }

    handleClickDialog(e) {
        this.setState({ dialog: true })
    }

    handleCloseDialog(e) {
        this.setState({ dialog: false })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.uploadToStorage({
            image: this.state.userImg,
            path: "/users/"})
        this.setState({
            isUploading: true
        })
    }

    componentDidUpdate(prevProp, prevState) {
        console.log("current user", this.props.currentUser)
        if (this.props.userImg && this.state.isUploading) {
            var avatar = this.props.userImg
            if (avatar === "https://firebasestorage.googleapis.com/v0/b/iotassignment2-d4c67.appspot.com/o/cars%2Fno-image.png?alt=media&token=c82408de-0396-4c2f-b0a3-1cc5fd127215" && this.props.currentUser.Avatar) {
                avatar = this.props.currentUser.Avatar
            }

            var newUser = {
                Email: this.props.currentUser.Email,
                FirstName: (this.state.firstName ? this.state.firstName : this.props.currentUser.FirstName),
                LastName: (this.state.lastName ? this.state.lastName : this.props.currentUser.LastName),
                Address: (this.state.address ? this.state.address : this.props.currentUser.Address),
                Phone: (this.state.phone ? this.state.phone : this.props.currentUser.Phone),
                Avatar: avatar
            }
            this.props.editProfile(newUser, this.props.currentUser.id)
            this.setState({
                isUploading: false,
                dialog: false
            })
        }
    }

    render() {
        const { currentUser, auth, userImg } = this.props
        return (
            <div>
                <MenuItem style={{ color: "black" }} onClick={this.handleClickDialog.bind(this)}><Button variant='outlined'>Edit Profile</Button></MenuItem>
                <Dialog
                    fullWidth={true}
                    maxWidth={"md"}
                    open={this.state.dialog}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="responsive-dialog-title">
                    <Grid container style={{ margin: '1%', width: 'fit-content', marginLeft: '2%' }}>
                        <form className="white"
                            style={{ padding: "2%" }}>
                            <div className="form" style={{ textAlign: 'left', alignSelf: 'stretch' }}>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <div className="input-field">
                                        <input type="text" id='firstName' placeholder="First Name" onChange={this.handleInputChange.bind(this)} defaultValue={currentUser ? currentUser.FirstName ? currentUser.FirstName : "" : ""} />
                                        <div style={{ fontSize: 11, color: "red" }}> {this.state.firstNameError} </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <div className="input-field">
                                        <input type="text" id='lastName' placeholder="Last Name" onChange={this.handleInputChange.bind(this)} defaultValue={currentUser ? currentUser.LastName ? currentUser.LastName : "" : ""} />
                                        <div style={{ fontSize: 11, color: "red" }}> {this.state.lastNameError} </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Phone</label>
                                    <div className="input-field">
                                        <input type="email" id='phone' placeholder="Phone" type="numeric" onChange={this.handleInputChange.bind(this)} defaultValue={currentUser ? currentUser.Phone ? currentUser.Phone : "" : ""} />
                                        <div style={{ fontSize: 11, color: "red" }}> {this.state.phoneError} </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Address</label>
                                    <div className="input-field">
                                        <input type="text" id='address' placeholder="Address" onChange={this.handleInputChange.bind(this)} defaultValue={currentUser ? currentUser.LastName ? currentUser.LastName : "" : ""} />
                                        <div style={{ fontSize: 11, color: "red" }}> {this.state.addressError} </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image" >Image</label>
                                    <br />
                                    <input
                                        onChange={this.handleChangeImage}
                                        type="file" id='userImg'
                                    />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.avatarImgError} </div>
                                </div>
                            </div>
                        </form>
                        <Grid container
                            justify="flex-end" style={{ marginRight: "50px" }}>
                            <DialogActions>
                                <Button autoFocus onClick={this.handleCloseDialog.bind(this)} color="primary">Cancel</Button>
                                <Button onClick={(e) => this.handleSubmit(e)} color="primary" autoFocus>
                                Apply change
                            </Button>
                            </DialogActions>
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const url = state.uploadReducer.url ? state.uploadReducer.url : null
    console.log("url", url)
    if (url !== undefined && url !== null) 
        if (url.path === '/users/' || (url.path === '/users/' && url.url === "https://firebasestorage.googleapis.com/v0/b/iotassignment2-d4c67.appspot.com/o/cars%2Fno-image.png?alt=media&token=c82408de-0396-4c2f-b0a3-1cc5fd127215")) 
            sessionStorage.setItem("userImg", url.url);
        
    return {
        progress: state.uploadReducer.progress,
        userImg: sessionStorage.getItem("userImg")
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadToStorage: (file) => dispatch(uploadToStorage(file)),
        editProfile: (user, id) => dispatch(editProfile(user, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(BookingDialog))