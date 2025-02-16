import { connect } from 'react-redux'
import React from "react";
import {
    Grid, Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell, Button,
    FormControlLabel, Typography, Box, TableContainer, IconButton, Checkbox
} from '@material-ui/core';
import { fade, withStyles } from '@material-ui/core/styles'
import DateTimePicker from 'react-datetime-picker';
import ClearIcon from '@material-ui/icons/Clear'
import { returnCar, editRental } from "../store/actions/rentalActions"
import { filteredList, sortedByRentDate } from '../utils/RentalFilter';

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

const defaultSort = [
    { name: 'sortRentAsc', value: false, detail: 'Rent Date Ascending' },
    { name: 'sortRentDesc', value: false, detail: 'Rent Date Descending' },
    { name: 'sortReturnAsc', value: false, detail: 'Return Date Descending' },
    { name: 'sortReturnDesc', value: false, detail: 'Return Date Descending' },
]

class RentalHistory extends React.Component {
    constructor() {
        super();
        this.state = {
            filters: {},
            status: false,
            fromDate: undefined,
            toDate: undefined,
            sort: defaultSort
        }
    }

    handleRemove = (e, rental) => {
        var d = new Date().getTime();
        this.props.returnCar(rental, d)
    }

    handleEdit = (e, rental) => {
        var d = new Date().getTime();
        this.props.returnCar(rental, d)
    }

    handleAvailableChange(event) {
        this.setState({
            status: event.target.checked
        })
    }

    handleSelectFilter = (id, item, open) => (event) => {
        this.setState({ sort: defaultSort })
        this.setState((prevState) => {
            const data = [...prevState.sort];
            data[id] = { name: item, value: open, detail: data[id].detail }
            return { sort: data }
        })
    }

    render() {
        const { auth, classes, currentUser, rental } = this.props;
        const { status, sort, fromDate, toDate } = this.state
        if (rental && auth.uid && currentUser) {
            var filtered = sortedByRentDate(filteredList(rental, {
                status: status,
                fromDate: fromDate,
                toDate: toDate
            }), sort)
            return (
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={3} md={3} lg={3}>
                        <form className={classes.container} noValidate>
                            <FormControlLabel
                                control={<Checkbox checked={status} onChange={this.handleAvailableChange.bind(this)} name="checkedA" />}
                                label="Show not returned only"
                            />
                            {sort.map((option, key)=><Button key={key} onClick={this.handleSelectFilter(key, option.name, !option.value)}>{option.detail}</Button>)}
                            <DateTimePicker
                                        className={classes.textField} value={fromDate}
                                        onChange={(value) => this.setState({ fromDate: value })}
                                    />
                            <DateTimePicker
                                        className={classes.textField} value={toDate}
                                        onChange={(value) => this.setState({ toDate: value })}
                                    />
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={9} md={9} lg={9} style={{ maxHeight: '150vh' }}>
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
                                                    <TableCell align='left' style={{ minWidth: 200 }}><Typography><Box fontWeight='Bold'>Car</Box></Typography></TableCell>
                                                    {currentUser.Role === "Admin" ? <TableCell align='left'><Box fontWeight='Bold'>User Email</Box></TableCell> : null}
                                                    <TableCell align='left'><Box fontWeight='Bold'>Booked Date</Box></TableCell>
                                                    {currentUser.Role === "Admin" ? <TableCell align='left'><Box fontWeight='Bold'>Status</Box></TableCell>
                                                        : <TableCell align='left'><Box fontWeight='Bold'>Unit Price</Box></TableCell>}
                                                    <TableCell align='right'></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {filtered.map((r, key) => {
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
                                                            {currentUser.Role === "Admin" ? <TableCell align='left'><Box fontWeight='Bold'>{r.User.Email}</Box></TableCell> : null}
                                                            <TableCell align='left'>{r.RentDate.toDate().toLocaleString()}</TableCell>
                                                            {currentUser.Role === "Admin" ? <TableCell align='left'><Box fontWeight='Bold'>{r.ReturnDate ? "Returned" : "Not Returned"}</Box></TableCell>
                                                                : <TableCell align='left'>$ {(r.Car.Price).toLocaleString()}</TableCell>}
                                                            {currentUser.Role === "Admin"
                                                                ? null // <TableCell><IconButton onClick={e => this.handleEdit(e, r)}><EditIcon />Edit</IconButton></TableCell>
                                                                : <TableCell>{r.ReturnDate ? "Book Canceled" : <IconButton onClick={e => this.handleRemove(e, r)}><ClearIcon />Cancel</IconButton>}</TableCell>}
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            );
        }
        return (<div></div>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        returnCar: (rental, returnDate) => dispatch(returnCar(rental, returnDate)),
        editRental: (rental) => dispatch(editRental(rental))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(RentalHistory))
