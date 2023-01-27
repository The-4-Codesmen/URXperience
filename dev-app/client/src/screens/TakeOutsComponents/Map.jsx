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

const Map = ({ setCoords, setBounds, coords, places, setChildClicked }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAp3VlXOSuuHoBCZQaMPGQD3va5zLqIn70" }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={`${classes.markerContainer} cursor-pointer hover:text-purple-300`}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            <LocationOnOutlinedIcon color="secondary" fontSize="larger" />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
