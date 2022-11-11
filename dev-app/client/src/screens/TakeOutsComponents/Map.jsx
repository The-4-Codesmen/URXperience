import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery, UseMediaQuery } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Rating from "@mui/lab";
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
