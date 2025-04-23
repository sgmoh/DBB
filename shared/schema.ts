import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bots = pgTable("bots", {
  id: serial("id").primaryKey(),
  token: text("token").notNull(),
  name: text("name").notNull(),
  serverLink: text("server_link").notNull(),
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const botSchema = createInsertSchema(bots);

export const insertBotSchema = createInsertSchema(bots).omit({
  id: true,
  createdAt: true,
});

export type InsertBot = z.infer<typeof insertBotSchema>;
export type Bot = typeof bots.$inferSelect;
