import React from "react";
import { connect } from 'react-redux'
import DateTimePicker from 'react-datetime-picker';
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, Grid } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { addRental } from "../store/actions/rentalActions"

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
            bookDate: Date.now()
        }
    }

    handleClickDialog = () => {
        this.setState({
            dialog: true
        });
    };

    handleCloseDialog = () => {
        this.setState({
            dialog: false
        });
    };

    handleBookCar = (e, car, currentUser, bookDate) => {
        console.log(typeof bookDate)
        this.props.BookCar({
            Car: car,
            RentDate: bookDate,
            User: currentUser,
            UID: currentUser.id
        })
        this.handleCloseDialog()
    }

    render() {
        const { classes, car, currentUser } = this.props;
        console.log("booking car", car)
        return (
            <div>
                {car.Available === false
                    ? <Button variant="contained" color="secondary" disable>Out of Stock</Button>
                    : <Button variant="contained" color="secondary" onClick={this.handleClickDialog}>Book Now</Button>}
                <Dialog
                    style={{overflow:"hidden"}}
                    fullWidth={true}
                    maxWidth={"md"}
                    open={this.state.dialog}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="responsive-dialog-title">
                    <h4 style={{ margin: '40px' }}>{car.Brand + " " + car.Model}</h4>
                    <Grid container style={{ margin: '1%', width: 'fit-content', marginLeft: '2%' }}>
                        <Grid item xs={6} md={6} lg={6}>
                            <div className={classes.imageContainer}>
                                <img src={car.Image} alt={car.Brand + " " + car.Model + " " + car.Seats + " seats " + car.Color} className={classes.image} />
                            </div>
                        </Grid>
                        <Grid item xs={5} md={5} lg={5}>
                            <DialogTitle id="responsive-dialog-title">
                                <div style={{ textAlign: 'center', fontSize: '30px' }}>Booking Car</div>
                            </DialogTitle>
                            <DialogContent>
                                <Grid container justify="flex-start" style={{ width: 'fit-content' }}>
                                    <Grid item xs={12}><h5>Description:</h5></Grid>
                                    <Grid item xs={12}>{car.Brand + " " + car.Model + " " + car.Seats + " seats " + car.Color}</Grid>
                                    <Grid item xs={6}><h5>Price per Hour:</h5></Grid>
                                    <Grid item xs={6}><div style={{ textAlign: 'right', fontSize: '30px', fontFamily: 'bold' }}> ${car.Price} </div></Grid>
                                </Grid>
                                <h5>Booking Date:</h5>
                                <DateTimePicker
                                        className={classes.textField}
                                        value={this.state.bookDate}
                                        onChange={(value) => this.setState({ bookDate: value })}
                                    />
                            </DialogContent>
                            <Grid container justify='center'>
                            </Grid>
                        </Grid>
                        <Grid container
                            justify="flex-end" style={{marginRight:"50px"}}>
                            <DialogActions>
                                <Button autoFocus onClick={this.handleCloseDialog} color="primary">
                                    Cancel
                            </Button>
                                <Button onClick={(e) => this.handleBookCar(e, car, currentUser, this.state.bookDate)} color="primary" autoFocus>
                                    Book Now
                            </Button>
                            </DialogActions>
                        </Grid>
                    </Grid>
                </Dialog >
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        BookCar: (rental) => dispatch(addRental(rental))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(BookingDialog))