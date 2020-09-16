import React from "react";
import { TextField, Grid, FormControlLabel, Checkbox, Slider, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fade, withStyles } from '@material-ui/core/styles'
import TrendingDownOutlinedIcon from '@material-ui/icons/TrendingDownOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import CarCard from "../card/UserCarCard";
import { getFilterTags, filteredList, sortedByPrice } from "../utils/CarFilter"
import EditCarInfoDialog from "../dialog/editCarInfoDialog"

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

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

const defaultSort = [
    { name: 'sortPriceAsc', value: false, icon: <TrendingUpOutlinedIcon />, detail: '$' },
    { name: 'sortPriceDesc', value: false, icon: <TrendingDownOutlinedIcon />, detail: '$' }
]

class SearchCar extends React.Component {
    constructor() {
        super();
        this.state = {
            carsList: [],
            filters: {},
            available: false,
            brand: [],
            minSeats: undefined,
            maxSeats: undefined,
            color: [],
            minPrice: undefined,
            maxPrice: undefined,
            sort: defaultSort
        }
    }

    handlePriceChange(event, value) {
        console.log(value[0], value[1])
        this.setState({
            minPrice: value[0],
            maxPrice: value[1]
        });
    }

    handleBrandTagsChange(event, value) {
        this.setState({
            brand: value.toString()
        })
    }

    handleSeatsChange(event, value) {
        console.log(value[0], value[1])
        this.setState({
            minSeats: value[0],
            maxSeats: value[1]
        });
    }

    handleColorTagsChange(event, value) {
        this.setState({
            color: value.toString()
        })
    }

    handleAvailableChange(event) {
        this.setState({
            available: event.target.checked
        })
    }

    handleTabChange = (e, value) => {
        this.setState({ tab: value });
    }

    handleSelectSort = (id, item, open) => (event) => {
        this.setState({ sort: defaultSort })
        this.setState((prevState) => {
            const data = [...prevState.sort];
            data[id] = { name: item, value: open, icon: data[id].icon, detail: data[id].detail }
            return { sort: data }
        })
    }

    render() {
        const { classes, cars, currentUser } = this.props;
        const { available, brand, minSeats, maxSeats, color, minPrice, maxPrice, sort } = this.state
        console.log("car car car", cars)
        if (cars && currentUser) {
            var filters = getFilterTags(cars)
            var filtered = sortedByPrice(filteredList(cars, {
                available: available,
                brand: brand,
                minSeats: minSeats,
                maxSeats: maxSeats,
                color: color,
                minPrice: minPrice,
                maxPrice: maxPrice
            }), sort)
            console.log("filter tags", filters)
            return (
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={3} md={3} lg={3}>
                        <form className={classes.container} noValidate>
                            <FormControlLabel
                                control={<Checkbox checked={available} onChange={this.handleAvailableChange.bind(this)} name="checkedA" />}
                                label="Available only"
                            />
                            {sort.map((option, key) => <Button key={key} onClick={this.handleSelectSort(key, option.name, !option.value)}>{option.icon}{option.detail}</Button>)}
                            <Autocomplete
                                id="brand" multiple filterSelectedOptions options={filters.brand}
                                onChange={(event, value) => this.handleBrandTagsChange(event, value)}
                                getOptionLabel={(option) => option}
                                className={classes.filterContent}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label="Brand Filter" />
                                )}
                            />
                            <Autocomplete
                                id="color" multiple filterSelectedOptions options={filters.color}
                                onChange={(event, value) => this.handleColorTagsChange(event, value)}
                                getOptionLabel={(option) => option}
                                className={classes.filterContent}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label="Color Filter" />
                                )}
                            />
                            <div className={classes.filterContent} >
                                Seats Filter
                                    <PrettoSlider valueLabelDisplay="auto"
                                    onChange={(event, value) => this.handleSeatsChange(event, value)}
                                    defaultValue={[filters.minSeats, filters.maxSeats]}
                                    max={filters.maxSeats} min={filters.minSeats} />
                            </div>
                            <div className={classes.filterContent}>
                                Price Filter
                                    <PrettoSlider valueLabelDisplay="auto"
                                    onChange={(event, value) => this.handlePriceChange(event, value)}
                                    defaultValue={[filters.minPrice, filters.maxPrice]}
                                    max={filters.maxPrice} min={filters.minPrice} />
                            </div>
                            {currentUser.Role === "Admin" ? <EditCarInfoDialog/> : null}
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={9} md={9} lg={9} style={{ maxHeight: "85vh", overflow: 'auto', overflowX: "hidden" }}>
                        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">
                            {(filtered.length !== 0) ? filtered.map((car, index) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <CarCard
                                            key={index}
                                            car={car}
                                            currentUser={this.props.currentUser}
                                        />
                                    </Grid>
                                )}) : <Grid item xs={12}>
                                    <div style={{ textAlign: 'center' }}>
                                        <img style={{ width: '40%' }} alt='' src='https://firebasestorage.googleapis.com/v0/b/sepm-nocovy.appspot.com/o/cherry-list-is-empty-1.png?alt=media&token=ab7a1c77-b257-4177-b338-2c877222d832'></img>
                                        <h5 style={{ fontFamily: 'Muli', marginBottom: "5%" }}>No Product Found</h5>
                                    </div>
                                </Grid>}
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
        return (<div></div>)
    }
}

export default withStyles(useStyles)(SearchCar)
