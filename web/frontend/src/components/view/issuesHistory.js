import { connect } from 'react-redux'
import React from "react";
import { Grid, Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell,
    Container, Typography, Box, TableContainer, IconButton} from '@material-ui/core';
import { fade, withStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import { editIssue } from "../store/actions/issueActions"

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

class IssueHistory extends React.Component {
    handleTabChange = (e, value) => {
        this.setState({ tab: value });
    }

    handleResolve = (e, rental) => {
        rental['Resolved'] = true
        this.props.editIssue(rental)
    }

    handleEdit = (e, rental) => {
        // var d = new Date().getTime();
        // this.props.returnCar(rental, d)
    }

    render() {
        const { auth, classes, currentUser, issues } = this.props;
        if (issues && auth.uid) {
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
                                                <TableCell align='left' style={{ minWidth: 180 }}><Typography><Box fontWeight='Bold'>Car</Box></Typography></TableCell>
                                                <TableCell align='left' style={{ minWidth: 220 }} ><Box fontWeight='Bold'>Description</Box></TableCell>
                                                <TableCell align='left'><Box fontWeight='Bold'>Report Date</Box></TableCell>
                                                <TableCell align='left'><Box fontWeight='Bold'>Status</Box></TableCell>
                                                {currentUser.Role === "Admin" ? <TableCell align='right'></TableCell> : null}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {issues.map((r, key) => {
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
                                                        <TableCell align='left'><Box>{r.Summary}</Box></TableCell>
                                                        <TableCell align='left'>{r.ReportDate.toDate().toLocaleString()}</TableCell>
                                                        <TableCell align='left'>{r.Resolved ? "Resolved" : "Not Resolve"} </TableCell>
                                                        {currentUser.Role === "Admin" 
                                                        ? <TableCell><IconButton onClick={e => this.handleEdit(e, r)}><EditIcon/>Edit</IconButton></TableCell>
                                                        : <TableCell>{r.Resolved ? "Book Canceled" : <IconButton onClick={e => this.handleResolved(e, r)}><CheckIcon/>Cancel</IconButton>}</TableCell>}
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
        resolveIssue: (issue) => dispatch(editIssue(issue))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(IssueHistory))
