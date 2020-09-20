import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from './Typography';

const styles = (theme) => ({
    root: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
    },
    images: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexWrap: 'wrap',
    },
    imageWrapper: {
        position: 'relative',
        display: 'block',
        padding: 0,
        borderRadius: 0,
        height: '40vh',
        [theme.breakpoints.down('sm')]: {
            width: '100% !important',
            height: 100,
        },
        '&:hover': {
            zIndex: 1,
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15,
        },
        '&:hover $imageMarked': {
            opacity: 0,
        },
        '&:hover $imageTitle': {
            border: '4px solid currentColor',
        },
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: theme.palette.common.black,
        opacity: 0.5,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        background: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

function ProductCategories(props) {
    const { classes } = props;

    const images = [
        {
            url:
                'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
            title: 'Life is a joy',
            width: '40%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            title: 'Looks Cool',
            width: '20%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
            title: 'Speedy',
            width: '40%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1493031534415-e40b830b1099?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            title: 'Classy',
            width: '38%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1471289549423-04adaecfa1f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1553&q=80',
            title: 'Luxury',
            width: '38%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Off-road',
            width: '24%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1567575871234-9dc0fb96388d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            title: 'Daily Life',
            width: '40%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1582267911234-b19bd332d197?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
            title: 'Fearless',
            width: '20%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1598194417760-38caa2b3d104?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
            title: 'Gentle',
            width: '40%',
        },
    ];

    return (
        <Container className={classes.root} component="section">
            <Typography variant="h4" marked="center" align="center" component="h2">
                For all tastes and all desires
            </Typography>
            <div className={classes.images}>
                {images.map((image) => (
                    <ButtonBase
                        key={image.title}
                        className={classes.imageWrapper}
                        style={{
                            width: image.width,
                        }}
                    >
                        <div
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <div className={classes.imageBackdrop} />
                        <div className={classes.imageButton}>
                            <Typography
                                component="h3"
                                variant="h6"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                {image.title}
                                <div className={classes.imageMarked} />
                            </Typography>
                        </div>
                    </ButtonBase>
                ))}
            </div>
        </Container>
    );
}

ProductCategories.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);