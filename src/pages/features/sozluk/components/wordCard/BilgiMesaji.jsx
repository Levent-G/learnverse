import { Box } from "@mui/material";
import { colors } from "./shared/wordCardEnums";
import InfoIcon from "@mui/icons-material/Info";

const BilgiMesaji = ({ updatedWord }) => {
  return (
    <>
      {updatedWord.info && (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          color={colors.info}
          fontSize="0.85rem"
          mb={2}
          mt={1}
        >
          <InfoIcon fontSize="small" />
          {updatedWord.info}
        </Box>
      )}
    </>
  );
};

export default BilgiMesaji;
