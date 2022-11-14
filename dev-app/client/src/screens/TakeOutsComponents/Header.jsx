import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./Styles/HeaderStyle";
const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Food Take Outs
        </Typography>
        <Box display="flex">
          {/*
          <Typography variant="h6" className={classes.title}>
            Explore New Places
          </Typography>
          */}
          {/* <Autocomplete> */}
          {/*
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeHolder="Search for a location"
              classes={{ root: classes.input, input: classes.inputInput }}
            />
          </div>
        */}
          {/* </Autocomplete> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
