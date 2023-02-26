import React from "react";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./../assets/css/Home.css";
import unicornbikeImg from "./../assets/images/unicornbike.jpg";

export default function Home() {
  return (
    <>
      <Card className="card">
        <Typography variant="h6" className="title">
          Home Page
        </Typography>
        <CardMedia
          component="img"
          image={unicornbikeImg}
          className="media"
          title="Unicorn Bicycle"
        />
        <CardContent>
          <Typography variant="body2" component="p">
            Welcome to MERN Skeleton Home Page.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
