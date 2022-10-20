import React, { useState, useEffect } from "react";
import { Button, Paper, Typography } from "@mui/material";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createPost, updatePost } from "../../appFeatures/post/postSlice";
import { useNavigate } from "react-router-dom";

import {
  StyledPaper,
  StyledForm,
  StyledFileInput,
  StyledButton,
  StyledTextField,
} from "./styles";

function Form({ currentId, setCurrentId, user, setupdateCode }) {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selecetedFile: "",
  });

  const jwtUser = JSON.parse(localStorage.getItem("profile"));

  const googleUser = JSON.parse(localStorage.getItem("googleProfile"));

  const name = jwtUser
    ? jwtUser?.result?.username
    : googleUser?.userInfo?.displayName;

  const dispatch = useDispatch();
  //! Fetch data from redux

  const post = useSelector((state) =>
    currentId
      ? state.posts.postsItem.posts.find((p) => p._id === currentId)
      : null
  );
  //! Get post data in the form when click the
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createPost({
          formData: { ...postData, name: name },
          navigate: navigate,
        })
      );
      clear();
      setupdateCode((prev) => prev + 1);
    } else {
      dispatch(
        updatePost({ id: currentId, post: { ...postData }, name: name })
      );
      setupdateCode((prev) => prev + 1);
      clear();
    }
  };
  const clear = () => {
    setCurrentId(0);

    setPostData({
      title: "",
      message: "",
      tags: "",
      selecetedFile: "",
    });
  };

  if (!user) {
    return (
      <Paper>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memory.
        </Typography>
      </Paper>
    );
  }

  return (
    <StyledPaper elevation={6}>
      <StyledForm autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">{`${
          currentId ? "Editing" : "Creating"
        } a Memory`}</Typography>

        <StyledTextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          //onchange, only change the specific property, and keep the prev data
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <StyledTextField
          name="message"
          variant="outlined"
          label="Message"
          multiline
          minRows="3"
          maxRows="5"
          fullWidth
          value={postData.message}
          //onchange, only change the specific property, and keep the prev data
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <StyledTextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          //onchange, only change the specific property, and keep the prev data
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <StyledFileInput>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </StyledFileInput>
        <StyledButton variant="contained" size="large" type="submit" fullWidth>
          Submit
        </StyledButton>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </StyledForm>
    </StyledPaper>
  );
}

export default Form;
