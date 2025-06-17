import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CustomButton from "../../../components/customButton/CustomButton";
import { videoLessons } from "../shared/dashboardEnums";
import { useColors } from "../../../context/ColorContext";

const VideoluDersler = () => {
  const { colors } = useColors();

  return (
    <Box mb={6}>
      <Typography
        variant="h5"
        sx={{ 
          fontWeight: 700, 
          color: colors.primaryDark, // koyu mor-lila
          mb: 4, 
          textAlign: "center" 
        }}
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
                boxShadow: `0 6px 20px ${colors.primaryLight}33`, // hafif mor-lila gölge
                backgroundColor: colors.neutralLight, // açık gri-beyaz
                cursor: "pointer",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: `0 12px 28px ${colors.primaryLight}66`,
                },
              }}
              onClick={() => alert(`Videoyu izlemek için tıklandı: ${title}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") alert(`Videoyu izlemek için tıklandı: ${title}`);
              }}
              aria-label={`${title} videosunu izlemek için tıklayın`}
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
                  borderRadius: "3px 0 0 3px",
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
                  color={colors.primaryDark} // koyu mor-lila
                >
                  {title}
                </Typography>

                <Typography
                  variant="body2"
                  color={colors.neutralDark} // orta koyu gri
                  sx={{ mt: 1, mb: 2, flexGrow: 1 }}
                >
                  {description}
                </Typography>

                <CustomButton
                  size="small"
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Videoyu izlemek için tıklandı: ${title}`);
                  }}
                  text="İzle"
                  sx={{
                    alignSelf: "flex-end",
                    backgroundColor: colors.primary,
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: colors.primaryDark,
                    },
                    textTransform: "none",
                  }}
                  aria-label={`${title} videosunu izlemeye başla`}
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
