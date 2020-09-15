import React from "react";
import { connect } from 'react-redux'
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, Grid } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { addCar, editCar } from "../store/actions/carActions"
import { uploadToStorage } from '../store/actions/uploadAction'

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
            available: true,
            brand: '',
            seats: '',
            model: '',
            color: '',
            price: '',
            carImg: '',
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
            this.setState({ carImg: image });
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
            image: this.state.carImg,
            path: "/cars/"})
        this.setState({
            uploading: true
        })
    }

    componentDidUpdate(prevProp, prevState) {
        console.log("open prevpreisa sate", this.props.car, this.state.uploading)
        if (this.props.carImg && this.state.uploading && !prevState.uploading) {
            var carImage = this.props.carImg
            if (carImage === "https://firebasestorage.googleapis.com/v0/b/iotassignment2-d4c67.appspot.com/o/cars%2Fno-image.png?alt=media&token=c82408de-0396-4c2f-b0a3-1cc5fd127215" && this.props.car.Image) {
                carImage = this.props.car.Image
            }

            var newCar = {
                Available: (this.state.available ? this.state.available : this.props.car.Available),
                Brand: (this.state.brand ? this.state.brand : this.props.car.Brand),
                Seats: (this.state.seats ? this.state.seats : this.props.car.Seats),
                Model: (this.state.model ? this.state.model : this.props.car.Model),
                Color: (this.state.color ? parseInt(this.state.color) : this.props.car.Color),
                Price: (this.state.price ? parseInt(this.state.price) : this.props.car.Price),
                Image: carImage
            }
            console.log("readyly printed car", this.props.car.id, newCar)
            if (this.props.car) this.props.editCar(newCar, this.props.car.id)
            else this.props.addCar(newCar)
            this.setState({
                dialog: false
            })
        }
    }

    render() {
        const { car, carImg } = this.props
        console.log("open edit dialog", car, this.state.uploading)
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickDialog.bind(this)}>{car ? "Edit car" : "Add new car"}</Button>
                <Dialog
                    fullWidth={true}
                    maxWidth={"md"}
                    open={this.state.dialog}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="responsive-dialog-title">
                    <h4 style={{ margin: '40px' }}>{car ? car.Brand + " " + car.Model : "Add new car"}</h4>
                    <Grid container style={{ margin: '1%', width: 'fit-content', marginLeft: '2%' }}>
                        <form className="white"
                            style={{ padding: "2%" }}>
                            <div className="form" style={{ textAlign: 'left', alignSelf: 'stretch' }}>
                                <div className="form-group">
                                    <label htmlFor="firstName">Brand Name</label>
                                    <div className="input-field">
                                        <input type="text" id='brand' placeholder="Brand name" onChange={this.handleInputChange.bind(this)} defaultValue={car ? car.Brand : ""} />
                                        <div style={{ fontSize: 11, color: "red" }}> {this.state.firstNameError} </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Model name</label>
                                    <div className="input-field">
                                        <input type="text" id='model' placeholder="Model name" onChange={this.handleInputChange.bind(this)} defaultValue={car ? car.Model : ""} />
                                        <div style={{ fontSize: 11, color: "red" }}> {this.state.lastNameError} </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Color</label>
                                    <div className="input-field">
                                        <input type="email" id='color' placeholder="Color" onChange={this.handleInputChange.bind(this)} defaultValue={car ? car.Color : ""} />
                                        <div style={{ fontSize: 11, color: "red" }}> {this.state.emailError} </div>
                                    </div>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Seats</label>
                                    <div className="input-field">
                                        <input type="numeric" id='seats' placeholder="Number of Seats" onChange={this.handleInputChange.bind(this)} defaultValue={car ? car.Seats : 0} />
                                        <div style={{ fontSize: 11, color: "red" }}> {this.state.passwordError} </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rePassword">Price</label>
                                    <div className="input-field">
                                        <input type="numeric" id='price' placeholder="Unit price per Hour" onChange={this.handleInputChange.bind(this)} defaultValue={car ? car.Price : 0} />
                                        <div style={{ fontSize: 11, color: "red" }}> {this.state.rePasswordError} </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image" >Image</label>
                                    <br />
                                    <input
                                        // defaultValue={car ? car.Image : null}
                                        onChange={this.handleChangeImage}
                                        type="file" id='carImg'
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
                                    {car ? "Apply change" : "Add car"}
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
        if (url.path === '/cars/') 
            sessionStorage.setItem("carImg", url.url);
    
    return {
        progress: state.uploadReducer.progress,
        carImg: sessionStorage.getItem("carImg")
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCar: (car) => dispatch(addCar(car)),
        uploadToStorage: (file) => dispatch(uploadToStorage(file)),
        editCar: (car, id) => dispatch(editCar(car, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(BookingDialog))