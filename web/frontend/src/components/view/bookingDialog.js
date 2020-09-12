import React from "react";
import TextField from '@material-ui/core/TextField';
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, Grid } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

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

class CalendarView extends React.Component {
    constructor() {
        super();
        this.state = {
            dialog:  false,
            bookDate: Date.now()
            // bookDura: ""
        }
    }

    handleInputChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
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

    handleBookCar = (e, car, bookDate) => {
        console.log("Car", car,"booked at",bookDate)
    }

    render() {
        const { classes, car, currentUser } = this.props;
        return (
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    // startIcon={<ShoppingCartOutlinedIcon />}
                    onClick={this.handleClickDialog}
                    disable={car.Available === 0}
                >
                    {car.Available === 0 ? "Out of Stock" : "Book Now"}
                </Button>
                <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={this.state.dialog}
                onClose={this.handleCloseDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <h4 style={{ margin: '40px' }}>{car.Brand + " " + car.Model}</h4>
                <Grid container style={{ margin: '1%', width: 'fit-content', marginLeft: '2%' }}>
                    <Grid item xs={6} md={6} lg={6}>
                        <div className={classes.imageContainer}>
                            <img src={car.Image} alt={car.Brand + " " + car.Model + " " + car.Seats + " seats " + car.Color} className={classes.image}/>
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
                                <Grid item xs={6}> <h5>Price per Hour:</h5></Grid>
                                <Grid item xs={6}> <div style={{ textAlign: 'right', fontSize: '30px', fontFamily: 'bold' }}> ${car.Price} </div></Grid>
                            </Grid>
                            <form className={classes.container} noValidate>
                                <TextField
                                    id="bookDate"
                                    label="Start Booking Date"
                                    type="date"
                                    defaultValue="2017-05-24T10:30"
                                    className={classes.textField}
                                    value={this.state.bookDate}
                                    onChange={this.handleInputChange.bind(this)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                {/* <TextField
                                    id="bookDura"
                                    label="Number of booking days"
                                    value={this.state.bookDura}
                                    onChange={this.handleInputChange.bind(this)}
                                    type="number"
                                    defaultValue="1"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                /> */}
                            </form>
                        </DialogContent>
                        <Grid container justify='center'>
                        </Grid>
                    </Grid>
                    <Grid container
                        justify="flex-end">
                        <DialogActions>
                            <Button autoFocus onClick={this.handleCloseDialog} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={(e) => this.handleBookCar(e, car, this.state.bookDate)} color="primary" autoFocus>
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

export default withStyles(useStyles)(CalendarView)