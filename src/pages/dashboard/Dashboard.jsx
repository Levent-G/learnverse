import React from "react";
import { Box } from "@mui/material";
import KullaniciBilgisi from "./components/KullaniciBilgisi";
import GunlukGorevler from "./components/GunlukGorevler";
import DilSeviyesi from "./components/DilSeviyesi";
import Modüller from "./components/Modüller";
import VideoluDersler from "./components/VideoluDersler";
import KullanicinIlerlemesi from "./components/KullanicinIlerlemesi";
import AlinanDerslerHocalar from "./components/AlinanDerslerHocalar";
import LearningCountdown from "./components/LearningCountdown";

export default function Dashboard() {
  return (
    <Box sx={{ maxWidth: 1280, mx: "auto", px: 3, py: 6 }}>
      {/* Kullanıcı Bilgisi */}
      <KullaniciBilgisi />

      {/* öğrenmenize ne akdar kaldı */}
      <LearningCountdown />

      {/* Günlük Görevler */}
      <GunlukGorevler />

      {/* Modüller - Her modülü ayrı açarak göster */}
      <Modüller />

      {/* Dil Seviyesi */}
      <DilSeviyesi />

      {/* Videolu Dersler */}
      <VideoluDersler />

      {/* Kullanıcının İlerlemesi */}
      <KullanicinIlerlemesi />

      {/*  Aldığınız Dersler & Hocalar */}
      <AlinanDerslerHocalar />
    </Box>
  );
}
