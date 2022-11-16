import React from "react";
import GoogleMapReact from "google-map-react";
import {
  Paper,
  Typography,
  useMediaQuery,
  UseMediaQuery,
} from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab";
import useStyles from "./Styles/MapStyle";

const Map = ({ setCoordinates, setBounds, coordinates, places }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px");
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAp3VlXOSuuHoBCZQaMPGQD3va5zLqIn70" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={""}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="larger" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img className={classes.pointer} alt={place.name} />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
