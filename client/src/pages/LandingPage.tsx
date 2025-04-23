import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, AlertTriangleIcon, ZapIcon } from "lucide-react";

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
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center glow-border">
                <ZapIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text glow-text">
              Swoosh Bots
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Build your own Discord bot with kick, ban, and mute commands
            </p>
            
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600 p-1 rounded-lg shadow-lg glow-border">
                <div className="bg-black px-4 py-2 rounded-md">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                    <span>bot.js</span>
                    <span>Swoosh Bot</span>
                  </div>
                  <div className="text-left text-sm mt-2 p-2 bg-black/60 rounded border border-purple-900/30">
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

          <div className="bg-black rounded-lg shadow-2xl p-6 mb-8 border border-purple-900/30 glow-border">
            <h2 className="text-xl font-semibold mb-4 text-white">Enter Your Bot Token</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label 
                  htmlFor="token" 
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Discord Bot Token
                </Label>
                <div className="relative">
                  <Input 
                    type={showToken ? "text" : "password"} 
                    id="token" 
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-purple-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="Enter your Discord bot token" 
                    required
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={toggleTokenVisibility}
                  >
                    {showToken ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-400 flex items-center">
                  <AlertTriangleIcon className="w-4 h-4 inline mr-1 text-purple-400" />
                  Never share your token with others
                </p>
              </div>
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition rounded-md font-medium h-10 shadow-lg"
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
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
