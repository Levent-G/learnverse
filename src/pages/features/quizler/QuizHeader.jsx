import { Box, Typography, LinearProgress } from "@mui/material";

export default function QuizHeader({ countdown, current, total }) {
  const formatTime = (secs) => {
    if (secs === null || secs === undefined) return "";

    // Sadece saniye olarak gösteriyoruz, çünkü toplam süre 5 saniye sabit
    return secs.toString();
  };

  if (countdown === null || countdown === undefined) {
    return (
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" textAlign="center" fontWeight={700} mt={2}>
          Soru {current} / {total}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="body2" sx={{ textAlign: "right", fontWeight: 600 }}>
        Süre: {formatTime(countdown)}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(countdown / 3) * 100} // 5 saniyeden geriye doğru sayıyor
        sx={{ height: 10, borderRadius: 5, mt: 0.5 }}
      />
      <Typography variant="h5" textAlign="center" fontWeight={700} mt={2}>
        Soru {current} / {total}
      </Typography>
    </Box>
  );
}
