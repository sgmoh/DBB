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
    <div className="container mx-auto">
      <div className="max-w-xl mx-auto">
        <div className="text-center py-16">
          <div className="inline-block mb-8">
            <div className="w-24 h-24 rounded-full bg-[#36393F] border-4 border-t-[#5865F2] border-r-[#5865F2] border-b-[#8e9297] border-l-[#8e9297] animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Initializing Your Bot</h2>
          <p className="text-[#8e9297] mb-8">Setting up commands like kick, ban, and mute...</p>
          
          <div className="max-w-md mx-auto bg-[#2F3136] rounded-lg p-4 mb-8">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <div className="text-green-400 text-sm">Connected to Discord API</div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <div className="text-green-400 text-sm">Bot permissions validated</div>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2 animate-pulse"></div>
              <div className="text-yellow-400 text-sm">Setting up command handlers...</div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#8e9297] mr-2"></div>
              <div className="text-[#8e9297] text-sm">Finalizing configuration</div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex space-x-2">
              <div className="loading-dot w-3 h-3 rounded-full bg-[#5865F2]"></div>
              <div className="loading-dot w-3 h-3 rounded-full bg-[#5865F2]"></div>
              <div className="loading-dot w-3 h-3 rounded-full bg-[#5865F2]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
