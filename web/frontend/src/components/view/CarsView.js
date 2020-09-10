import React from "react";
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core/CircularProgress'
import InfiniteScroll from "react-infinite-scroll-component";
import Car from '../card/Car'
import { GetCarsFromPosition } from '../../actions/CarActions'

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

    dataNext() {
        this.getCarsFromPosition(this.props.cars.startAfter(this.state.lastVisible));
    }

    getCarsFromPosition(carsdb) {
        const limit = this.props.limit;
        if (!this.state.isMax) {
            GetCarsFromPosition(carsdb, limit).then((querySnapshot) => {
                this.setState({
                    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
                    isMax: (querySnapshot.docs.length < limit) ? true : false
                })
                querySnapshot.forEach((doc) => {
                    let car = doc.data();
                    car.id = doc.id;
                    this.setState({
                        visibleCars: this.state.visibleCars.concat(car)
                    })
                });
            });
        }
    }

    handleSelectedCar(event, id) {
        if (id == this.state.selectedCar) {
            id = ""
        }  
        this.props.onSelectedCar(event, id)
        this.setState({
            selectedCar: id
        })
        console.log("print chosen car", id)
    }

    componentDidMount() {
        this.getCarsFromPosition(this.props.cars);
    }

    render() {
        return (
            <div>
                <InfiniteScroll
                    className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-1"
                    dataLength={this.state.visibleCars.length}
                    next={this.dataNext.bind(this)}
                    hasMore={this.state.isMax}
                    loader={<CircularProgress />}
                    height="Parent"
                    endMessage={
                        <p style={{ textAlign: "center" }}> <b>All cars shown</b></p>
                    }
                >
                    {this.state.visibleCars.map((car) => {
                        return (
                            <Grid item xs={12} sm={6} md={6} lg={4} key={car.id}>
                                <Car key={car.id} car={car} selected={(event, id) => this.handleSelectedCar(event, id)} current={this.state.selectedCar} />
                            </Grid>
                        )
                    })}
                </InfiniteScroll>
            </div>
        );
    }
}

export default CarsView