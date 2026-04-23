import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Portfolio from "./Portfolio";
import Cursor from "./components/Cursor";

const Resources = lazy(() => import("./pages/Resources"));
const NotFound  = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Cursor />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
