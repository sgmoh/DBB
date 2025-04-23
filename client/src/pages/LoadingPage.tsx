import { useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const LoadingPage = () => {
  const [, navigate] = useLocation();

  const initializeBotMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/bots/initialize", {});
      return res.json();
    },
    onSuccess: () => {
      setTimeout(() => {
        navigate("/setup");
      }, 3000);
    },
    onError: () => {
      // Navigate back to landing page if initialization fails
      navigate("/");
    },
  });

  useEffect(() => {
    // Start initialization when the component mounts
    initializeBotMutation.mutate();
  }, []);

  return (
    <div className="container mx-auto min-h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="max-w-xl mx-auto">
        <div className="text-center py-16">
          <div className="inline-block mb-8">
            <div className="w-24 h-24 rounded-full bg-black border-4 border-t-purple-500 border-r-purple-500 border-b-pink-500 border-l-pink-500 animate-spin shadow-lg shadow-purple-500/20"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">Initializing Your Bot</h2>
          <p className="text-gray-400 mb-8">Setting up commands like kick, ban, and mute...</p>
          
          <div className="max-w-md mx-auto bg-black rounded-lg p-6 mb-8 border border-purple-900/30 glow-border">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-3 glow-purple"></div>
              <div className="text-green-400 text-sm">Connected to Discord API</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-3 glow-purple"></div>
              <div className="text-green-400 text-sm">Bot permissions validated</div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-3 animate-pulse glow-purple"></div>
              <div className="text-purple-400 text-sm">Setting up command handlers...</div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-600 mr-3"></div>
              <div className="text-gray-500 text-sm">Finalizing configuration</div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex space-x-3">
              <div className="loading-dot w-3 h-3 rounded-full bg-purple-600 glow-purple"></div>
              <div className="loading-dot w-3 h-3 rounded-full bg-fuchsia-500 glow-purple"></div>
              <div className="loading-dot w-3 h-3 rounded-full bg-pink-600 glow-purple"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
