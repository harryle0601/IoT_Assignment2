import React from 'react';
import cx from 'clsx';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardMedia, Button } from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import BookThisCarDialog from '../dialog/bookingDialog'
import EditCarInfoDialog from '../dialog/editCarInfoDialog'
import CreateIssueDialog from '../dialog/createIssueDialog'
import { removeCar } from '../store/actions/carActions'

const useStyles = makeStyles(() => ({
    card: {
        // marginTop: "10%",
        transition: '0.3s',
        width: '100%',
        overflow: 'initial',
        background: '#ffffff',
        borderRadius: 16,
    },
}));

const CarCard = (props) => {

    const classes = useStyles();
    const mediaStyles = useFourThreeCardMediaStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useLightTopShadowStyles({ inactive: false });
    const { car, currentUser } = props

    return (
        <Card className={cx(classes.root, shadowStyles.root)} style={{ position: "relative", marginBottom: '10px', borderRadius: 0 }}>
            <CardContent className={classes.content}>
                <div style={{ marginTop: "2%" }}>
                    <div className='image'>
                        <CardMedia
                            alt="car"
                            className={cx(classes.media, mediaStyles.root)}
                            image={car.Image}
                        />
                        <div className="overlay" style={{ borderRadius: 16 }}>
                            { currentUser.Role !== "Admin" ? <BookThisCarDialog car={car} currentUser={currentUser}/>
                                                    : <EditCarInfoDialog car={car} currentUser={currentUser}/>}
                            { currentUser.Role === "Admin" ? <CreateIssueDialog car={car} currentUser={currentUser}/> : null}
                            { currentUser.Role === "Admin" ? <Button variant="contained" color="secondary" onClick={() => props.removeCar(car.id)}>Remove Car</Button> : null}
                        </div>
                    </div>
                </div>
                <TextInfoContent
                    classes={textCardContentStyles}
                    overline={car.Brand + " " + car.Model}
                    heading={car.Price ? '$' + car.Price.toLocaleString() : null}
                />
            </CardContent>
        </Card>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeCar: (carId) => dispatch(removeCar(carId))
    }
}


export default connect(null, mapDispatchToProps)(CarCard)
