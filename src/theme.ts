const slate = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
};

const red = {
  50: "#fef2f2",
  100: "#fee2e2",
  200: "#fecaca",
  300: "#fca5a5",
  400: "#f87171",
  500: "#ef4444",
  600: "#dc2626",
  700: "#b91c1c",
  800: "#991b1b",
  900: "#7f1d1d",
};

const blue = {
  50: "#eff6ff",
  100: "#dbeafe",
  200: "#bfdbfe",
  300: "#93c5fd",
  400: "#60a5fa",
  500: "#3b82f6",
  600: "#2563eb",
  700: "#1d4ed8",
  800: "#1e40af",
  900: "#1e3a8a",
};

export const darkTheme = {
  bgColor: slate[800],
  textColor: slate[200],
  textWrapperColor: slate[600],
  buttonColor: slate[700],
  redColor: red[500],
  blueColor: blue[500],
  headerBgColor: slate[700],
  accentGray: slate[900],
  accentBlue: blue[600],
};

export const lightTheme = {
  bgColor: slate[200],
  textColor: slate[800],
  textWrapperColor: slate[300],
  buttonColor: slate[500],
  redColor: red[500],
  blueColor: blue[500],
  headerBgColor: slate[400],
  accentGray: slate[100],
  accentBlue: blue[600],
};
