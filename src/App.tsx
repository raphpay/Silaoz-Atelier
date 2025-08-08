import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ImageUploadPage from "./pages/ImageUploadPage";
import QRCodeGeneratorPage from "./pages/QRCodeGeneratorPage";

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<QRCodeGeneratorPage />} />
      <Route path="/upload/:sessionId" element={<ImageUploadPage />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
