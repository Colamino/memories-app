import {
  Card,
  CardActions,
  CardMedia,
  Typography,
  styled,
  ButtonBase,
} from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "15px",
  height: "100%",
  position: "relative",
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 250,

  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backgroundBlendMode: "darken",
}));

export const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  display: "block",
  textAlign: "initial",
}));

export const StyledFirstDiv = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "20px",
  left: "20px",
  color: "white",
}));

export const StyledSecDiv = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "20px",
  right: "20px",
  color: "white",
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  padding: "0 16px",
}));

export const StyledcardActions = styled(CardActions)(({ theme }) => ({
  padding: "0 16px 8px 16px",
  display: "flex",
  justifyContent: "space-between",
}));
