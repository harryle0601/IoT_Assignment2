import React from "react";
import TextField from '@material-ui/core/TextField';
import LoadingView from './loadingView';
import Slider from '@material-ui/core/Slider';
import { withStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';

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

class FilterView extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedFilters: {
                available: false,
                brand: [],
                seats: [],
                color: [],
                minPrice: undefined,
                maxPrice: undefined
            }
        }
    }

    getModelFilterChange() {
        console.log("cahnge models")
        var newModel = []
        this.state.brand.forEach(function(br) {
            newModel = newModel.concat(this.props.filter.model[br])
        });
        this.setState({
            model: newModel
        })
    }

    handlePriceChange(event, value) {
        console.log(value[0], value[1])
        this.setState({
            minPrice: value[0],
            maxPrice: value[1]
        });
    }

    handleInputChange(event, value) {
        var rawId = event.target.id.split("-")[0]
        console.log(value)
        this.setState({
            [rawId]: value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            var updateFilter = {
                available: ((this.state.available.length == 0) ? undefined : this.state.available),
                brand: ((this.state.brand.length == 0) ? undefined : this.state.brand),
                color: ((this.state.color.length == 0) ? undefined : this.state.color),
                minPrice: ((this.state.minPrice === "") ? undefined : this.state.minPrice),
                maxPrice: ((this.state.maxPrice === "") ? undefined : this.state.maxPrice)
            }
            this.props.onSelectedFilters(updateFilter)
        }
    }

    render() {
        const { classes, filters, cars } = this.props;
        const { selectedFilters } = this.state;
        const filtered
        if (filters.brand === undefined) {
            console.log("not loaded yet")
            return(<LoadingView/>)
        }
        else return (
            <form className={classes.container} noValidate>
                <Autocomplete
                    multiple
                    id="brand"
                    options={ filters.brand }
                    onChange={(event, value) => this.handleInputChange(event, value)}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Brand Filter"
                        />
                    )}
                />
                <Autocomplete
                    multiple
                    id="color"
                    options={ filters.color }
                    onChange={(event, value) => this.handleInputChange(event, value)}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Color Filter"
                        />
                    )}
                />
                <Slider valueLabelDisplay="auto" aria-label="pretto slider" 
                    onChange={(event, value) => this.handlePriceChange(event, value)}
                    defaultValue={[filters.minPrice, filters.maxPrice]} 
                    max={filters.maxPrice} min={filters.minPrice}/>
            </form>);
    }
}

export default withStyles(useStyles)(FilterView)