import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./TakeOutsComponents/Header";
import List from "./TakeOutsComponents/List";
import Map from "./TakeOutsComponents/Map";
import { getPlacesData } from "../backendtakeouts/takeouts";
import { updateUser, isAuth, getCookie, signout } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const TakeOuts = () => {
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [filteredPlaces, setFilteredPlace] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});
  const [rating, setRating] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie("token");
    if (!getCookie("token")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:5000/api/user/${isAuth()._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const { role, name, email } = res.data;
        })
        .catch((err) => {
          toast.error(`Error to your Information ${err.response.statusText}`);
          if (err.response.status === 401) {
            signout(() => {
              navigate("/login");
            });
          }
        });
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlace(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bounds.sw, bounds.ne).then((data) => {
      setPlaces(data);
      setFilteredPlace([]);
      setRating("");
      setIsLoading(false);
    });
  }, [coords, bounds]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoords({ lat, lng });
  };

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            rating={rating}
            setRating={setRating}
            childClicked={childClicked}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Map
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default TakeOuts;
