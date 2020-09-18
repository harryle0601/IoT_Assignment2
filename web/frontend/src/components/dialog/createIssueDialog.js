import React from "react";
import { connect } from 'react-redux'
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, Grid, TextField } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { addIssue } from "../store/actions/issueActions";

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
            description: '',
            summary: ''
        }
    }

    handleTextInput(e) {
        console.log("text input of issue", e.target.id, e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
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

    handleCreateIssue = (e, car) => {
        if (this.state.summary !== '' && this.state.summary) {
            this.props.createIssue({
                Car: car,
                Summary: this.state.summary,
                Description: this.state.description,
                Resolve: false
            })
            this.handleCloseDialog()
        }     
    }

    render() {
        const { classes, car, currentUser } = this.props;
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickDialog}>Report Issue</Button>
                <Dialog
                    style={{ overflow: "hidden" }}
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
                                </Grid>
                                <Grid container justify="flex-start" style={{ width: 'fit-content' }}>
                                    <TextField
                                        id="summary"
                                        label="Issue summary"
                                        style={{ margin: 8 }}
                                        value = {this.state.summary}
                                        placeholder="Summary"
                                        fullWidth onChange={this.handleTextInput.bind(this)}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid container justify="flex-start" style={{ width: 'fit-content' }}>
                                    <TextField
                                        id="description"
                                        label="Issue detail description"
                                        style={{ margin: 8 }}
                                        value = {this.state.description}
                                        placeholder="Detail Description"
                                        fullWidth multiline onChange={this.handleTextInput.bind(this)}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </DialogContent>
                            <Grid container justify='center'>
                            </Grid>
                        </Grid>
                        <Grid container
                            justify="flex-end" style={{ marginRight: "50px" }}>
                            <DialogActions>
                                <Button autoFocus onClick={this.handleCloseDialog} color="primary">
                                    Cancel
                            </Button>
                                <Button onClick={(e) => this.handleCreateIssue(e, car, currentUser, this.state.bookDate)} color="primary" autoFocus>
                                    Create Issue
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
        createIssue: (issue) => dispatch(addIssue(issue))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(BookingDialog))