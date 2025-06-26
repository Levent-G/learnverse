import { Box, Typography } from "@mui/material";
import { colors, hexToRgba } from "./shared/wordCardEnums";

export default function Meaning({ updatedWord }) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F9FAFB",
          borderLeft: `4px solid ${colors.accent}`,
          borderRadius: 2,
          px: 2,
          py: 1.5,
          mb: 2,
          boxShadow: `0 1px 4px ${hexToRgba(colors.primaryDark, 0.06)}`,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            display: "flex",
            alignItems: "center",
            color: colors.accent,
            fontWeight: 700,
            mb: 0.5,
            fontSize: "0.85rem",
            letterSpacing: 0.4,
          }}
        >
          📖 Anlamı
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: colors.primaryDark,
            fontWeight: 500,
            lineHeight: 1.7,
            fontSize: "1rem",
          }}
        >
          {updatedWord.meaning}
        </Typography>
      </Box>
    </>
  );
}
