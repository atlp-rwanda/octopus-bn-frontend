import React, { useEffect } from "react";
import { connect } from "react-redux";
import { viewAllAccommodations } from "../redux/actions/accommodationAction";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import HomeTopView from "../views/Dashboard/HomeTopView";
import customStyles from "../styles/dashboard.module.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Pagination from "@material-ui/lab/Pagination";
import StarIcon from "@material-ui/icons/Star";
import CardActionArea from "@material-ui/core/CardActionArea";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    maxwidth: 300,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  pagination: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  progress: {
		position: 'absolute',
		marginRight: 'auto',
    marginLeft: 'auto',
		left: 0,
		right: 0
	}
}));

const Home = ({ data, viewAllAccommodations }) => {
  useEffect(() => {
    viewAllAccommodations(page);
  }, [page]);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    viewAllAccommodations(value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const numberOfAccommodations = data.allAccommodations.length;
  
  return (
    <div>
      <HomeTopView title="Home" />
      <h1 className={customStyles.headingAccom}>Accommodations</h1>
      <div className={customStyles.CardContainer}>
        {data.loading ? (
            <CircularProgress 
            style={{
              display: "inline-block",
              marginLeft: "500px",
            }}
            variant="indeterminate" disableShrink size={24} thickness={4} />
        ) : data.allAccommodations.length === 0?
           <p
            style={{
              display: "inline-block",
              marginLeft: "400px",
            }}>
            No more accommodations found!
           </p>
        :(
          data &&
          data.allAccommodations 
          &&
          data.allAccommodations.map((accommodation) => (
            <Card
            key={accommodation.id}
            style={{
              width: "280px",
              height:"100%",
              display: "inline-block",
              marginBottom: "40px",
              marginRight: "60px",
            }}
            className={classes.root}
            >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image= {accommodation.imageUrl}/>
              <CardContent>
                <h1 className={customStyles.headingTitle}>
                {
                  accommodation.name.substring(0, 10)
                }
                <a className={customStyles.moreLink}  href="#">...More</a>
                </h1>

                <Typography
                  style={{ paddingBottom: "10px" }}
                  variant="body2"
                  color="textPrimary"
                  component="p"
                   >
                  <span className={customStyles.Address}>
                    <LocationOnIcon style={{ color: "#C4C4C4" }} />
                  </span>
                  <span>&nbsp;{accommodation.city} - {accommodation.country}</span>
                </Typography>
                <Typography
                   style={{ marginBottom: "-30px" }}
                variant="body2" color="textPrimary" component="p">
                  <span>
                    &nbsp;&nbsp;{accommodation.around[0]}
                  </span>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <ThumbUpIcon style={{ color: "#42A6F5" }} />
              </IconButton>
              <IconButton aria-label="share">
                <ThumbDownIcon style={{ color: "rgba(63, 61, 86, 0.7)" }}/>
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
               <span className={customStyles.RatingNumber}>{accommodation.average_ratings}</span>
                <StarIcon style={{ color: "#A6BB26" }} />
              </IconButton>
            </CardActions>
          </Card>
          ))
        )}
      </div>
      <div className={customStyles.PaginationContainer}>
        <div className={classes.pagination}>
          <Pagination
            data-testid="paginator"
            count={numberOfAccommodations}
            defaultPage={6}
            page={page}
            onChange={handleChange}/>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.accommodation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewAllAccommodations: (page) => dispatch(viewAllAccommodations(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
