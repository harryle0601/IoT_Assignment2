import React from "react";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = theme => ({
    mediaGrid: {
        textAlign: "center",
        overflow: "hidden"
    },
    mediaGridCompact: {
        borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`
    },
    figure: {
        margin: "0",
        position: "relative",
        cursor: "pointer",
        background: "rgba(0,0,0,.38)",
        borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
        textAlign: "center",
        "&:hover $captionAnchor": {
            transform: "translate3d(0,0,0)",
            opacity: 1
        },
        "&:hover $caption::before": {
            transform: "translate3d(0,0,0)"
        }
    },
    figureCompact: {
        borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`
    },
    figureImg: {
        position: "relative",
        display: "block",
        width: "100%",
        height: "275px",
        ObjectFit: "cover",
        borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
        transition: "opacity 300ms, transform 300ms",
        opacity: 0.85
    },
    figureImgCompact: {
        borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`
    },
    badge: {
        color: theme.palette.primary.contrastText,
        textAlign: "center",
        position: "absolute",
        borderTop: `30px solid ${theme.palette.error.main}`,
        borderBottom: "30px solid transparent",
        borderRight: "30px solid transparent",
        borderLeft: `30px solid ${theme.palette.error.main}`,
        top: 0,
        left: 0,
        zIndex: 100
    },
    badgeText: {
        position: "absolute",
        transform: "rotate(-45deg)",
        top: "-18px",
        left: "-25px",
        whiteSpace: "nowrap",
        color: theme.palette.primary.contrastText
    },
    caption: {
        color: theme.palette.primary.contrastText,
        textTransform: "uppercase",
        backfaceVisibility: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        "&::before": {
            pointerEvents: "none",
            position: "absolute",
            width: "100%",
            height: "100%",
            borderStyle: "solid",
            borderColor: "rgba(0,0,0,.38)",
            content: "''",
            transition: "transform 300ms",
            right: 0,
            bottom: 0,
            borderWidth: "0 45px 0 0",
            transform: "translate3d(45px,0,0)"
        }
    },
    captionAnchor: {
        position: "relative",
        transition: "opacity 300ms, transform 300ms",
        display: "block",
        color: theme.palette.primary.contrastText,
        transform: "translate3d(90px,0,0)",
        margin: `${theme.spacing(1)}px 0`,
        "&:first-child": {
            transitionDelay: "0.025s"
        },
        "&:nth-child(2)": {
            transitionDelay: "0.05s"
        },
        "&:nth-child(3)": {
            transitionDelay: "0.075s"
        },
        "&:nth-child(4)": {
            transitionDelay: " 0.1s"
        }
    },
    paragraph: {
        margin: 0,
        float: "top",
        clear: "both",
        textAlign: "center",
        textTransform: "none",
        fontSize: "1rem",
        width: "45px",
        position: "relative"
    },
    price: {
        display: "flex",
        alignItems: "baseline"
    },
    mainPrice: {
        color: "green"
    }
});

class ThumbnailItem extends React.Component {
    
    handleClick(event) {
        this.props.selected(event, this.props.car.id)
        console.log("current " + this.props.current + " pick " + this.props.car.id)
    }

    render() {
        const car = this.props.car;
        const { classes } = this.props;
        return (
            <Card onClick={this.handleClick.bind(this)}>
                <div className={classes.mediaGrid}>
                    <figure className={classes.figure}>
                        <img alt={car.Model + car.Color} src={car.Image} className={classes.figureImg} />
                    </figure>
                </div>
                <CardContent className="pa-1" style={{
                    backgroundColor: ((this.props.current === car.id) ? "rgb(63, 81, 181)" : ""),
                    color: ((this.props.current === car.id) ? "white" : "")
                }}>
                    <Grid container spacing={0} direction="row" justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography>{car.Brand + " " + car.Model}</Typography>
                            <Typography variant="caption">{car.Color}</Typography>
                        </Grid>
                        <Grid item className={classNames(classes.price, "mat-text-primary text-xl")} >
                            <Typography variant="h6" className={classes.mainPrice} style={{
                                color: ((this.props.current === car.id) ? "white" : "")
                            }}>
                                {" "}
                                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(parseFloat(car.Price))}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(useStyles)(ThumbnailItem);