import React from "react";
import Grid from '@material-ui/core/Grid';
import LoadingView from './loadingView';
import Car from '../card/Car'

class CarsView extends React.Component {
    constructor() {
        super();
        this.state = {
            isMax: false,
            visibleCars: [],
            cars: [],
            selectedCar: "",
            lastVisible: null
        }
    }

    handleSelectedCar(event, id) {
        if (id === this.state.selectedCar) id = ""
        this.props.onSelectedCar(event, id)
        this.setState({
            selectedCar: id
        })
        console.log("print chosen car", id)
    }

    render() {
        console.log("load cars", this.props)
        if (this.props.cars === undefined) {
            console.log("not loaded yet")
            return(<LoadingView/>)
        }
        return (
            <div>
                <Grid container spacing={1}>
                    {this.props.cars.map((car) => {
                        return (
                            <Grid item xs={12} sm={6} md={6} lg={4} key={car.id}>
                                <Car key={car.id} car={car}
                                    selected={(event, id) => this.handleSelectedCar(event, id)}
                                    current={this.state.selectedCar} />
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        );
    }
}

export default CarsView