import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { useSelector } from "react-redux";
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
  const [user, setUser] = useState(null);
  const { authUser } = useSelector((state) => state.auth);

  const savedUser = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const getCustomUser = async () => {
      if (authUser && !savedUser) {
        setUser(authUser?.result);
        localStorage.setItem("profile", JSON.stringify(authUser));
      } else if (savedUser) {
        setUser(savedUser?.result);
      }
    };
    getCustomUser();
  }, [authUser]);

  useEffect(() => {
    const getLocalUser = async () => {
      try {
        await fetch("http://localhost:5000/auth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        })
          .then((res) => {
            if (res.status === 200) return res.json();
            throw new Error("authentication has been failed!");
          })
          .then((resObject) => {
            setUser(resObject.user);
            localStorage.setItem(
              "googleProfile",
              JSON.stringify(resObject.user)
            );
          });
      } catch (err) {
        console.log(err);
      }
    };
    getLocalUser();
  }, []);

  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Navigate to={"/posts"} />} />
          <Route path="/posts" element={<Home user={user} />} />
          <Route path="/posts/search" element={<Home user={user} />} />
          <Route path="/posts/:id" element={<PostDetails user={user} />} />
          <Route
            path="/auth"
            element={user ? <Navigate to={"/posts"} /> : <Auth />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
