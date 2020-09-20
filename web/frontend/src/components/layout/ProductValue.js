import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from './Typography';

const styles = (theme) => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    container: {
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(30),
        display: 'flex',
        position: 'relative',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
    },
    image: {
        height: 70,
    },
    title: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    curvyLines: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
    },
});

function ProductValues(props) {
    const { classes } = props;

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <img
                    src="/productCurvyLines.png"
                    className={classes.curvyLines}
                    alt="curvy lines"
                />
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                height={'100px'}
                                style={{marginBottom:'-30px'}}
                                src="/productValues1.jpg"
                                alt="suitcase"
                            />
                            <Typography variant="h6" className={classes.title}>
                                The best luxury cars
                            </Typography>
                            <Typography variant="h5">
                                {'Well-know renting luxury car around the globe'}

                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="/productValues2.svg"
                                alt="graph"
                            />
                            <Typography variant="h6" className={classes.title}>
                                New experiences
                            </Typography>
                            <Typography variant="h5">
                                {'Enjoy the time of your life with the best car'}

                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="/productValues3.svg"
                                alt="clock"
                            />
                            <Typography variant="h6" className={classes.title}>
                                Exclusive deals
                            </Typography>
                            <Typography variant="h5">
                                {'By registering, you will access specially negotiated deals '}
                                {'that you will not find anywhere else.'}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}

ProductValues.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);