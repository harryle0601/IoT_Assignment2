import { connect } from 'react-redux'
import React from "react";
import { updateRole } from "../store/actions/userActions"

class EngineerDashboard extends React.Component {

    render() {
        const { auth, currentUser, user, r } = this.props;
        if (user) {
            console.log("issues recedived")
            return (
                <TableRow hover role="checkbox" tabIndex={-1} key={r.id}>
                    <TableCell align='left'>{r.Email}</TableCell>
                    <TableCell align='left'>{r.Phone}</TableCell>
                    <TableCell align='left'>{r.Address}</TableCell>
                    <TableCell align='right'>
                        <FormControl required className={classes.formControl}>
                            <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={this.state.role}
                                onChange={this.handleInputChange.bind(this)}
                                className={classes.selectEmpty}
                            >
                                <MenuItem value={"User"}>User</MenuItem>
                                <MenuItem value={"Admin"}>Admin</MenuItem>
                                <MenuItem value={"Manager"}>Manager</MenuItem>
                                <MenuItem value={"Engineer"}>Engineer</MenuItem>
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                    </TableCell>
                </TableRow>
            );
        }
        return (<div></div>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCar: (car) => dispatch(addCar(car))
    }
}

export default connect(null, mapDispatchToProps)(EngineerDashboard)
