import { Redirect, NavLink } from 'react-router-dom'
import { firestoreConnect, populate } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import React from "react";
import { Grid, FormControlLabel, Tabs, Tab, Checkbox, Slider, TextField, 
    Card, CardContent, CardHeader, Table, TableHead, TableBody, TableRow, TableCell,
    Button, Input, Dialog, DialogTitle, DialogContent, DialogActions,
    Container, Typography, Box, TableContainer, IconButton} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fade, withStyles } from '@material-ui/core/styles'
import CarCard from "../card/UserCarCard";
import ClearIcon from '@material-ui/icons/Clear'
import * as FilterFunctions from "../utils/FilterFunctions"
import { TabPanel, a11yProps } from '../layout/Tabs'
import { returnCar, editRental } from "../store/actions/rentalActions"
import SearchCar from "../view/searchCar"

const useStyles = theme => ({
    search: {
        marginTop: '3%',
        backgroundColor: fade(theme.palette.common.white, 0.75),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.95),
        },
        display: 'flex',
        border: `1px solid ${'#dfe1e5'}`,
        boxShadow: '0 16px 40px -12.125px rgba(0,0,0,0.3)',
        borderRadius: 100,
        padding: `${theme.spacing(1) / 4}`,
        height: '50px',
        margin: 'auto',
        width: '482px'

    },
    searchIcon: {
        marginTop: '-5px',
        padding: `${theme.spacing(1) / 2}px ${theme.spacing(1)}px`,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 100,

    },
    inputRoot: {
        color: 'inherit',
        width: '85%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`
    },
    root: {
        display: 'flex',
        maxWidth: '500px',
        justifyContent: 'center',

    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '300px',
        height: '300px'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    container: {
        padding: "10px 10px 10px 10px",
        borderRadius: "16px",
        backgroundColor: "white",
        maxHeight: '100%'
    },
    filterContent: {
        marginTop: "20px"
    }
});

class RentalHistory extends React.Component {
    constructor() {
        super();
        this.state = {
            tab: 0
        }
    }

    handleTabChange = (e, value) => {
        this.setState({ tab: value });
    }

    handleRemove = (e, rental) => {
        var d = new Date().getTime();
        this.props.returnCar(rental, d)
    }

    render() {
        const { auth, classes, currentUser, rental } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        else if (currentUser) {
            if (currentUser.Role === "Engineer") return <Redirect to='/engineer' />
            if (currentUser.Role === "Manager") return <Redirect to='/manager' />
        }
        if (rental) {
            return (
                <Container>
                <div style={{ maxHeight: '80vh' }}>
                    <Typography variant='h2'>Cart</Typography>
                    <Card className={classes.card} style={{
                        display: 'flex',
                        marginTop: "1%",
                        overflow: 'initial',
                        background: '#ffffff',
                        borderRadius: 16,
                        height: '100%'
                    }}>
                        <CardContent className={classes.content} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: "2%",
                            width: '100%'
                        }}>
                            <div>
                                <TableContainer className={classes.container} style={{
                                    maxHeight: '55vh',
                                    marginBottom: '2%'
                                }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='left' style={{ minWidth: 400 }}><Typography><Box fontWeight='Bold'>Car</Box></Typography></TableCell>
                                                <TableCell align='left'><Box fontWeight='Bold'>Booked Date</Box></TableCell>
                                                <TableCell align='left'><Box fontWeight='Bold'>Unit Price</Box></TableCell>
                                                <TableCell align='right'></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rental.map((r, key) => {
                                                console.log("rentdate", r.RentDate)
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={r.id}>
                                                        <TableCell align='left'>
                                                            <Grid container direction="row" justify="flex-start" alignItems="center" >
                                                                <img style={{ minWidth: '50px', width: '8vh', height: '8vh', objectFit: 'cover' }} src={r.Car.Image} />
                                                                <Grid style={{ marginLeft: 20 }}>
                                                                    <Typography variant='h6'><Box>{r.Car.Brand + " " + r.Car.Model}</Box></Typography>
                                                                    <Typography variant='subtitle2'><Box>{r.Car.Seats + " seats " + r.Car.Color}</Box></Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell>
                                                        <TableCell align='left'>{new Date(r.RentDate.seconds*1000).toLocaleDateString()}</TableCell>
                                                        <TableCell align='left'>$ {(r.Car.Price).toLocaleString()}</TableCell>
                                                        <TableCell>{(r.ReturnDate) ? "Book Canceled" : <IconButton onClick={e => this.handleRemove(e, r)}><ClearIcon/>Cancel</IconButton>}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        
            );
        }
        return (<div></div>)
    }
}

const mapStateToProps = (state) => {
    const users = state.firestore.ordered.currentUser
    const currentUser = users ? users[0] : null
    return {
        currentUser: currentUser,
        auth: state.firebase.auth,
        cars: state.firestore.ordered.cars,
        rental: state.firestore.ordered.rental
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editCar: (rental, returnDate) => dispatch(returnCar(rental, returnDate)),
        editRental: (rental) => dispatch(editCar(rental))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if (!props.auth.uid) return [];
        else return [
            { collection: 'cars' },
            { collection: 'rental', queryParams:['orderByChild=RentDate'] },
            { collection: 'users' }
        ]
    }),
)(withStyles(useStyles)(RentalHistory))
