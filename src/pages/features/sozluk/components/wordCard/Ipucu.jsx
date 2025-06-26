import { Box } from "@mui/material";
import { colors } from "./shared/wordCardEnums";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const Ipucu = ({ updatedWord }) => {
  return (
    <>
      {updatedWord.hint && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: colors.accent,
            fontStyle: "italic",
            fontSize: "0.9rem",
            mb: 2,
          }}
        >
          <LightbulbIcon fontSize="small" />
          {updatedWord.hint}
        </Box>
      )}
    </>
  );
};

export default Ipucu;
