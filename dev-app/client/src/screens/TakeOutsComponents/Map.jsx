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

const Map = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(min-width:600px");
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAp3VlXOSuuHoBCZQaMPGQD3va5zLqIn70" }}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        center={0}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={""}
        onChildClick={""}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
