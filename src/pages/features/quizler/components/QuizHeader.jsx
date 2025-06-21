import { Box, Typography, LinearProgress } from "@mui/material";

export default function QuizHeader({ countdown, current, total }) {
  const formatTime = (secs) => {
    if (secs === null || secs === undefined) return "";
    return secs.toString();
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Zaman ve ProgressBar Alanı */}
      <Box sx={{ minHeight: 40, mb: 1 }}>
        {countdown !== null && countdown !== undefined ? (
          <>
            <Typography
              variant="body2"
              sx={{ textAlign: "right", fontWeight: 600 }}
            >
              Süre: {formatTime(countdown)}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(countdown / 2) * 100} // tık tık olmasın TODO
              sx={{ height: 10, borderRadius: 5, mt: 0.5 }}
            />
          </>
        ) : (
          // Boş div veya görünmez içerik ile yer tutucu
          <Box sx={{ height: 28 }} />
        )}
      </Box>

      {/* Soru Bilgisi */}
      <Typography variant="h5" textAlign="center" fontWeight={700} mt={2}>
        Soru {current} / {total}
      </Typography>
    </Box>
  );
}
