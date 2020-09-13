import React, { useState } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardMedia } from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import BookThisCarDialog from '../dialog/bookingDialog'

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
    const shadowStyles = useOverShadowStyles({ inactive: false });
    const car = props.car

    return (
        <Card className={cx(classes.root, shadowStyles.root)} style={{ position: "relative", marginBottom: '10px', borderRadius: 16 }}>
            <CardContent className={classes.content}>
                <div style={{ marginTop: "2%" }}>
                    <div className='image'>
                        <CardMedia
                            alt="car"
                            className={cx(classes.media, mediaStyles.root)}
                            image={car.Image}
                        />
                        <div className="overlay" style={{ borderRadius: 16 }}>
                            {<BookThisCarDialog car={car} currentUser={props.currentUser}/>}
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

export default CarCard
