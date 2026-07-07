import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { MODULES } from "./src/data.js";
import { LAB_EXPERIMENTS } from "./src/labData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROGRESS_FILE = path.join(__dirname, "progress.json");

function loadProgress() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
    }
  } catch (e) {
    console.warn("Could not read progress.json, starting fresh.");
  }
  return { completedModules: [], quizScores: {}, completionHistory: [], userNotes: {}, profile: {} };
}

function saveProgress(data: object) {
  try {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save progress to file:", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Allow Vite dev-server (port 5173) and direct browser access
  app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));
  app.use(express.json());

  // ── API Routes ──────────────────────────────────────────────────────────────

  app.get("/api/modules", (_req, res) => {
    res.json(MODULES);
  });

  app.get("/api/labs", (_req, res) => {
    res.json(LAB_EXPERIMENTS);
  });

  // User progress: loaded from / persisted to progress.json (free, no DB)
  let userProgress = loadProgress();

  app.get("/api/user/progress", (_req, res) => {
    res.json(userProgress);
  });

  app.post("/api/user/progress", (req, res) => {
    userProgress = { ...userProgress, ...req.body };
    saveProgress(userProgress);
    res.json({ status: "success", data: userProgress });
  });

  // ── Serve Frontend ──────────────────────────────────────────────────────────

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n🧪 ChemSoul server running → http://localhost:${PORT}`);
    console.log(`📁 Progress stored in: ${PROGRESS_FILE}\n`);
  });
}

startServer();
