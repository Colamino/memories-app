import React from "react";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostItems } from "../appFeatures/post/postSlice";

function Paginate({ page, updateCode, currentId }) {
  const dispatch = useDispatch();
  const { postsItem } = useSelector((state) => state.posts);
  const { posts, currentPage, numberOfPages } = postsItem;

  useEffect(() => {
    if (page) dispatch(getPostItems(page));
  }, [page, updateCode, currentId, dispatch]);

  // useEffect(() => {
  //   dispatch(getPostItems());
  // }, [currentId, dispatch, updateCode]);
  return (
    <Stack spacing={2}>
      <Pagination
        sx={{ justifyContent: "space-around" }}
        count={numberOfPages}
        page={currentPage || 1}
        shape="rounded"
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${item.page} `}
          />
        )}
      />
    </Stack>
  );
}

export default Paginate;
