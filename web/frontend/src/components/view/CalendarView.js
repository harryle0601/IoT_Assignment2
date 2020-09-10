import React from "react";
import TextField from '@material-ui/core/TextField';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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
            bookDay: 1
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
        this.props.onSelectedDate(event, this.state.bookDate, this.state.bookDay)
        console.log("name ", name, " value ", value);
    }
    
    render() {
        const car = this.props.car;
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
                    id="bookDay"
                    label="Number of booking day"
                    value={this.state.age}
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