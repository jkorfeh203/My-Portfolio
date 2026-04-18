import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Portfolio from "./Portfolio";
import Resources from "./pages/Resources";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
