import React from "react";
import TextField from '@material-ui/core/TextField';
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
  });

class CalendarView extends React.Component {
    constructor() {
        super();
        this.state = {
            bookDate: "",
            bookDura: ""
        }
    }

    handleInputChange(event) {
        this.setState({
            [event.target.id]:  event.target.value
        }); 
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.onSelectedDate(this.state.bookDate, this.state.bookDura)
        }
    }
    
    render() {
        const { classes } = this.props;
        return (
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
                <TextField
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
                />
            </form>);
    }
}

export default withStyles(useStyles)(CalendarView)