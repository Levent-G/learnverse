import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography, Grid, Paper } from "@mui/material";
import {
  LibraryBooks,
  VolumeUp,
  Quiz,
  Category,
  Brightness4,
  PhoneAndroid,
} from "@mui/icons-material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const iconList = [
  <LibraryBooks fontSize="large" key="icon1" />,
  <VolumeUp fontSize="large" key="icon2" />,
  <Quiz fontSize="large" key="icon3" />,
  <Category fontSize="large" key="icon4" />,
  <Brightness4 fontSize="large" key="icon5" />,
  <PhoneAndroid fontSize="large" key="icon6" />,
];

const Features = ({ darkMode }) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const docRef = doc(db, "pages", "learnverse", "fields", "features");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const cards = [];
          for (let i = 1; i <= 6; i++) {
            const cardArr = data[`card${i}`];
            if (Array.isArray(cardArr) && cardArr.length > 0) {
              cards.push(cardArr[0]);
            }
          }
          setFeatures(cards);
        } else {
          console.log("Features dokümanı bulunamadı!");
        }
      } catch (error) {
        console.error("Features verisi çekilirken hata:", error);
      } finally {
      }
    }
    fetchFeatures();
  }, []);



  return (
    <Box
      id="features"
      sx={{
        py: 8,
        px: { xs: 3, md: 6 },
        bgcolor: darkMode ? "#121212" : "#fafafa",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight={800}
          mb={5}
          align="center"
          color={darkMode ? "primary.light" : "primary.main"}
          sx={{ letterSpacing: 1 }}
        >
          Öne Çıkan Özellikler
        </Typography>

        <Grid container spacing={5}>
          {features.map((feature, i) => (
            <Grid item xs={12} md={12} key={i}>
              <Paper
                elevation={6}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "flex-start", md: "center" },
                  p: 4,
                  borderRadius: 4,
                  bgcolor: darkMode ? feature.bgDarkColor : feature.bgLightColor,
                  color: darkMode ? feature.textDarkColor : feature.textLightColor,
                  boxShadow: darkMode
                    ? "0 8px 20px rgba(0,0,0,0.7)"
                    : "0 8px 24px rgba(0,0,0,0.12)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: darkMode
                      ? "0 16px 38px rgba(0,0,0,0.85)"
                      : "0 16px 38px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    mb: { xs: 2, md: 0 },
                    mr: { xs: 0, md: 4 },
                    minWidth: 80,
                    minHeight: 80,
                    bgcolor: darkMode ? feature.textDarkColor : feature.textLightColor,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: darkMode ? feature.bgDarkColor : feature.bgLightColor,
                    fontSize: 48,
                    boxShadow: darkMode
                      ? "0 4px 10px rgba(0,0,0,0.5)"
                      : "0 4px 12px rgba(0,0,0,0.1)",
                    width: 80,
                    height: 80,
                    flexShrink: 0,
                  }}
                >
                  {iconList[i % iconList.length]}
                </Box>

                <Box
                  sx={{
                    flexGrow: 1,
                    width: "100%",
                  }}
                >
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {feature.desc}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mt: { xs: 3, md: 0 },
                    ml: { xs: 0, md: 3 },
                    width: { xs: "100%", md: "auto" },
                  }}
                >
                  <Button
                    fullWidth={true}
                    variant="contained"
                    size="large"
                    sx={{
                      borderRadius: 30,
                      px: 5,
                      py: 1.3,
                      fontWeight: 700,
                      textTransform: "none",
                      backgroundColor: darkMode ? feature.bgLightColor : feature.bgDarkColor,
                      color: darkMode ? "black" : "white",
                      "&:hover": {
                        filter: "brightness(1.1)",
                        backgroundColor: darkMode ? feature.bgLightColor : feature.bgDarkColor,
                      },
                    }}
                  >
                    Başla
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
