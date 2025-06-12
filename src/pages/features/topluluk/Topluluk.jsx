import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import ActiveUsers from "./ActiveUsers";
import DailyTasks from "./DailyTasks";
import ChatBox from "./ChatBox";
import Forum from "./Forum";

// Mock kullanıcılar
const users = [
  { id: 1, name: "Ayşe Yılmaz", bio: "İngilizce tutkunu", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Mehmet Demir", bio: "Konuşma pratiği yapmayı sever", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Elif Kaya", bio: "Yapay zeka ile öğreniyor", avatar: "https://i.pravatar.cc/150?img=3" },
];

// Günlük görevler örneği
const dailyTasksInitial = [
  { id: 1, task: "Günlük 10 kelime öğren", done: false },
  { id: 2, task: "Bir kalıp cümle yaz", done: false },
  { id: 3, task: "Quiz bölümünden 5 soru çöz", done: false },
];

// Forum soru örnekleri
const initialQuestions = [
  {
    id: 1,
    user: "Ayşe Yılmaz",
    question: "İngilizce’de present perfect nasıl kullanılır?",
    answers: [
      { user: "Mehmet Demir", text: "Geçmişte başlamış ve etkisi devam eden eylemler için kullanılır." },
    ],
  },
  {
    id: 2,
    user: "Elif Kaya",
    question: "En iyi kelime öğrenme teknikleri nelerdir?",
    answers: [],
  },
];

// Popüler etiketler
const popularTags = ["#konuşma", "#kelimeler", "#gramer", "#yapayzeka", "#pratik"];

export default function Topluluk() {
  const [tasks, setTasks] = useState(dailyTasksInitial);
  const [chatMessages, setChatMessages] = useState([
    { user: "Mehmet Demir", text: "Herkese merhaba! İngilizce pratiği yapmak isteyen var mı?" },
  ]);
  const [newChatMsg, setNewChatMsg] = useState("");
  const [questions, setQuestions] = useState(initialQuestions);
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  // Görev tamamlandı toggle
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  // Chat mesajı ekle
  const addChatMessage = () => {
    if (!newChatMsg.trim()) return;
    setChatMessages((prev) => [...prev, { user: "Sen", text: newChatMsg.trim() }]);
    setNewChatMsg("");
  };

  // Yeni soru ekle
  const addQuestion = () => {
    if (!newQuestion.trim()) return;
    setQuestions((prev) => [
      ...prev,
      { id: Date.now(), user: "Sen", question: newQuestion.trim(), answers: [] },
    ]);
    setNewQuestion("");
  };

  // Tag filtreleme
  const filteredQuestions = selectedTag
    ? questions.filter((q) => q.question.toLowerCase().includes(selectedTag.replace("#", "").toLowerCase()))
    : questions;

  return (
    <Box sx={{  mx: "auto", p: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, color: "#6a1b9a", fontWeight: "bold", textAlign: "center" }}
      >
        İngilizce Öğrenme Topluluğu
      </Typography>

      <ActiveUsers users={users} />
      <DailyTasks tasks={tasks} toggleTask={toggleTask} />
      <ChatBox
        chatMessages={chatMessages}
        newChatMsg={newChatMsg}
        setNewChatMsg={setNewChatMsg}
        addChatMessage={addChatMessage}
      />
      <Forum
        questions={questions}
        filteredQuestions={filteredQuestions}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        popularTags={popularTags}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
        addQuestion={addQuestion}
      />
    </Box>
  );
}
