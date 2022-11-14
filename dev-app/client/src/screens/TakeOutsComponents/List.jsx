import React from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import { useState } from "react";
import PlaceDetails from "./PlaceDetails";
import useStyles from "./Styles/ListStyle";

const List = ({ places }) => {
  const classes = useStyles();
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");

  return (
    <div className={classes.container}>
      {/*<Typography variant="h4">Food Places</Typography> */}
      {/*
      <FormControl className={classes.FormControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
  */}
      <Grid container spacing={3} className={classes.list}>
        {places?.map((place, i) => (
          <Grid item key={i} xs={12}>
            <PlaceDetails place={place} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default List;
