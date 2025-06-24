import React from "react";
import { Box } from "@mui/material";
import KullaniciBilgisi from "./components/KullaniciBilgisi";
import GunlukGorevler from "./components/GunlukGorevler";
import Modüller from "./components/Modüller";
import VideoluDersler from "./components/VideoluDersler";
import KullanicinIlerlemesi from "./components/KullanicinIlerlemesi";
import AlinanDerslerHocalar from "./components/AlinanDerslerHocalar";
import LearningCountdown from "./components/LearningCountdown";
import QuizStats from "../features/quizler/components/QuizStats";

export default function Dashboard() {
  return (
    <Box sx={{ maxWidth: 1280, mx: "auto", px: 3, py: 6 }}>
      {/* Kullanıcı Bilgisi */}
      <KullaniciBilgisi />

      {/* Günlük Görevler */}
      <GunlukGorevler />

      {/* öğrenmenize ne akdar kaldı */}
      <LearningCountdown />

      {/* Kullanıcının İlerlemesi */}
      <KullanicinIlerlemesi />

      {/* quizler */}
      <QuizStats />

      {/* Modüller - Her modülü ayrı açarak göster */}
      <Modüller />

      {/* Videolu Dersler */}
      <VideoluDersler />

      {/*  Aldığınız Dersler & Hocalar */}
      <AlinanDerslerHocalar />
    </Box>
  );
}
