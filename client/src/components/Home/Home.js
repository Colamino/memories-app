import {
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
  Button,
  Chip,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../appFeatures/post/postSlice";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import Pagination from "../Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import { AppbarSearch, PaperPag } from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home({ user }) {
  const [currentId, setCurrentId] = useState(0);
  const [updateCode, setupdateCode] = useState(0);
  const dispatch = useDispatch();
  //for search function
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search: search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleKeyDown = (e) => {
    const value = e.target.value;
    //keyCode: 13 === enter key
    if (e.keyCode !== 13) return;
    if (!value.trim()) return;
    else {
      setTags([...tags, value]);
      e.target.value = "";
    }
  };

  const removeChip = (i) => {
    setTags(tags.filter((prev, index) => index !== i));
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} setupdateCode={setupdateCode} />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <AppbarSearch position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 1,
                  pl: 1.5,
                  m: 0,
                  gap: 1,
                }}
              >
                {tags?.map((chip, i) => (
                  <Chip key={i} label={chip} onDelete={() => removeChip(i)} />
                ))}

                <TextField
                  placeholder="Search by tags"
                  variant="standard"
                  onKeyDown={handleKeyDown}
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Paper>
              <Button onClick={searchPost} variant="contained" color="primary">
                Search
              </Button>
            </AppbarSearch>
            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              user={user}
              setupdateCode={setupdateCode}
            />
            {!searchQuery && !tags.length && (
              <PaperPag elevation={6}>
                <Pagination
                  page={page}
                  setupdateCode={setupdateCode}
                  updateCode={updateCode}
                  currentId={currentId}
                />
              </PaperPag>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
