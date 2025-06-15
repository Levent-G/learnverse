import React, { createContext, useContext, useState } from "react";

const darkThemePalette = {
  feature1: {
    bgColor: "#1e3a8a", // Kendi Kartlarını Oluştur - bgDarkColor
    textColor: "#bfdbfe",
  },
  feature2: {
    bgColor: "#065f46", // Sesli Tekrar & Dinleme
    textColor: "#d1fae5",
  },
  feature3: {
    bgColor: "#78350f", // AI Destekli Quiz
    textColor: "#fef3c7",
  },
  feature4: {
    bgColor: "#5b21b6", // Kategoriye Göre İçerik
    textColor: "#ede9fe",
  },
  feature5: {
    bgColor: "#831843", // Tema Seçimi
    textColor: "#fce7f3",
  },
  feature6: {
    bgColor: "#134e4a", // Mobil Uyumlu Arayüz
    textColor: "#ccfbf1",
  },
};

const ColorContext = createContext();

export function ColorProvider({ children }) {
  const [colors] = useState(darkThemePalette);

  return (
    <ColorContext.Provider value={{ colors }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColors() {
  return useContext(ColorContext);
}
