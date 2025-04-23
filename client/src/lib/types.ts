// Bot types
export interface Bot {
  id: number;
  token: string;
  name: string;
  serverLink: string;
  logoUrl: string | null;
  websiteUrl: string;
  createdAt: string;
}

export interface BotInfo {
  name: string;
  serverLink: string;
  logoUrl: string | null;
  websiteUrl: string;
}
