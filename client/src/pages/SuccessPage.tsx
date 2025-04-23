import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon, CopyIcon, ClipboardCheckIcon, ShareIcon, SettingsIcon, BarChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const SuccessPage = () => {
  const [copied, setCopied] = useState(false);
  
  const { data: botData, isLoading } = useQuery({
    queryKey: ["/api/bots/info"],
    staleTime: Infinity,
  });

  const websiteUrl = botData?.websiteUrl || "https://discord-bot-creator.io/yourbot";
  
  const copyWebsiteUrl = () => {
    navigator.clipboard.writeText(websiteUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
      });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-140px)] flex items-center justify-center">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex space-x-3">
            <div className="loading-dot w-3 h-3 rounded-full bg-purple-600 glow-purple"></div>
            <div className="loading-dot w-3 h-3 rounded-full bg-fuchsia-500 glow-purple"></div>
            <div className="loading-dot w-3 h-3 rounded-full bg-pink-600 glow-purple"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="max-w-xl mx-auto">
        <div className="text-center py-12">
          <div className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 glow-border">
            <CheckIcon className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text glow-text">Success! Your Bot is Ready</h2>
          <p className="text-gray-400 mb-8">
            Your Discord bot has been successfully set up and is now online.
          </p>
          
          <div className="bg-black rounded-lg p-6 mb-8 border border-purple-900/30 glow-border">
            <h3 className="text-xl font-medium mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">Your Bot Website</h3>
            <div className="flex items-center justify-between bg-black px-4 py-3 rounded-md border border-purple-900/50 mb-4">
              <span className="text-purple-400">{websiteUrl}</span>
              <button 
                type="button" 
                className="text-gray-400 hover:text-white transition"
                onClick={copyWebsiteUrl}
              >
                {copied ? (
                  <ClipboardCheckIcon className="w-5 h-5 text-green-400" />
                ) : (
                  <CopyIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {copied && (
              <div className="mb-4 text-sm text-green-400 flex items-center">
                <CheckIcon className="w-4 h-4 inline-block mr-1" />
                Website URL copied to clipboard!
              </div>
            )}
            
            <div className="flex space-x-4">
              <a 
                href={websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 py-2 text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition rounded-md text-sm font-medium shadow-lg shadow-purple-500/20"
              >
                Visit Website
              </a>
              <a 
                href="#" 
                className="flex-1 py-2 text-center bg-black hover:bg-purple-900/20 transition rounded-md border border-purple-900/50 text-sm font-medium"
              >
                Edit Website
              </a>
            </div>
          </div>
          
          <div className="bg-black rounded-lg p-6 border border-purple-900/30 glow-border">
            <h3 className="text-xl font-medium mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">Next Steps</h3>
            <ul className="text-left space-y-4">
              <li className="flex p-3 hover:bg-purple-900/10 rounded-lg transition">
                <div className="mr-3 text-purple-400">
                  <ShareIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Share Your Bot</h4>
                  <p className="text-sm text-gray-400">
                    Share your bot's website with your Discord community.
                  </p>
                </div>
              </li>
              <li className="flex p-3 hover:bg-purple-900/10 rounded-lg transition">
                <div className="mr-3 text-purple-400">
                  <SettingsIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Customize Commands</h4>
                  <p className="text-sm text-gray-400">
                    Add more commands or customize existing ones from your dashboard.
                  </p>
                </div>
              </li>
              <li className="flex p-3 hover:bg-purple-900/10 rounded-lg transition">
                <div className="mr-3 text-purple-400">
                  <BarChartIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Monitor Usage</h4>
                  <p className="text-sm text-gray-400">
                    Track your bot's activity and usage statistics in real-time.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
