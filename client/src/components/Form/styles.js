import { Button, Paper, styled, TextField } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  margin: theme.spacing(1),
}));

export const StyledFileInput = styled("div")(({ theme }) => ({
  width: "97%",
  margin: "10px 0",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: 10,
  backgroundColor: theme.palette.primary.dark,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
