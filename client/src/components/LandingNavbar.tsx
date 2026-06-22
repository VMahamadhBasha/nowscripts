import { Link } from "react-router-dom";
import { whiteLogo } from "../assets/icons";
import { useAuth } from "../contexts/Auth";
import { useAuthModal } from "../contexts/AuthModalContext";
import AvatarMenu from "./AvatarMenu";

export default function LandingNavbar() {
  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();
  return (
    <div className="w-full h-20 bg-now-background/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-full">
        {/* Left Side: Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-white hover:text-now-primary transition-colors">
            {whiteLogo}
          </Link>
        </div>

        {/* Right Side: Links & CTA */}
        <div className="flex items-center gap-6">
          <Link to="/learn" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Learn
          </Link>
          <Link to="/roadmaps" className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Roadmaps
          </Link>
          <Link to="/community" className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Community
          </Link>
          <Link to="#" className="hidden lg:block text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Projects
          </Link>
          <Link to="/interview-prep" className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors hidden md:block">
            Interview Prep
          </Link>
          <Link to={isAuthenticated ? "/write" : "/signin/write"} className="hidden sm:flex text-sm font-medium text-now-primary hover:text-now-accent transition-colors">
            Share Content
          </Link>
          
          <div className="flex items-center gap-3 ml-2">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => openModal('login')}
                  className="px-4 py-2 text-sm font-medium text-white hover:text-now-primary transition-colors rounded-full"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openModal('signup')}
                  className="px-5 py-2.5 text-sm font-bold text-now-background bg-now-primary hover:bg-now-accent transition-colors rounded-full shadow-[0_0_15px_rgba(0,192,139,0.3)] hover:shadow-[0_0_20px_rgba(0,192,139,0.5)]"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="flex items-center h-full">
                <AvatarMenu />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
