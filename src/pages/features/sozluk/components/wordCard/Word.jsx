import { Avatar, Box, Typography } from "@mui/material";
import { colors, hexToRgba } from "./shared/wordCardEnums";

const Word = ({ updatedWord }) => {
  return (
    <>
      <Avatar
        sx={{
          bgcolor: colors.accent,
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20,
          width: 48,
          height: 48,
          boxShadow: `0 4px 8px ${hexToRgba(colors.primaryDark, 0.25)}`,
          userSelect: "none",
        }}
      >
        {updatedWord.word[0]?.toUpperCase()}
      </Avatar>

      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            color: colors.primaryDark,
            fontWeight: 700,
            textTransform: "capitalize",
            fontSize: "1.25rem",
          }}
        >
          {updatedWord.word}
        </Typography>
        {updatedWord.type && (
          <Typography
            variant="subtitle2"
            sx={{
              color: hexToRgba(colors.neutralDark, 0.65),
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            {updatedWord.type}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Word;
