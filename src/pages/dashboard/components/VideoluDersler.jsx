import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CustomButton from "../../../components/customButton/CustomButton";
import { videoLessons } from "../shared/dashboardEnums";

const VideoluDersler = () => {
  return (
    <Box mb={6}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: "#6a1b9a", mb: 4, textAlign: "center" }} // mor-lila
      >
        Videolu Dersler
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {videoLessons.map(({ id, thumbnail, title, description }) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card
              elevation={6}
              sx={{
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                height: 190,
                overflow: "hidden",
                boxShadow: "0 6px 20px rgba(106, 27, 154, 0.15)",
                backgroundColor: "#fafafa",
              }}
            >
              <Box
                component="img"
                src={thumbnail}
                alt={title}
                sx={{
                  width: 160,
                  height: "100%",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  px: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color="#4e342e" // koyu kahve-mor karışımı
                >
                  {title}
                </Typography>

                <Typography
                  variant="body2"
                  color="#6d4c41"
                  sx={{ mt: 1, mb: 2, flexGrow: 1 }}
                >
                  {description}
                </Typography>

                <CustomButton
                  size="small"
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => alert(`Videoyu izlemek için tıklandı: ${title}`)}
                  text="İzle"
                  sx={{
                    alignSelf: "flex-end",
                    backgroundColor: "#6a1b9a",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#4a148c",
                    },
                    textTransform: "none",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VideoluDersler;
