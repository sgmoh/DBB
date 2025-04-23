import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon, CopyIcon, ClipboardCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const SuccessPage = () => {
  const [copied, setCopied] = useState(false);
  
  const { data: botData, isLoading } = useQuery({
    queryKey: ["/api/bots/info"],
    staleTime: Infinity,
  });

  const websiteUrl = botData?.websiteUrl || "https://botforge.io/yourbot";
  
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

  // Sanitize the bot name for the URL
  const sanitizeBotName = (name: string) => {
    return name?.toLowerCase().replace(/\s+/g, '') || 'yourbot';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="loading-dot w-3 h-3 rounded-full bg-[#5865F2]"></div>
          <div className="loading-dot w-3 h-3 rounded-full bg-[#5865F2]"></div>
          <div className="loading-dot w-3 h-3 rounded-full bg-[#5865F2]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center py-12">
          <div className="mb-8 bg-green-500 w-24 h-24 mx-auto rounded-full flex items-center justify-center">
            <CheckIcon className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Success! Your Bot is Ready</h2>
          <p className="text-[#8e9297] mb-8">
            Your Discord bot has been successfully set up and is now online.
          </p>
          
          <div className="bg-[#2F3136] rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium mb-4">Your Bot Website</h3>
            <div className="flex items-center justify-between bg-[#36393F] px-4 py-3 rounded-md border border-gray-700 mb-4">
              <span className="text-[#5865F2]">{websiteUrl}</span>
              <button 
                type="button" 
                className="text-[#8e9297] hover:text-white"
                onClick={copyWebsiteUrl}
              >
                {copied ? (
                  <ClipboardCheckIcon className="w-5 h-5" />
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
                className="flex-1 py-2 text-center bg-[#5865F2] hover:bg-opacity-90 transition rounded-md text-sm font-medium"
              >
                Visit Website
              </a>
              <a 
                href="#" 
                className="flex-1 py-2 text-center bg-[#36393F] hover:bg-[#2F3136] transition rounded-md border border-gray-700 text-sm font-medium"
              >
                Edit Website
              </a>
            </div>
          </div>
          
          <div className="bg-[#2F3136] rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Next Steps</h3>
            <ul className="text-left space-y-4">
              <li className="flex">
                <div className="mr-3 text-[#5865F2]">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="w-6 h-6"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" 
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Share Your Bot</h4>
                  <p className="text-sm text-[#8e9297]">
                    Share your bot's website with your Discord community.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-3 text-[#5865F2]">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="w-6 h-6"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Customize Commands</h4>
                  <p className="text-sm text-[#8e9297]">
                    Add more commands or customize existing ones from your dashboard.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-3 text-[#5865F2]">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="w-6 h-6"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" 
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Monitor Usage</h4>
                  <p className="text-sm text-[#8e9297]">
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
