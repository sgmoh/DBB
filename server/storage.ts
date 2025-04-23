import { bots, type Bot, type InsertBot } from "@shared/schema";

export interface IStorage {
  getBot(id: number): Promise<Bot | undefined>;
  getBotByToken(token: string): Promise<Bot | undefined>;
  createBot(bot: InsertBot): Promise<Bot>;
}

export class MemStorage implements IStorage {
  private bots: Map<number, Bot>;
  currentId: number;

  constructor() {
    this.bots = new Map();
    this.currentId = 1;
  }

  async getBot(id: number): Promise<Bot | undefined> {
    return this.bots.get(id);
  }

  async getBotByToken(token: string): Promise<Bot | undefined> {
    return Array.from(this.bots.values()).find(
      (bot) => bot.token === token,
    );
  }

  async createBot(insertBot: InsertBot): Promise<Bot> {
    const id = this.currentId++;
    const createdAt = new Date().toISOString();
    const bot: Bot = { ...insertBot, id, createdAt };
    this.bots.set(id, bot);
    return bot;
  }
}

export const storage = new MemStorage();
