import { connect } from 'react-redux'
import React from "react";
import { TableCell, TableRow, FormControl, Select, MenuItem, Dialog } from "@material-ui/core"
import { fade, withStyles } from '@material-ui/core/styles'
import { setRole } from "../store/actions/userActions"

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


class EngineerDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            role: "",
            prevRole: "",
            dialog: false
        }
    }

    handleConfirmDialog(e) {
        this.setState({ 
            dialog: false
        })
        this.props.editRole(this.props.user, this.state.role)
    }

    handleCloseDialog(e) {
        this.setState({ dialog: false })
    }

    handleRoleChange(event) {
        this.setState({
            prevRole: this.state.role,
            role: event.target.value,
            dialog: true
        })
        console.log("update role", this.props.user, event.target.value)       
    }

    // componentDidUpdate(prevState, prevProp) {
    //     if (prevState.role !== this.state.role) {
    //         this.props.editRole(this.props.user, this.state.role)
    //     }
    // }

    render() {
        const { classes, currentUser, user } = this.props;
        if (user) {
            console.log("issues recedived")
            return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    <TableCell align='left'>{user.Email}</TableCell>
                    <TableCell align='left'>{user.Phone}</TableCell>
                    <TableCell align='left'>{user.Address}</TableCell>
                    <TableCell align='right'>
                        {currentUser.Email === user.Email ? "Admin" :
                            <FormControl required className={classes.formControl}>
                                <Select
                                    defaultValue={user.Role ? user.Role : "User"}
                                    onChange={this.handleRoleChange.bind(this)}
                                >
                                    <MenuItem value={"User"}>User</MenuItem>
                                    <MenuItem value={"Admin"}>Admin</MenuItem>
                                    <MenuItem value={"Manager"}>Manager</MenuItem>
                                    <MenuItem value={"Engineer"}>Engineer</MenuItem>
                                </Select>
                            </FormControl>}
                    </TableCell>
                    <Dialog open={this.state.dialog}>
                        Are you sure?    
                        <button onClick={this.handleCloseDialog.bind(this)}>No</button>
                        <button onClick={this.handleConfirmDialog.bind(this)}>Yes</button>
                    </Dialog>
                </TableRow>
            );
        }
        return (<div></div>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editRole: (user, role) => dispatch(setRole(user, role))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(EngineerDashboard))
