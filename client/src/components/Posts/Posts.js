import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";

function Posts({ setCurrentId, setupdateCode }) {
  const { postsItem, isLoading } = useSelector((state) => state.posts);
  const posts = postsItem?.posts;

  if (!posts.length && !isLoading) return "No posts";

  return !posts.length ? (
    <CircularProgress />
  ) : (
    // <CircularProgress size={"100px"} />
    <Grid
      container
      alignItems="stretch"
      spacing={3}
      sx={{ display: "flex", alignItems: "center" }}
    >
      {posts?.map((post) => (
        <Grid key={post?._id} item xs={12} sm={12} md={6} lg={3}>
          <Post
            key={post?._id}
            post={post}
            setCurrentId={setCurrentId}
            setupdateCode={setupdateCode}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
