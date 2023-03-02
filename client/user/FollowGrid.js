import React from "react";
import PropTypes from "prop-types";
import { Avatar, ImageList, ImageListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function FollowGrid(props) {
  return (
    <div>
      <ImageList rowHeight={160} className="gridList" cols={4}>
        {props.people &&
          props.people.map((person, i) => {
            return (
              <ImageListItem style={{ height: 120 }} key={i}>
                <Link to={"/user/" + person._id}>
                  <Avatar
                    src={"/api/users/photo/" + person._id}
                    className="bigAvatar"
                  />
                  <Typography className="tileText">{person.name}</Typography>
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
