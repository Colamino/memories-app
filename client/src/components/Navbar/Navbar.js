import React, { useEffect } from "react";
import {
  StyledAppBar,
  StyledAvatar,
  StyledImg,
  StyledLink,
  StyledToolbar,
  StyledTypoGraphy,
  LogoutButton,
  Profile,
} from "./styles";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import decode from "jwt-decode";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";

function Navbar({ user }) {
  const logout = () => {
    localStorage.clear();
    window.open("https://memories-app-l.herokuapp.com/auth/logout", "_self");
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, []);

  const name = user?.username;
  const letter = name?.charAt(0);

  return (
    <StyledAppBar position="static" color="inherit">
      <StyledLink to={"/"}>
        <img
          component={Link}
          to="/"
          src={memoriesText}
          alt="icon"
          height="45px"
        />
        <StyledImg src={memoriesLogo} alt="icon" height="40px" />
      </StyledLink>
      <StyledToolbar>
        {user ? (
          <Profile>
            <StyledAvatar
              alt={
                user?.userInfo?.displayName
                  ? user?.userInfo?.displayName
                  : user?.username
              }
              src={user?.userInfo ? user?.userInfo?.photos[0]?.value : null}
            >
              {user?.photos ? null : letter}
            </StyledAvatar>
            <StyledTypoGraphy variant="h6">
              {user?.userInfo?.displayName || user?.username}
            </StyledTypoGraphy>
            <LogoutButton
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </LogoutButton>
          </Profile>
        ) : (
          <Button
            component={Link}
            to={"/auth"}
            variant="container"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default Navbar;
