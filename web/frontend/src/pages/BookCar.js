import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { Filter, GetAllCar } from "../actions/CarActions";
import CarsView from "../components/view/CarsView";
import Wrapper from "../components/Wrapper"
import CalendarView from "../components/view/CalendarView";

export default class BookCar extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedCar: "",
            selectedDate: "",
            selectedDuration: ""
        }
    }

    submitBookForm(event) {
        console.log("car " + this.state.selectedCar + " date " + this.state.selectedDate + " dura " + this.state.selectedDuration)
    }

    getSelectedCar(event, id) {
        this.setState({
            selectedCar: id
        })
    }

    getSelectedDate(event, date, duration) {
        this.setState({
            selectedDate: date,
            selectedDuration: duration
        })
    }

    render() {
        return (
            <div>
                <Wrapper padding={false}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <CalendarView onSelectedDate={(event, date, duration) => this.getSelectedDate(event, date, duration)}></CalendarView>
                            <Button
                                style={{
                                    marginTop: "50px"
                                }}
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                onClick={this.submitBookForm.bind(this)}
                                        // disabled={this.state.password !== this.state.cpassword}
                            >
                                Book your car
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={9} md={9} lg={9}>
                            <CarsView cars={GetAvailableCar(GetAllCar())} limit={9} onSelectedCar={(event, id) => this.getSelectedCar(event, id)}/>
                        </Grid>
                    </Grid>    
                </Wrapper>
            </div>
        );
    }
} 
