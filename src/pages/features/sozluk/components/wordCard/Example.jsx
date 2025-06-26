import { Box, Button, Collapse } from "@mui/material";
import { useState } from "react";
import { colors, hexToRgba } from "./shared/wordCardEnums";

const Example = ({ updatedWord }) => {
  const [showExample, setShowExample] = useState(false);

  return (
    <>
      {updatedWord.example && (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setShowExample((prev) => !prev);
            }}
            sx={{
              color: colors.accent,
              borderColor: colors.accent,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "0.85rem",
              px: 2,
              py: 0.5,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${hexToRgba(
                colors.accent,
                0.04
              )}, ${hexToRgba(colors.accent, 0.08)})`,
              boxShadow: `0 2px 6px ${hexToRgba(colors.accent, 0.15)}`,
              transition: "all 0.25s ease-in-out",
              alignSelf: "flex-start",
              "&:hover": {
                backgroundColor: hexToRgba(colors.accent, 0.1),
                borderColor: colors.accent,
                transform: "scale(1.03)",
                boxShadow: `0 4px 10px ${hexToRgba(colors.accent, 0.25)}`,
              },
            }}
          >
            {showExample ? "Örneği Gizle" : "Örneği Göster"}
          </Button>

          <Collapse in={showExample} timeout="auto" unmountOnExit>
            <Box
              sx={{
                color: hexToRgba(colors.neutralDark, 0.9),
                borderLeft: `3px solid ${colors.accent}`,
                pl: 2,
                fontStyle: "italic",
                mb: 1,
                mt: 2,
              }}
            >
              "{updatedWord.example}"
            </Box>
          </Collapse>
        </>
      )}
    </>
  );
};

export default Example;
