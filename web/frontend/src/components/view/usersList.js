import { connect } from 'react-redux'
import React from "react";
import { Grid, Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell,
    Container, Typography, Box, TableContainer, IconButton} from '@material-ui/core';
import { fade, withStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from '@material-ui/icons/Clear'
import { returnCar, editRental } from "../store/actions/rentalActions"

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
    handleTabChange = (e, value) => {
        this.setState({ tab: value });
    }

    handleRemove = (e, rental) => {
        var d = new Date().getTime();
        this.props.returnCar(rental, d)
    }

    handleEdit = (e, rental) => {
        var d = new Date().getTime();
        this.props.returnCar(rental, d)
    }

    render() {
        const { auth, classes, currentUser, users } = this.props;
        if (users && auth.uid) {
            return (
                <Container>
                <div style={{ maxHeight: '150vh' }}>
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
                                                <TableCell align='left'><Typography><Box fontWeight='Bold'>Email</Box></Typography></TableCell>
                                                <TableCell align='left' style={{ minWidth: 120 }}><Box fontWeight='Bold'>Phone</Box></TableCell>
                                                <TableCell align='left' style={{ minWidth: 300 }}><Typography><Box fontWeight='Bold'>Address</Box></Typography></TableCell>
                                                <TableCell align='left'><Box fontWeight='Bold'>Roles</Box></TableCell>
                                                <TableCell align='right'></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((r, key) => {
                                                console.log("rentdate", r.RentDate)
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={r.id}>
                                                        <TableCell align='left'>{r.Email}</TableCell>
                                                        <TableCell align='left'>{r.Phone}</TableCell>
                                                        <TableCell align='left'>{r.Address}</TableCell>
                                                        <TableCell align='left'>{r.Role ? r.Role : "User"}</TableCell>
                                                        <TableCell><IconButton onClick={e => this.handleEdit(e, r)}><EditIcon/>Edit</IconButton></TableCell>
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

const mapDispatchToProps = (dispatch) => {
    return {
        returnCar: (rental, returnDate) => dispatch(returnCar(rental, returnDate)),
        editRental: (rental) => dispatch(editRental(rental))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(RentalHistory))
