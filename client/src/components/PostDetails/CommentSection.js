import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";

import { commentPost } from "../../appFeatures/post/postSlice";
import { CommentsInnerContainer, CommentsOuterContainer } from "./styles";

function CommentSection({ post, user, currentPost, setCommments, comments }) {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const commentRef = useRef();

  console.log(currentPost?.comments);
  console.log(comments);

  const handleClick = async () => {
    const finalComment = `${
      user?.userInfo?.displayName ? user?.userInfo?.displayName : user?.username
    }: ${comment}`;

    const newComments = await dispatch(
      commentPost({ finalComment: finalComment, id: post?._id })
    );

    setCommments(newComments);
    setComment("");

    commentRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const mediaMatch = window.matchMedia("(min-width: 500)");

  return (
    <div>
      <CommentsOuterContainer>
        <CommentsInnerContainer>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((commment, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{commment.split(": ")[0]}</strong>
              {commment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentRef} />
        </CommentsInnerContainer>
        {user && (
          <div style={{ width: mediaMatch ? "100%" : "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </CommentsOuterContainer>
    </div>
  );
}

export default CommentSection;
