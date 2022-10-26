import React, { useEffect, useMemo, useState } from "react";
import {
  CardDiv,
  ImageSection,
  LoadingPaper,
  RecommendedPosts,
  SectionDiv,
} from "./styles";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../appFeatures/post/postSlice";

import CommentSection from "./CommentSection";

function PostDetails({ user }) {
  const dispatch = useDispatch();

  const { postsItem, isLoading, currentPost } = useSelector(
    (state) => state.posts
  );

  const [comments, setCommments] = useState(currentPost?.comments);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (currentPost) {
      dispatch(
        getPostsBySearch({ search: "none", tags: currentPost?.tags?.join(",") })
      );
    }
  }, [currentPost, dispatch]);

  console.log(currentPost?._id);

  const openPost = (id) => {
    navigate(`/posts/${id}`);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <LoadingPaper elevation={6}>
        <CircularProgress size="7em" />
      </LoadingPaper>
    );
  }

  if (!currentPost) {
    return;
  }

  const recommendedPosts = postsItem?.posts?.filter(
    ({ _id }) => _id !== currentPost?._id
  );

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <CardDiv>
        <SectionDiv>
          <Typography variant="h3" component="h2">
            {currentPost?.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {currentPost?.tags?.map((tag, i) => (
              <Link
                to={`posts/search?searchQuery=${null}/tags/${tag}`}
                style={{ textDecoration: "none", color: "#3f51b5" }}
                key={i}
              >
                {` #${tag} `}
              </Link>
            ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {currentPost?.message}
          </Typography>
          <Typography variant="h6">
            Created by:
            <Link
              to={`/creators/${currentPost?.name}`}
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              {` ${currentPost?.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">
            {moment(currentPost?.created_at).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection
            post={currentPost}
            user={user}
            currentPost={currentPost}
            setCommments={setCommments}
            comments={comments}
          />
          <Divider style={{ margin: "20px 0" }} />
        </SectionDiv>
        <ImageSection>
          <img
            src={
              currentPost?.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={currentPost?.title}
            style={{
              borderRadius: "20px",
              objectFit: "cover",
              width: "100%",
              maxHeight: "600px",
            }}
          />
        </ImageSection>
      </CardDiv>
      {recommendedPosts?.length >= 1 && (
        <SectionDiv>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <RecommendedPosts>
            {recommendedPosts?.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  key={_id}
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Like: {likes.length}
                  </Typography>
                  <img
                    src={
                      selectedFile ||
                      "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    }
                    alt={title}
                    width="200px"
                  />
                </div>
              )
            )}
          </RecommendedPosts>
        </SectionDiv>
      )}
    </Paper>
  );
}

export default PostDetails;
