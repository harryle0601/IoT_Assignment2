import React, { Component } from 'react'
import { Container, NoSsr, LinearProgress, withStyles } from '@material-ui/core'
import Button from '../layout/Button'
import "./style.css"

export class Success extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        return (
            <div className="base-container">
                <Container style={{ marginTop: "2%", width: "500px" }}>
                    <form className="white auth" onSubmit={this.handleSubmit} style={{ padding: "2%" }}>
                        <div className="header">Success</div>
                        <div className="image">
                            <img src="/check.png"></img>
                        </div>
                        <div className="form">
                            <div className="form-group">
                                <div>Redirect you to Car booking Page</div>
                            </div>
                        </div>
                        <div className="input-field">
                            <NoSsr>
                                <Button color="secondary"
                    size="large"
                    variant="contained" href="/signin">Done</Button>
                            </NoSsr>
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}

export default Success
