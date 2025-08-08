import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CustomisationPage from "./pages/CustomisationPage";
import ImageUploadPage from "./pages/ImageUploadPage";
import QRCodeGeneratorPage from "./pages/QRCodeGeneratorPage";

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<QRCodeGeneratorPage />} />
      <Route path="/upload/:sessionId" element={<ImageUploadPage />} />
      <Route path="/customisation" element={<CustomisationPage />} />
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
