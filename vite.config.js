import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";

function getDataLastUpdated() {
  try {
    const raw = execSync(
      'git log -1 --format="%ci" -- src/data/scholarships.json src/data/trends.json'
    ).toString().trim();
    if (!raw) return "2026";
    return new Date(raw).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  } catch {
    return "2026";
  }
}

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
  },
  define: {
    __DATA_LAST_UPDATED__: JSON.stringify(getDataLastUpdated()),
  },
});
