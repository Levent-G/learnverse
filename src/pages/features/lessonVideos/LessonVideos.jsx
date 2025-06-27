// src/pages/LessonVideos.jsx
import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
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
      (!search ||
        v.title.toLowerCase().includes(search.toLowerCase())) &&
      (!category || v.category === category) &&
      (!level || v.level === level)
    );
  });

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        color="primary.dark"
        sx={{ mb: 3, fontWeight: 800 }}
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
            mt: 8,
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486793.png"
            alt="No results"
            style={{ width: 150, opacity: 0.5 }}
          />
          <Typography
            variant="h6"
            sx={{ mt: 2, color: "#94A3B8" }}
          >
            Oops! No videos found.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredVideos.map((video) => (
            <Grid item xs={12} key={video.id}>
              <VideoCard
                video={video}
                onPreview={setPreviewVideo}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <VideoPreviewModal
        open={!!previewVideo}
        onClose={() => setPreviewVideo(null)}
        video={previewVideo}
      />
    </Box>
  );
}
