import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import RealtimeMonitoring from "@/pages/RealtimeMonitoring";
import NegativeRecognition from "@/pages/NegativeRecognition";
import PrSpeechGenerator from "@/pages/PrSpeechGenerator";
import CrisisResponse from "@/pages/CrisisResponse";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/realtime-monitoring" element={<RealtimeMonitoring />} />
      <Route path="/negative-recognition" element={<NegativeRecognition />} />
      <Route path="/pr-speech-generator" element={<PrSpeechGenerator />} />
      <Route path="/crisis-response" element={<CrisisResponse />} />
    </Routes>
  );
}
