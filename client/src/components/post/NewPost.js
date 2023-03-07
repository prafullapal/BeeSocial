import React, { useState } from "react";
import PropTypes from "prop-types";

import { create } from "./api-post";

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  IconButton,
  Divider,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { connect } from "react-redux";

function NewPost(props) {
  const [values, setValues] = useState({
    text: "",
    photo: null,
    error: "",
    user: {},
  });
  const clickPost = () => {
    let postData = new FormData();
    values.text && postData.append("text", values.text);
    values.photo && postData.append("photo", values.photo);
    console.log(postData);
    create({ userId: props.user.userId }, postData).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, text: "", photo: null });
        // props.addUpdate(data);
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const photoUrl = props.user.userId
    ? `/api/users/photo/${props.user.userId}`
    : null;
  console.log(values.photo);
  return (
    <div>
      <Card variant="outlined">
        <CardHeader
          avatar={
            photoUrl ? (
              <Avatar src={photoUrl} />
            ) : (
              <Avatar>
                <PersonIcon />
              </Avatar>
            )
          }
          title={props.user.name}
          action={
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                onChange={handleChange("photo")}
                id="icon-button-file"
                type="file"
                style={{ display: "none" }}
              />
              <IconButton color="secondary" component="span">
                <PhotoCameraIcon />
              </IconButton>
            </label>
          }
        />
        <Divider />

        <CardContent>
          <Stack direction="row" spacing={2}>
            <TextField
              placeholder="Share your thoughts..."
              fullWidth
              multiline
              rows="6"
              value={values.text}
              onChange={handleChange("text")}
            />
            {values.photo ? (
              <Stack spacing={1}>
                <CardMedia
                  component="img"
                  image={URL.createObjectURL(values.photo)}
                  style={{
                    width: "100px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                  alt={values.photo.name}
                />
              </Stack>
            ) : null}
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            disabled={values.text === ""}
            onClick={clickPost}
          >
            POST
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

NewPost.propTypes = {
  addUpdate: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return{
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(NewPost);