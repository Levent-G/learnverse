import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useFetchData } from "../../../hooks/useFetchData";

const GeneralFeatures = () => {
  const [data, error] = useFetchData("generalfeatures");

  return !error ? (
    <Box textAlign="center" my={8}>
      <Typography
        variant="h3"
        fontWeight="extrabold"
        gutterBottom
        sx={{
          background: "linear-gradient(to right, #6B21A8, #EC4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
          mb: 5,
        }}
      >
        {data?.title}
      </Typography>

      <List
        sx={{
          maxWidth: "600px",
          mx: "auto",
        }}
      >
        {data?.ozellikler.map((feature, idx) => (
          <ListItem
            key={idx}
            sx={{
              borderRadius: 2,
              p: 2,
              gap: 1.5,
              cursor: "default",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#F3E8FF",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: "32px" }}>
              <CheckCircleIcon sx={{ color: "#6B21A8" }} />
            </ListItemIcon>
            <ListItemText
              primary={feature.value}
              primaryTypographyProps={{
                fontSize: "1.125rem",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  ) : (
    <Typography
      fontSize="1.5rem"
      sx={{ fontWeight: 800, color: "red", textAlign: "center" }}
    >
      Sayfa Yüklenirken Hata Oluştu
    </Typography>
  );
};

export default GeneralFeatures;
