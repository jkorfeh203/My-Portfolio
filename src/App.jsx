import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Portfolio from "./Portfolio";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import Cursor from "./components/Cursor";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Cursor />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
