import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, ShieldCheck, Info } from "lucide-react";
import { useAuthModal } from "../contexts/AuthModalContext";
import { useAuth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { googleIcon } from "../assets/icons";

export function AuthModal() {
  const { isOpen, view, closeModal, setView } = useAuthModal();
  const { handleUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      // Auto focus first input
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    } else {
      document.body.style.overflow = "unset";
      // Reset state
      setName("");
      setEmail("");
      setPassword("");
      setShowPassword(false);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeModal, view]);

  const handleGoogleAuth = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
    const qs = new URLSearchParams(options);
    window.location.assign(`${rootUrl}?${qs.toString()}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TEMP DEMO LOGIN
    // Remove before production deployment
    if (email === "admin@gmail.com" && password === "12345678") {
      handleUser({
        _id: "demo_admin_123",
        name: "Demo Admin",
        email: "admin@gmail.com",
        avatar: "https://i.pravatar.cc/150?u=admin",
        bio: "Demo Account",
        list: []
      });
      closeModal();
      navigate("/learn");
      return;
    }

    console.log(`Submitted ${view}:`, { name, email, password });
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-[8px] z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0, ease: "easeOut" }}
              className="relative w-full max-w-[420px] max-h-[85vh] pointer-events-auto flex flex-col"
            >
              <div 
                className="w-full rounded-[20px] p-6 sm:p-8 relative overflow-y-auto no-scrollbar"
                style={{
                  background: "rgba(10, 15, 30, 0.9)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 0 40px rgba(0, 192, 139, 0.15), 0 20px 40px rgba(0,0,0,0.4)",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-5 right-5 text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-1.5 transition-all duration-200 z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="text-center mb-6">
                  <h2 
                    className="text-[32px] font-[700] text-white leading-tight tracking-tight mb-1.5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {view === "login" ? "Welcome back" : "Create account"}
                  </h2>
                  <p className="text-[#8892b0] text-[14px] font-medium">
                    {view === "login"
                      ? "Enter your details to access your dashboard"
                      : "Join NowScripts to accelerate your career"}
                  </p>
                </div>

                {view === "login" && (
                  <div className="mb-6 p-3 rounded-lg bg-now-primary/10 border border-now-primary/20 text-left flex gap-3">
                    <Info className="w-5 h-5 text-now-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-bold text-white mb-1">Demo Account</p>
                      <p className="text-[12px] text-gray-300 font-mono">Email: admin@gmail.com</p>
                      <p className="text-[12px] text-gray-300 font-mono">Password: 12345678</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <AnimatePresence mode="popLayout">
                    {view === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">
                          Full Name
                        </label>
                        <input
                          ref={inputRef}
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full h-[48px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 text-white text-[15px] placeholder-gray-500 focus:outline-none focus:border-[#00C08B] focus:ring-4 focus:ring-[#00C08B]/15 transition-all duration-200"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className="block text-[13px] font-semibold text-gray-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      ref={view === "login" ? inputRef : null}
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-[48px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 text-white text-[15px] placeholder-gray-500 focus:outline-none focus:border-[#00C08B] focus:ring-4 focus:ring-[#00C08B]/15 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[13px] font-semibold text-gray-300">
                        Password
                      </label>
                      {view === "login" && (
                        <button type="button" className="text-now-primary text-[13px] font-semibold hover:text-now-accent transition-colors duration-200">
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-[48px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg pl-4 pr-12 text-white text-[15px] placeholder-gray-500 focus:outline-none focus:border-[#00C08B] focus:ring-4 focus:ring-[#00C08B]/15 transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 hover:bg-white/5 p-1.5 rounded-md transition-all duration-200 flex items-center justify-center"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-[48px] bg-now-primary text-[#020617] text-[16px] font-[700] rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(0,192,139,0.2)] hover:shadow-[0_0_25px_rgba(0,192,139,0.4)] hover:-translate-y-[1px] mt-2 flex items-center justify-center"
                  >
                    {view === "login" ? "Sign In" : "Create Account"}
                  </button>
                </form>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-3 mt-4 mb-1 text-[11px] text-[#64748b] font-medium">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-now-primary" />
                    Secure
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-700"></div>
                  <div className="flex items-center gap-1">
                    Data Protected
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-700"></div>
                  <div className="flex items-center gap-1">
                    No Spam
                  </div>
                </div>

                <div className="flex items-center gap-3 my-5">
                  <div className="h-[1px] bg-white/10 flex-1"></div>
                  <span className="text-[#64748b] text-[12px] font-medium uppercase tracking-wider">Or</span>
                  <div className="h-[1px] bg-white/10 flex-1"></div>
                </div>

                <button
                  onClick={handleGoogleAuth}
                  className="w-full h-[48px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] hover:border-[#00C08B] hover:bg-[rgba(0,192,139,0.05)] text-white text-[14px] font-semibold rounded-lg flex items-center justify-center gap-2.5 transition-all duration-250 ease-out group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-250 ease-out">
                    {googleIcon}
                  </span>
                  Continue with Google
                </button>

                <div className="text-center mt-6 text-[14px] text-[#8892b0] font-medium">
                  {view === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <button
                        onClick={() => setView("signup")}
                        className="text-white font-bold hover:text-now-primary transition-colors duration-200"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        onClick={() => setView("login")}
                        className="text-white font-bold hover:text-now-primary transition-colors duration-200"
                      >
                        Log in
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
