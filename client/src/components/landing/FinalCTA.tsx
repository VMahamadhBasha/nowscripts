import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../../contexts/Auth";
import { useAuthModal } from "../../contexts/AuthModalContext";

export function FinalCTA() {
  const { isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();
  const navigate = useNavigate();
  return (
    <section className="py-32 bg-black relative overflow-hidden z-10 border-t border-gray-800">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-now-primary/5 filter blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
          Master ServiceNow From Beginner To Architect
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 mb-12">
          Learn, Build Projects, Earn Certifications, and Grow Your Career.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => {
              if (isAuthenticated) {
                navigate("/learn");
              } else {
                openModal('signup');
              }
            }}
            className="w-full sm:w-auto px-8 py-4 bg-now-primary text-black font-bold rounded-full hover:bg-now-accent transition-all shadow-[0_0_30px_rgba(0,192,139,0.4)] flex items-center justify-center gap-2 text-lg"
          >
            Start Learning <ArrowRight className="w-5 h-5" />
          </button>
          <Link 
            to="/roadmaps"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-lg"
          >
            Explore Roadmaps
          </Link>
        </div>
      </div>
    </section>
  );
}
