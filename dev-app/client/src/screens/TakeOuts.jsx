import React from "react";
import { CssBaseline, Grid } from "@mui/material";
import Header from "./TakeOutsComponents/Header";
import List from "./TakeOutsComponents/List";
import Map from "./TakeOutsComponents/Map";

const TakeOuts = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={4}>
          <Map />
        </Grid>
      </Grid>
    </>
  );
};

export default TakeOuts;
