import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import PlaceDetails from "./PlaceDetails";

const List = ({ places, rating, setRating, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);
  console.log({ elRefs });
  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [places]);
  return (
    <div className="p-6">
      {isLoading ? (
        <div className="">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className="w-1/3">
            <InputLabel>Rating</InputLabel>
            <Select
              className="mb-3"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid
            className="flex flex-col space-y-4 overflow-auto"
            style={{ height: "75vh" }}
          >
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
