import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, AlertTriangleIcon } from "lucide-react";

const LandingPage = () => {
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const verifyTokenMutation = useMutation({
    mutationFn: async (token: string) => {
      const res = await apiRequest("POST", "/api/bots/verify-token", { token });
      return res.json();
    },
    onSuccess: () => {
      navigate("/loading");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Invalid Token",
        description: "Please check your Discord bot token and try again.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      toast({
        variant: "destructive",
        title: "Token Required",
        description: "Please enter your Discord bot token to continue.",
      });
      return;
    }
    verifyTokenMutation.mutate(token);
  };

  const toggleTokenVisibility = () => {
    setShowToken(!showToken);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Build a Custom Discord Bot
          </h1>
          <p className="text-[#8e9297] text-lg mb-6">
            Create your own Discord bot with a matching website in minutes. No coding required.
          </p>
          
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-lg">
              <div className="bg-[#36393F] px-4 py-2 rounded-md">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-[#8e9297]">
                  <span>bot.js</span>
                  <span>Discord Bot</span>
                </div>
                <div className="text-left text-sm text-green-400 mt-2 p-2 bg-[#2a2c30] rounded">
                  <div className="font-mono">
                    <p className="mb-0">
                      <span className="text-blue-400">bot</span>.<span className="text-purple-400">on</span>(<span className="text-yellow-400">&apos;ready&apos;</span>, () =&gt; {`{`}
                    </p>
                    <p className="mb-0 pl-4">
                      <span className="text-blue-400">console</span>.<span className="text-purple-400">log</span>(<span className="text-yellow-400">&apos;Bot is online!&apos;</span>);
                    </p>
                    <p className="mb-2">{`});`}</p>
                    <p className="mb-0">
                      <span className="text-blue-400">bot</span>.<span className="text-purple-400">command</span>(<span className="text-yellow-400">&apos;kick&apos;</span>, <span className="text-purple-400">async</span> (msg, args) =&gt; {`{`}
                    </p>
                    <p className="mb-0 pl-4">
                      <span className="text-green-400">// Your custom bot logic</span>
                    </p>
                    <p>{`});`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2F3136] rounded-lg shadow-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Let&apos;s Get Started</h2>
          <p className="text-[#8e9297] mb-6">
            Enter your Discord bot token to begin setting up your custom bot.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label 
                htmlFor="token" 
                className="block text-sm font-medium text-[#8e9297] mb-2"
              >
                Discord Bot Token
              </Label>
              <div className="relative">
                <Input 
                  type={showToken ? "text" : "password"} 
                  id="token" 
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full px-4 py-3 bg-[#36393F] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5865F2] text-white"
                  placeholder="Enter your Discord bot token" 
                  required
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8e9297] hover:text-white"
                  onClick={toggleTokenVisibility}
                >
                  {showToken ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-xs text-[#8e9297] flex items-center">
                <AlertTriangleIcon className="w-4 h-4 inline mr-1" />
                Never share your token with others. We use it only to set up your bot.
              </p>
            </div>
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="px-6 py-5 bg-[#5865F2] hover:bg-opacity-90 transition rounded-md font-medium h-10"
                disabled={verifyTokenMutation.isPending}
              >
                {verifyTokenMutation.isPending ? "Verifying..." : "Continue"}
                {!verifyTokenMutation.isPending && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="w-5 h-5 inline-block ml-1"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" 
                    />
                  </svg>
                )}
              </Button>
            </div>
          </form>
        </div>

        <div className="text-center text-sm text-[#8e9297]">
          <p>
            Need help?{" "}
            <a href="#" className="text-[#5865F2] hover:underline">
              Check out our documentation
            </a>{" "}
            or{" "}
            <a href="#" className="text-[#5865F2] hover:underline">
              contact support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
