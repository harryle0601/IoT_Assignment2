import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { getCarFiltered } from "../store/actions/carActions";
import { connect } from 'react-redux'

class ViewIssues extends React.Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
} 

const mapStateToProps = (state) => {
    
}

const mapDispatchToProps = (dispatch) => {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewIssues)
