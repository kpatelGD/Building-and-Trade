import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { ZodError } from "zod";
import { sendInquiryEmail } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/inquiries", async (req, res) => {
    try {
      const data = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(data);

      // Send email notification — fire and forget, don't block the response
      sendInquiryEmail(inquiry).catch((err) =>
        console.error("Failed to send inquiry email:", err)
      );

      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0]?.message || "Invalid input" });
      } else {
        console.error("Error creating inquiry:", error);
        res.status(500).json({ message: "Failed to submit inquiry" });
      }
    }
  });

  app.get("/api/testimonials", async (_req, res) => {
    try {
      const result = await storage.getTestimonials();
      res.json(result);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/projects", async (_req, res) => {
    try {
      const result = await storage.getProjects();
      res.json(result);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  return httpServer;
}
