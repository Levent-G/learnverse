import { Box } from "@mui/material";
import QuizSelectorChoose from "./components/QuizSelectorChoose";
import QuizSelectorRandom from "./components/QuizSelectorRandom";

const QuizPage = ({ onQuizFetched }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 4,
        mt: 6,
      }}
    >
      <Box sx={{ flex: "1 1 360px", maxWidth: 460 }}>
        <QuizSelectorChoose onQuizFetched={onQuizFetched} />
      </Box>

      <Box sx={{ flex: "1 1 360px", maxWidth: 460 }}>
        <QuizSelectorRandom onQuizFetched={onQuizFetched} />
      </Box>
    </Box>
  );
};

export default QuizPage;
