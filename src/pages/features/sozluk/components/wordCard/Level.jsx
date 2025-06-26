import { Box } from "@mui/material";
import { colors } from "./shared/wordCardEnums";

const Level = ({ updatedWord }) => {
  return (
    <>
      {updatedWord.level && (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.6,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${colors.accent}11, ${colors.accent}22)`,
            color: colors.primaryDark,
            fontWeight: "bold",
            fontSize: "0.8rem",
            mb: 1,
            width: "fit-content",
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: colors.accent,
            }}
          />
          Seviye: {updatedWord.level}
        </Box>
      )}
    </>
  );
};

export default Level;
