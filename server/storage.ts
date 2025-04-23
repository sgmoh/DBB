import { bots, type Bot, type InsertBot } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getBot(id: number): Promise<Bot | undefined>;
  getBotByToken(token: string): Promise<Bot | undefined>;
  createBot(bot: InsertBot): Promise<Bot>;
}

export class DatabaseStorage implements IStorage {
  constructor() {}

  async getBot(id: number): Promise<Bot | undefined> {
    const result = await db.select().from(bots).where(eq(bots.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getBotByToken(token: string): Promise<Bot | undefined> {
    const result = await db.select().from(bots).where(eq(bots.token, token));
    return result.length > 0 ? result[0] : undefined;
  }

  async createBot(insertBot: InsertBot): Promise<Bot> {
    const result = await db.insert(bots).values(insertBot).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
