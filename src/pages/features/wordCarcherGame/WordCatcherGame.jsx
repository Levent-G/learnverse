// WordCatcherGame.jsx
import React, { useState, useEffect, useCallback } from "react";
import ScoreBoard from "./components/ScoreBoard";
import GameArea from "./components/GameArea";
import StartScreen from "./components/StartScreen";
import GameOverScreen from "./components/GameOverScreen";
import { Box } from "@mui/material";
import { shuffledArray } from "../../../utils/shuffledArray";
import { useApiRequest } from "../../../hooks/useApiRequest";

export default function WordCatcherGame() {
  const [words, setWords] = useState([]);
  const [fallingWord, setFallingWord] = useState(null);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [position, setPosition] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [bearExpression, setBearExpression] = useState("neutral");
  const [gameState, setGameState] = useState("start");

  const { request } = useApiRequest();

  useEffect(() => {
    async function fetchWords() {
      const result = await request({ url: "/words" });
      if (result.success) {
        const shuffled = shuffledArray(result.data);
        setWords(shuffled);
      } else {
        setWords([]);
      }
    }
    fetchWords();
  }, [request]);

  const pickRandomWord = useCallback(() => {
    if (words.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }, [words]);

  const newWord = useCallback(() => {
    if (words.length === 0) return;

    const word = pickRandomWord();
    if (!word) return;

    const otherMeanings = words
      .filter((w) => w.id !== word.id)
      .map((w) => w.meaning);

    const shuffledOthers = shuffledArray(otherMeanings);
    const incorrectOptions = shuffledOthers.slice(0, 5);

    const allOptions = shuffledArray([...incorrectOptions, word.meaning]);

    const optionObjects = allOptions.map((meaning, index) => ({
      id: index,
      meaning,
    }));

    setFallingWord(word);
    setCurrentOptions(optionObjects);
    setPosition(0);
  }, [words, pickRandomWord]);

  useEffect(() => {
    if (gameState !== "playing") return;
    if (words.length === 0) return;

    newWord();

    const interval = setInterval(() => {
      setPosition((pos) => {
        if (pos >= 90) {
          setLives((l) => l - 1);
          setCorrectStreak(0);
          setBearExpression("sad");
          newWord();
          return 0;
        }
        return pos + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState, words, newWord]);

  const handleSelectAnswer = (selectedMeaning) => {
    if (!fallingWord) return;

    if (selectedMeaning === fallingWord.meaning) {
      setScore((s) => s + 10);
      setCorrectStreak((streak) => streak + 1);
      setBearExpression("happy");

      if (correctStreak + 1 === 3) {
        setBearExpression("surprised");
        setTimeout(() => setBearExpression("neutral"), 2500);
      } else {
        setTimeout(() => setBearExpression("neutral"), 1500);
      }
    } else {
      setLives((l) => l - 1);
      setCorrectStreak(0);
      setBearExpression("sad");
      setTimeout(() => setBearExpression("neutral"), 1500);
    }

    newWord();
    setPosition(0);
  };

  const handleStart = () => {
    setScore(0);
    setLives(3);
    setCorrectStreak(0);
    setBearExpression("neutral");
    setGameState("playing");
  };

  const handleRestart = () => {
    setScore(0);
    setLives(3);
    setCorrectStreak(0);
    setBearExpression("neutral");
    setGameState("playing");
  };

  if (gameState === "start") {
    return <StartScreen onStart={handleStart} />;
  }

  if (gameState === "over" || lives <= 0) {
    return <GameOverScreen score={score} onRestart={handleRestart} />;
  }

  return (
    <Box
      sx={{
        px: { xs: 2, md: 8 },
        py: { xs: 3, md: 5 },
        bgcolor: "neutralLight",
        minHeight: "100vh",
      }}
    >
      <ScoreBoard score={score} lives={lives} />
      <GameArea
        fallingWord={fallingWord}
        position={position}
        wordPairs={currentOptions}
        onSelectAnswer={handleSelectAnswer}
        bearExpression={bearExpression}
      />
    </Box>
  );
}
