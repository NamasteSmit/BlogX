const Footer = () => {
    return (
      <footer className="relative w-full bg-black py-6 mt-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-50 blur-sm"></div>
  
        <div className="container mx-auto flex flex-col items-center justify-between px-6 md:flex-row">
          {/* Logo or Branding */}
          <div className="text-white text-lg font-bold">Code Craft</div>
  
          {/* Links */}
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition">Home</a>
            <a href="#" className="text-gray-400 hover:text-white transition">About</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
          </nav>
  
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition">
            <i className="ri-twitter-x-line text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-500 transition">
            <i className="ri-github-fill text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition">
            <i className="ri-linkedin-box-fill text-2xl"></i>
             </a>
          </div>
        </div>
  
        <div className="mt-10 text-center text-gray-500 text-sm ">
          © {new Date().getFullYear()} Your Brand. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
