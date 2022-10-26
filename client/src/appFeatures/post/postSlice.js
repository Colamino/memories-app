import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/index";

const initialState = {
  postsItem: {
    currentPage: 1,
    numberOfPages: 1,
    posts: [],
  },
  isLoading: false,
  currentPost: {},
};

export const getPost = createAsyncThunk("posts/getPost", async (id) => {
  try {
    const { data } = await api.fetchPost(id);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getPostItems = createAsyncThunk(
  "posts/getPostItems",
  async (page) => {
    try {
      const { data } = await api.fetchPosts(page);
      //return data = {currentPage, data:{posts in the page}, numberOfPages}
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getPostsBySearch = createAsyncThunk(
  "posts/getPostBySearch",
  async (searchQuery) => {
    try {
      const {
        data: { data },
      } = await api.fetchPostsBySearch(searchQuery);
      const reverse = data.reverse();
      return reverse;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newData) => {
    const { formData, navigate } = newData;
    try {
      const { data } = await api.createPost(formData);
      await navigate(`/posts/${data?._id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updatePost = createAsyncThunk("posts/updatePost", async (data) => {
  const { id, post } = data;
  try {
    const { data } = await api.updatePost(id, post);

    return data;
  } catch (err) {
    console.log(err);
  }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    const { data } = await api.deletePost(id);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  try {
    const { data } = await api.likePost(id);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async (comment) => {
    const { finalComment, id } = comment;
    try {
      const { data } = await api.comment(finalComment, id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getPostItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getPostItems.fulfilled]: (state, action) => {
      // set item in empty array
      state.postsItem = {
        // ...state.postsItem,
        posts: action?.payload?.data,
        currentPage: action?.payload?.currentPage,
        numberOfPages: action?.payload?.numberOfPages,
      };
      state.isLoading = false;
    },
    [getPostItems.rejected]: (state) => {
      state.isLoading = false;
    },

    [getPostsBySearch.pending]: (state) => {
      state.isLoading = true;
    },
    [getPostsBySearch.fulfilled]: (state, action) => {
      // set item in empty array
      state.postsItem.posts = action?.payload;
      state.isLoading = false;
    },
    [getPostsBySearch.rejected]: (state) => {
      state.isLoading = false;
    },
    [getPost.pending]: (state) => {
      state.isLoading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      // set item in empty array
      state.currentPost = action.payload;
      state.isLoading = false;
    },
    [getPost.rejected]: (state) => {
      state.isLoading = false;
    },

    [createPost.pending]: (state) => {
      state.isLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state?.postsItem?.posts?.unshift(action?.payload);
      state.isLoading = false;
    },
    [createPost.rejected]: (state) => {
      state.isLoading = false;
    },
    [updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state?.postsItem?.posts?.map((post) =>
        post._id === action?.payload?._id ? action?.payload : post
      );
      state.isLoading = false;
    },
    [updatePost.rejected]: (state) => {
      state.isLoading = false;
    },
    [deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state?.postsItem?.posts?.filter(
        (post) => post?._id !== action?.payload?.id
      );

      state.isLoading = false;
    },
    [deletePost.rejected]: (state) => {
      state.isLoading = false;
    },
    [likePost.pending]: (state) => {
      state.isLoading = false;
    },
    [likePost.fulfilled]: (state, action) => {
      state.postsItem.posts.map((post) =>
        post?._id === action?.payload?._id ? action?.payload : post
      );
      state.isLoading = false;
    },
    [likePost.rejected]: (state) => {
      state.isLoading = false;
    },
    [commentPost.pending]: (state) => {
      state.isLoading = false;
    },
    [commentPost.fulfilled]: (state, action) => {
      state.currentPost.comment = action?.payload?.comment;
      state.isLoading = false;
    },
    [commentPost.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default postSlice.reducer;
