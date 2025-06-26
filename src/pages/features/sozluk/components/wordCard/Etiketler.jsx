import { Box, Chip } from "@mui/material";
import { colors, hexToRgba } from "./shared/wordCardEnums";

const Etiketler = ({ updatedWord }) => {
  return (
    <>
      <Box display="flex" gap={1} flexWrap="wrap" mb={2} mt={2}>
        {updatedWord.tags?.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              bgcolor: hexToRgba(colors.primaryLight, 0.8),
              color: hexToRgba(colors.primaryDark, 0.95),
              fontWeight: 500,
              textTransform: "capitalize",
              userSelect: "none",
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default Etiketler;
