import { Link } from "wouter";

const BotHeader = () => {
  return (
    <header className="bg-[#2F3136] py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-10 h-10 bg-[#5865F2] rounded-full flex items-center justify-center">
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
            <span className="text-xl font-bold">BotForge</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <a className="text-white hover:text-[#5865F2] transition">Home</a>
          </Link>
          <a href="#" className="text-[#8e9297] hover:text-[#5865F2] transition">Features</a>
          <a href="#" className="text-[#8e9297] hover:text-[#5865F2] transition">Docs</a>
          <a href="#" className="text-[#8e9297] hover:text-[#5865F2] transition">Support</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="hidden md:block px-4 py-2 rounded-md bg-[#5865F2] hover:bg-opacity-80 transition text-white">
            Sign In
          </button>
          <button className="md:hidden text-white">
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default BotHeader;
