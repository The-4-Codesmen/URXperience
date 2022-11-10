import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery, UseMediaQuery } from "@mui/material";

const Map = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(min-width:600px");
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAp3VlXOSuuHoBCZQaMPGQD3va5zLqIn70" }}
        defaultCenter={coordinates}
        center={coordinates}
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
