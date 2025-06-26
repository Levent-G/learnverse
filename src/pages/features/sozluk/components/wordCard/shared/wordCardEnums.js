export const colors = {
  primaryDark: "#1E1E2F",
  primaryLight: "#F1F5F9",
  accent: "#3B82F6",
  neutralDark: "#64748B",
  neutralLight: "#F8FAFC",
  error: "#EF4444",
  info: "#0EA5E9",
};

export const hexToRgba = (hex, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };