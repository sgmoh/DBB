import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FilePreview = {
  name: string;
  size: number;
  url: string;
};

const SetupPage = () => {
  const [botName, setBotName] = useState("");
  const [serverLink, setServerLink] = useState("");
  const [filePreview, setFilePreview] = useState<FilePreview | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (1MB max)
    if (file.size > 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please select an image less than 1MB in size.",
      });
      return;
    }

    const preview = {
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
    };

    setFilePreview(preview);
    setLogoFile(file);
  };

  const generateBotMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/bots/generate", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
      
      return res.json();
    },
    onSuccess: () => {
      navigate("/success");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate bot website",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!botName.trim()) {
      toast({
        variant: "destructive",
        title: "Bot name required",
        description: "Please enter a name for your bot.",
      });
      return;
    }

    if (!serverLink.trim()) {
      toast({
        variant: "destructive",
        title: "Server link required",
        description: "Please enter your Discord server invite link.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", botName);
    formData.append("serverLink", serverLink);
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    generateBotMutation.mutate(formData);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#2F3136] rounded-lg shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Bot Configuration</h2>
            <span className="px-3 py-1 text-xs bg-green-600 text-white rounded-full">Bot Connected</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label 
                  htmlFor="bot-name" 
                  className="block text-sm font-medium text-[#8e9297] mb-2"
                >
                  Bot Name
                </Label>
                <Input 
                  type="text" 
                  id="bot-name" 
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#36393F] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5865F2] text-white"
                  placeholder="My Awesome Bot" 
                  required
                />
              </div>
              <div>
                <Label 
                  htmlFor="server-link" 
                  className="block text-sm font-medium text-[#8e9297] mb-2"
                >
                  Server Invite Link
                </Label>
                <Input 
                  type="url" 
                  id="server-link" 
                  value={serverLink}
                  onChange={(e) => setServerLink(e.target.value)}
                  className="w-full px-4 py-3 bg-[#36393F] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5865F2] text-white"
                  placeholder="https://discord.gg/yourserver" 
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <Label className="block text-sm font-medium text-[#8e9297] mb-2">
                Bot Logo
              </Label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#36393F] rounded-full flex items-center justify-center border-2 border-dashed border-gray-600 overflow-hidden">
                  {filePreview ? (
                    <img 
                      src={filePreview.url} 
                      alt="Logo preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth="1.5" 
                      stroke="currentColor" 
                      className="w-8 h-8 text-[#8e9297]"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" 
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-grow">
                  <label htmlFor="logo-upload" className="flex items-center px-4 py-2 bg-[#36393F] hover:bg-[#2F3136] border border-gray-700 rounded-md cursor-pointer transition">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth="1.5" 
                      stroke="currentColor" 
                      className="w-5 h-5 mr-2 text-[#8e9297]"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" 
                      />
                    </svg>
                    <span className="text-sm">Choose File</span>
                    <input 
                      id="logo-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="mt-2 text-xs text-[#8e9297]">
                    Recommended size: 128x128px (Max: 1MB)
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Bot Commands</h3>
              <div className="bg-[#36393F] rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#2F3136] p-3 rounded-md border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">!kick</span>
                      <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                    </div>
                    <p className="text-xs text-[#8e9297]">Kick users from your server</p>
                  </div>
                  <div className="bg-[#2F3136] p-3 rounded-md border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">!ban</span>
                      <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                    </div>
                    <p className="text-xs text-[#8e9297]">Ban users from your server</p>
                  </div>
                  <div className="bg-[#2F3136] p-3 rounded-md border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">!mute</span>
                      <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                    </div>
                    <p className="text-xs text-[#8e9297]">Mute users in your server</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button type="button" className="text-sm text-[#5865F2] hover:underline">
                    + Add Custom Command
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button 
                type="submit" 
                className="w-full py-3 bg-gradient-to-r from-[#5865F2] to-purple-600 hover:opacity-90 transition rounded-md font-medium text-white gradient-button"
                disabled={generateBotMutation.isPending}
              >
                {generateBotMutation.isPending ? "Generating..." : "Generate Bot & Website"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
