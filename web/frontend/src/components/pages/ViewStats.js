import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import React from "react";
import { fade, withStyles } from '@material-ui/core/styles'
import { Container } from "@material-ui/core"
import { Chart } from "react-google-charts";
import { carStatusPieChart, userGrowth } from '../utils/Statistic'

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

class ViewStatistics extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        const { auth, cars, currentUser, rental, issues, users } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        else if (currentUser) {
            if (currentUser.Role === "Engineer") return <Redirect to='/engineer' />
            if (currentUser.Role === "Admin") return <Redirect to='/admin' />
        }
        if (cars && rental && issues && users) {
            var carStatus = carStatusPieChart(cars)
            console.log('car status', carStatus)
            return (
                <Container>
                    <Chart
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={carStatus}
                        options={{
                            title: 'Car status',
                            // Just add this option
                            is3D: true,
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                    {console.log(userGrowth(users, 9))}
                    <Chart
                        chartType="Line"
                        loader={<div>Loading Chart</div>}
                        data={userGrowth(users, 9)}
                        options={{
                            chart: { title: 'User growth in last 9 days', },
                            series: { 0: { axis: 'Users' } },
                            axes: { y: { Users: { label: 'Users' } }, },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </Container>
            );
        } else return (<div></div>)
    }
}

const mapDispatchToProps = (dispatch) => {

}

const mapStateToProps = (state) => {
    const cu = state.firestore.ordered.currentUser
    const currentUser = cu ? cu[0] : null
    return {
        currentUser: currentUser,
        auth: state.firebase.auth,
        cars: state.firestore.ordered.cars,
        rental: state.firestore.ordered.rental,
        issues: state.firestore.ordered.issues,
        users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        if (!props.auth.uid) return [];
        else return [
            { collection: 'cars' },
            { collection: 'rental' },
            { collection: 'issues' },
            { collection: 'users', queryParams: ['orderByChild=CreateDate'] }
        ]
    }),
)(withStyles(useStyles)(ViewStatistics))
