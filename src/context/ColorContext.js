import React, { createContext, useContext, useState } from "react";
import { colorsPalet } from "../shared/enums";

const ColorContext = createContext();

export function ColorProvider({ children }) {
  const [colors] = useState(colorsPalet);

  return (
    <ColorContext.Provider value={{ colors }}>{children}</ColorContext.Provider>
  );
}

export function useColors() {
  return useContext(ColorContext);
}
