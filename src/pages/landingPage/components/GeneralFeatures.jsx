import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const GeneralFeatures = () => {
  const [title, setTitle] = useState("");
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const docRef = doc(db, "pages", "learnverse", "fields", "generalfeatures");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "Learnverse Genel Özellikleri");
          setFeatures(data.ozellikler || []);
        } else {
          console.log("generalfeatures dokümanı bulunamadı");
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
      }
    }
    fetchFeatures();
  }, []);


  return (
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
        {title}
      </Typography>

      <List
        sx={{
          maxWidth: "600px",
          mx: "auto",
        }}
      >
        {features.map((feature, idx) => (
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
  );
};

export default GeneralFeatures;
