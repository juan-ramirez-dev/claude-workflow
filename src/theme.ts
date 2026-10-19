import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const inter = loadInter("normal", {
  weights: ["400", "600", "800"],
  subsets: ["latin"],
});
const mono = loadMono("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const colors = {
  bg: "#0A0A0F",
  surface: "#14141C",
  surfaceHigh: "#1C1C27",
  border: "#2A2A3A",
  text: "#F5F5F7",
  muted: "#8A8A9E",
  accent: "#FFB224",
  success: "#5EF2A4",
  danger: "#FF5C5C",
  glow: "rgba(255, 178, 36, 0.16)",
} as const;

export const fonts = {
  sans: inter.fontFamily,
  mono: mono.fontFamily,
} as const;

export const video = {
  width: 1080,
  height: 1350,
  fps: 30,
  // Cross-fade length; scenes are padded by this so speech never overlaps.
  transitionFrames: 14,
  tailSeconds: 0.45,
} as const;
