import React, { useState } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import FilterBar from "./components/FilterBar";
import VideoCard from "./components/VideoCard";
import VideoPreviewModal from "./components/VideoPreviewModal";
import InfoBox from "./components/InfoBox";
import { videos } from "./shared/lessonVideosEnums";

export default function LessonVideos() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [previewVideo, setPreviewVideo] = useState(null);

  const filteredVideos = videos.filter((v) => {
    return (
      (!search || v.title.toLowerCase().includes(search.toLowerCase())) &&
      (!category || v.category === category) &&
      (!level || v.level === level)
    );
  });

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Typography
        variant="h3"
        color="primary.main"
        sx={{ mb: 4, fontWeight: 900, letterSpacing: "0.05em", textAlign: "center" }}
      >
        🎥 Video Lessons
      </Typography>

      <InfoBox />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        level={level}
        onLevelChange={setLevel}
      />

      {filteredVideos.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            mt: 12,
            color: "text.secondary",
            userSelect: "none",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486793.png"
            alt="No results"
            style={{ width: 140, opacity: 0.3, margin: "0 auto" }}
          />
          <Typography variant="h6" sx={{ mt: 3, fontWeight: 600, fontStyle: "italic" }}>
            Oops! No videos found.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, maxWidth: 360, mx: "auto", color: "text.secondary" }}>
            Try adjusting your filters or search terms to find what you need.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {filteredVideos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <VideoCard video={video} onPreview={setPreviewVideo} />
            </Grid>
          ))}
        </Grid>
      )}

      <VideoPreviewModal
        open={Boolean(previewVideo)}
        onClose={() => setPreviewVideo(null)}
        video={previewVideo}
      />
    </Container>
  );
}
