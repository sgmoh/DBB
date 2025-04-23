import { Link } from "wouter";

const BotHeader = () => {
  return (
    <header className="bg-black py-4 px-6 shadow-md border-b border-purple-900/30">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="24" 
                height="24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white"
              >
                <path d="M9 17l3-2.94m0 0L15 17m-3-2.94V2"></path>
                <path d="M12 22a8 8 0 100-16 8 8 0 000 16z"></path>
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">Swoosh Bots</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default BotHeader;
