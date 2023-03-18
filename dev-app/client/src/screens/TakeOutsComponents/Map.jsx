import React from "react";
import GoogleMapReact from "google-map-react";
import useStyles from "./Styles/MapStyle";

const Map = ({ setCoords, setBounds, coords, places, setChildClicked }) => {
  const classes = useStyles();
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={15}
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
            className={`${classes.markerContainer} cursor-pointer hover:text-red-500 `}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            <i className={`fas fa-map-marker-alt text-xl`}></i>
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
