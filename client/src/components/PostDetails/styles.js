import { Paper } from "@mui/material";
import { styled } from "@mui/system";

export const LoadingPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderRadius: "15px",
  height: "39vh",
}));

export const CardDiv = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    flexDirection: "column",
  },
}));

export const SectionDiv = styled("div")(({ theme }) => ({
  borderRadius: "20px",
  margin: "10px",
  flex: 1,
}));

export const ImageSection = styled("div")(({ theme }) => ({
  marginLeft: "20px",
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

export const RecommendedPosts = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const CommentsOuterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const CommentsInnerContainer = styled("div")(({ theme }) => ({
  height: "200px",
  overflowY: "auto",
  marginRight: "30px",
}));
