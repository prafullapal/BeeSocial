import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { Avatar, ImageList, ImageListItem, Typography } from "@mui/material";

export default function FollowGrid(props) {
  return (
    <div>
      <ImageList rowHeight={160} cols={4}>
        {props.people &&
          props.people.map((person, i) => {
            return (
              <ImageListItem style={{ height: 120 }} key={i}>
                <Link to={"/user/" + person._id}>
                  <Avatar src={"/api/users/photo/" + person._id} />
                  <Typography>{person.name}</Typography>
                </Link>
              </ImageListItem>
            );
          })}
      </ImageList>
    </div>
  );
}

FollowGrid.propTypes = {
  people: PropTypes.array.isRequired,
};
