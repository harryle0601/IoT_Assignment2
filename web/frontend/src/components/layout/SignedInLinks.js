import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/authActions'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Notifications from "@material-ui/icons/Notifications";
import Button from "@material-ui/core/Button";
import Badge from '@material-ui/core/Badge';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
import { Avatar } from 'material-ui'
import moment from 'moment'

export function UserMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [auth, setAuth] = React.useState(null);
    const open = Boolean(anchorEl);
    const large = useSizedIconButtonStyles({ padding: 4, childSize: 28 });
    const handleClick = event => {
        console.log(props)
        setAuth(props);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => { setAnchorEl(null); };

    return (
        <div>
            <IconButton classes={large} onClick={(e) => handleClick(e)}>
                <Avatar src={props.currentUser ? props.currentUser.logo : null} />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <NavLink to={`/profile/${props.props.uid}`} style={{ color: "black" }} >
                    <MenuItem onClick={handleClose}>My Profile</MenuItem>
                </NavLink>
                <MenuItem style={{ color: "black" }} onClick={(e) => props.handleLogOut(e)}><Button variant='outlined'>Sign Out</Button></MenuItem>
            </Menu>
        </div>
    );
}

const SignedInLinks = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { auth } = props
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogOut = (e) => {
        props.signOut()
        sessionStorage.removeItem('logo')
        window.location.reload()
    }
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3} style={{ marginTop: "1%", marginRight: '-1%' }}>
                    <UserMenu props={auth} lastContact={props.props.lastContact} currentUser={props.props.currentUser} handleLogOut={handleLogOut} />
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks) 
