import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

class LoadingView extends React.Component {
    render() {
        return (
            <div style={{paddingTop: "25px"}}>
                <CircularProgress disableShrink />
            </div>
        );
    }
}

export default LoadingView