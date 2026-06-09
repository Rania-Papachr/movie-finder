import { Typography, Box, CircularProgress } from "@mui/material";

type PageLoaderProps = {
  message?: string;
};

const PageLoader = ({ message }: PageLoaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        gap: 2,
      }}
    >
      <Typography variant="h6">{message}</Typography>
      <CircularProgress size={60} />
    </Box>
  );
};

export default PageLoader;
