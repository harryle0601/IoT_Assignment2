import React from "react";
import { connect } from 'react-redux'
import { Dialog } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { addRental } from "../store/actions/rentalActions";


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
            dialog: false
        }
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

    render() {
        return (
            <Dialog
                style={{ overflow: "hidden" }}
                fullWidth={true}
                maxWidth={"md"}
                open={this.state.dialog}
                onClose={this.handleCloseDialog}
                aria-labelledby="responsive-dialog-title">
                <div class="mapouter">
                    <div class="gmap_canvas">
                        <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=10.7296%20106.6931&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                        <a href="https://www.whatismyip-address.com/nordvpn-coupon/">nordvpn sale</a>
                    </div><style>
                        {/* .mapouter{position:relative;text-align:right;height:500px;width:600px;}.gmap_canvas {overflow:"hidden";background:"none"!important;height:500px;width:600px;} */}
                    </style></div>
            </Dialog>);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        bookCar: (rental) => dispatch(addRental(rental))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(BookingDialog))
