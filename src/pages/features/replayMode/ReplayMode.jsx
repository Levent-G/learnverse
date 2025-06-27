import React, { useState } from "react";
import { Box, Container, Paper } from "@mui/material";
import ScenarioSelector from "./components/ScenarioSelector";
import ChatArea from "./components/ChatArea";
import EvaluationPanel from "./components/EvaluationPanel";

export default function RoleplayMode() {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [evaluation, setEvaluation] = useState(null);

  // Senaryo seçildiğinde chat resetlenir
  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
    setChatMessages([
      {
        id: 1,
        sender: "bot",
        text: `Senaryo: ${scenario.label}. Başlayalım! Merhaba, nasıl yardımcı olabilirim?`,
      },
    ]);
    setEvaluation(null);
  };

  // Kullanıcı mesajını ve bot cevabını ekle
  const handleSendMessage = (message) => {
    const userMessage = { id: Date.now(), sender: "user", text: message };
    setChatMessages((prev) => [...prev, userMessage]);

    // Basit bot cevabı simülasyonu (gerçek bot API ile değiştirilebilir)
    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        sender: "bot",
        text: generateBotReply(message, selectedScenario),
      };
      setChatMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  // Basit bot cevabı örneği
  const generateBotReply = (userText, scenario) => {
    if (!scenario) return "Senaryo seçmediniz.";
    if (userText.toLowerCase().includes("merhaba")) return "Merhaba! Size nasıl yardımcı olabilirim?";
    if (userText.toLowerCase().includes("teşekkür")) return "Rica ederim! Başka bir şey var mı?";
    return "Anladım, devam edelim.";
  };

  // Değerlendirme ayarla
  const handleEvaluation = (score, feedback) => {
    setEvaluation({ score, feedback });
  };

  // Senaryoyu sıfırla
  const resetSession = () => {
    setSelectedScenario(null);
    setChatMessages([]);
    setEvaluation(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "#F5F7FA" }}>
        {!selectedScenario && <ScenarioSelector onSelect={handleScenarioSelect} />}

        {selectedScenario && (
          <>
            <ChatArea messages={chatMessages} onSend={handleSendMessage} />
            <EvaluationPanel onEvaluate={handleEvaluation} evaluation={evaluation} />
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <button onClick={resetSession} style={{ cursor: "pointer", border: "none", background: "none", color: "#0EA5E9", fontWeight: "bold" }}>
                Senaryoyu Değiştir
              </button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}
