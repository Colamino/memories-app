import {
  AppBar,
  Avatar,
  Button,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: 15,
  margin: "30px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 50px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const StyledImg = styled("img")(({ theme }) => ({
  marginLeft: "10px",
  marginTop: "5px",
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "400px",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: deepPurple[500],
}));

export const StyledTypoGraphy = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
}));

export const LogoutButton = styled(Button)(({ theme }) => ({
  marginLeft: "20px",
}));

export const Profile = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "400px",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
    marginTop: 20,
    justifyContent: "center",
  },
}));
