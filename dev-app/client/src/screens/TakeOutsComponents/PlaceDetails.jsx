import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./Styles/PlaceDetailsStyle";
import LocationOn from "@material-ui/icons/LocationOn";

const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyles();

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <>
      {place.photo ? (
        <Card elevation={6}>
          {/* <CardMedia title={place.name} /> */}
          <CardMedia
            style={{ height: 350 }}
            image={place.photo.images.large.url}
            title={place.name}
          />
          <CardContent className="bg-yellow-100">
            <Typography gutterBottom variant="h5">
              {place.name}
            </Typography>
            <Box display="flex" justifyContent="space_between" my={2}></Box>
            <Rating
              name="read-only"
              value={Number(place.rating)}
              readOnly
            ></Rating>
            <Typography component="legend">
              {place.num_reviews} review{place.num_reviews > 1 && "s"}
            </Typography>
            {place?.cuisine?.map(({ name }) => (
              <Chip
                key={name}
                size="small"
                label={name}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  marginRight: 3,
                  marginBottom: 4,
                }}
              />
            ))}
            {place.address && (
              <Typography
                gutterBottom
                variant="body2"
                color="textSecondary"
                className={classes.subtitle}
              >
                <LocationOnIcon />
                {place.address}
              </Typography>
            )}
            {place.phone && (
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.spacing}
              >
                <PhoneIcon />
                <a className="text-blue-500" href={`tel:${place.phone}`}>
                  {place.phone}
                </a>
              </Typography>
            )}
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => window.open(place.website, "_blank")}
              >
                Website
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      ) : (
        <div className="hidden">hehe</div>
      )}
    </>
  );
};

export default PlaceDetails;
