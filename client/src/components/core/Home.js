import React from "react";

import Newsfeed from "../post/Newsfeed";
import FindPeople from "../user/FindPeople";

import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

import unicornbikeImg from "./../../../assets/images/unicornbike.jpg";
// import "./../assets/css/Home.css";

export default function Home(props) {
  return (
    <>
      {!props.isAuth && (
        <Card>
          <Typography variant="h6">Home Page</Typography>
          <CardMedia
            component="img"
            image={unicornbikeImg}
            title="Unicorn Bicycle"
          />
          <CardContent>
            <Typography variant="body2" component="p">
              Welcome to BeeSocial
            </Typography>
          </CardContent>
        </Card>
      )}
      {props.isAuth && (
        <Grid container spacing={3} sx={{ padding: "10px" }}>
          <Grid item md={1}></Grid>
          <Grid item md={6} sm={5} xs={8}>
            <Newsfeed {...props} />
          </Grid>
          <Grid item md={5} sm={5} xs={4}>
            <FindPeople {...props} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
