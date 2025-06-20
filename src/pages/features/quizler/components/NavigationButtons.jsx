import { Box, Button } from "@mui/material";

export default function NavigationButtons({
  onBack,
  onNext,
  onFinish,
  showBack,
  showNext,
  showFinish,
  nextDisabled,
}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
      <Button
        variant="outlined"
        disabled={!showBack}
        onClick={onBack}
        sx={{ borderRadius: 10, px: 4 }}
      >
        Geri
      </Button>

      {showNext && (
        <Button
          variant="contained"
          onClick={onNext}
          disabled={nextDisabled}
          sx={{ borderRadius: 10, px: 4 }}
        >
          İleri
        </Button>
      )}

      {showFinish && (
        <Button variant="contained" onClick={onFinish} sx={{ borderRadius: 10, px: 4 }}>
          Quiz’i Bitir
        </Button>
      )}
    </Box>
  );
}
