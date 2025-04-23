import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { botSchema, insertBotSchema } from "@shared/schema";

// Set up multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024, // 1MB
  },
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session storage for token
  let currentToken: string | null = null;

  // Verify bot token
  app.post("/api/bots/verify-token", async (req, res) => {
    try {
      const schema = z.object({
        token: z.string().min(1, { message: "Token is required" }),
      });

      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid token format" });
      }

      const { token } = result.data;
      
      // In a real implementation, we would validate the token with Discord API
      // For now, we just store the token for later use
      currentToken = token;

      return res.status(200).json({ message: "Token verified successfully" });
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Initialize bot
  app.post("/api/bots/initialize", async (req, res) => {
    try {
      if (!currentToken) {
        return res.status(401).json({ message: "No token provided" });
      }

      // In a real implementation, we would initialize the bot with Discord API
      // For now, we just return success
      return res.status(200).json({ message: "Bot initialized successfully" });
    } catch (error) {
      console.error("Error initializing bot:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Generate bot website
  app.post("/api/bots/generate", upload.single("logo"), async (req, res) => {
    try {
      if (!currentToken) {
        return res.status(401).json({ message: "No token provided" });
      }

      const schema = z.object({
        name: z.string().min(1, { message: "Bot name is required" }),
        serverLink: z.string().url({ message: "Valid server link is required" }),
      });

      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input data" });
      }

      let logoUrl = null;

      // Process file upload if available
      if (req.file) {
        const filename = `bot_${Date.now()}_${req.file.originalname}`;
        const filePath = path.join(uploadsDir, filename);
        
        // Save the file
        fs.writeFileSync(filePath, req.file.buffer);
        
        // In a real app, we might upload to a CDN or cloud storage
        logoUrl = `/uploads/${filename}`;
      }

      // Generate website URL from bot name
      const websiteUrl = `https://dbb-e3j1.onrender.com/${result.data.name.toLowerCase().replace(/\s+/g, '')}`;

      // Create bot in storage
      const bot = await storage.createBot({
        token: currentToken,
        name: result.data.name,
        serverLink: result.data.serverLink,
        logoUrl,
        websiteUrl,
      });

      return res.status(200).json({
        id: bot.id,
        name: bot.name,
        websiteUrl: bot.websiteUrl,
      });
    } catch (error) {
      console.error("Error generating bot:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get bot info
  app.get("/api/bots/info", async (req, res) => {
    try {
      if (!currentToken) {
        return res.status(401).json({ message: "No token provided" });
      }

      const bot = await storage.getBotByToken(currentToken);
      if (!bot) {
        return res.status(404).json({ message: "Bot not found" });
      }

      return res.status(200).json({
        name: bot.name,
        serverLink: bot.serverLink,
        logoUrl: bot.logoUrl,
        websiteUrl: bot.websiteUrl,
      });
    } catch (error) {
      console.error("Error getting bot info:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
