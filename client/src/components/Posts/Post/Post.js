import React, { useState } from "react";
import { CardContent, Button, Typography, ButtonBase } from "@mui/material";
import {
  StyledCard,
  StyledCardMedia,
  StyledFirstDiv,
  StyledSecDiv,
  StyledTitle,
  StyledcardActions,
  StyledButtonBase,
} from "./styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../appFeatures/post/postSlice";
import { useNavigate } from "react-router-dom";

function Post({ post, setCurrentId, setupdateCode }) {
  const user = JSON.parse(localStorage.getItem("profile"))
    ? JSON.parse(localStorage.getItem("profile"))
    : JSON.parse(localStorage.getItem("googleProfile"));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = user?.userInfo?.id || user?.result?._id;
  const hasLikedPost = post?.likes?.find((id) => id === userId);

  const handleLike = async () => {
    if (hasLikedPost) {
      setLikes(post?.likes?.filter((id) => id !== userId));
    } else {
      setLikes([...post?.likes, userId]);
    }

    await dispatch(likePost(post?._id));
    setupdateCode((prev) => prev + 1);
  };

  const Likes = () => {
    if (likes?.length > 0) {
      return likes?.find((like) => like === userId) ? (
        <>
          <ThumbUpIcon fontSize="small" />
          &nbsp;
          {likes?.length > 2
            ? `You and ${likes?.length - 1} others`
            : `${likes?.length} like${likes?.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOffAltIcon fontSize="small" />
          &nbsp;{likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpOffAltIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  return (
    <StyledCard raised elevation={6}>
      <StyledButtonBase
        onClick={openPost}
        sx={{
          display: "block",
          textAlign: "initial",
        }}
      >
        <StyledCardMedia
          component="img"
          image={post?.selectedFile}
          height="194"
          alt="image"
          title={post?.title}
        />
        <StyledFirstDiv>
          <Typography variant="h6">{post?.name}</Typography>
          <Typography variant="body2">
            {moment(post?.created_at).fromNow()}
          </Typography>
        </StyledFirstDiv>
      </StyledButtonBase>

      {(user?.userInfo?.id === post?.creator ||
        user?.result?._id === post?.creator) && (
        <StyledSecDiv>
          <Button
            style={{ color: "white", zIndex: 999 }}
            size="small"
            onClick={() => {
              setCurrentId(post?._id);
            }}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </StyledSecDiv>
      )}

      <StyledButtonBase
        onClick={openPost}
        sx={{
          display: "block",
          textAlign: "initial",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            {post?.tags?.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <StyledTitle gutterBottom variant="h5" component="h2">
          {post?.title}
        </StyledTitle>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post?.message?.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </StyledButtonBase>

      <StyledcardActions>
        <Button
          size="small"
          color="primary"
          disabled={!user}
          onClick={handleLike}
          // try {
          //   await dispatch(likePost(post?._id));
          //   setupdateCode((prev) => prev + 1);
          // } catch (err) {
          //   console.log(err);
          // }
        >
          <Likes />
        </Button>
        {(user?.userInfo?.id === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              dispatch(deletePost(post?._id));
              setupdateCode((prev) => prev + 1);
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </StyledcardActions>
    </StyledCard>
  );
}

export default Post;
