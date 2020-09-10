import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import CarsView from "../components/view/carsView";
import Wrapper from "../components/Wrapper"
import CalendarView from "../components/view/calendarView";
import { getCarFiltered } from "../store/actions/carActions";
import { connect } from 'react-redux'

class BookCar extends React.Component {
    constructor() {
        super();
        this.state = {
            cars: [],
            selectedCar: "",
            selectedDate: "",
            selectedDuration: ""
        }
    }

    validateInput(event) {
        
    }

    submitBookForm(event) {
        console.log("car ", this.state.selectedCar, " date ", this.state.selectedDate, " dura ", this.state.selectedDuration)
    }

    getSelectedCar(event, id) {
        this.setState({
            selectedCar: id
        })
    }

    getSelectedDate(date, duration) {
        this.setState({
            selectedDate: date,
            selectedDuration: duration
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cars !== this.props.cars) {
            this.setState({ 
                cars: this.props.cars.cars
            });
        }
    }

    componentDidMount() {
        this.props.getAvailableCar()
    }

    render() {
        return (
            <div>
                <Wrapper padding={false}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={3} md={3} lg={3}>
                            <CalendarView onSelectedDate={(date, duration) => this.getSelectedDate(date, duration)}></CalendarView>
                            <Button
                                style={{  marginTop: "50px" }}
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                onClick={this.submitBookForm.bind(this)}
                            >
                                Book your car
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={9} md={9} lg={9}>
                            <CarsView cars={this.state.cars} 
                                isMax={this.state.isMax} 
                                onSelectedCar={(event, id) => this.getSelectedCar(event, id)}/>
                        </Grid>
                    </Grid>    
                </Wrapper>
            </div>
        );
    }
} 

const mapStateToProps = (state) => {
    console.log("state", state.cars)
    return {
        cars: state.cars
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAvailableCar: () => dispatch(getCarFiltered(true))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCar)
