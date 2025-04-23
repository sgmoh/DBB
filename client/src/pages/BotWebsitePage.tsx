import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

interface Command {
  name: string;
  description: string;
}

interface BotData {
  id: number;
  name: string;
  serverLink: string;
  logoUrl: string;
  commands: Command[];
}

export default function BotWebsitePage() {
  const [, setLocation] = useLocation();
  const botName = window.location.pathname.substring(1); // Remove leading slash
  
  // Fetch bot data directly from our API
  const { data: botData, isLoading, isError } = useQuery<BotData>({
    queryKey: [`/api/bots/website/${botName}`],
    retry: false,
    staleTime: 300000, // 5 minutes
  });
  
  // If there's an error, redirect to not found
  useEffect(() => {
    if (isError) {
      setLocation('/not-found');
    }
  }, [isError, setLocation]);
  
  const loading = isLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-16 h-16 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!botData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <h1 className="text-4xl font-bold mb-4">Bot Not Found</h1>
        <p className="text-xl mb-8">The bot you're looking for doesn't exist or has been removed.</p>
        <Button 
          onClick={() => window.location.href = '/'}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Bot Logo and Information */}
          <div className="flex flex-col items-center lg:items-start">
            {botData.logoUrl && (
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-purple-500 glow-purple">
                <img 
                  src={botData.logoUrl} 
                  alt={`${botData.name} logo`} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              {botData.name}
            </h1>
            <p className="text-xl mb-8 text-gray-300">A powerful Discord moderation bot</p>
            <Button 
              onClick={() => window.open(botData.serverLink, '_blank')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8 py-6 text-lg"
            >
              Add to Your Server
            </Button>
          </div>
          
          {/* Commands Card */}
          <Card className="w-full lg:w-1/2 bg-gray-900 border-purple-500 shadow-lg shadow-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl">Bot Commands</CardTitle>
              <CardDescription>Use these commands in your Discord server</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {botData.commands.map((command, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-400">{command.name}</h3>
                    <p className="text-gray-300">{command.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-gray-800 mt-16">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} {botData.name} • Powered by Swoosh Bots
            </p>
            <div className="flex gap-4">
              <a href="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </a>
              <a href={botData.serverLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                Join Server
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}