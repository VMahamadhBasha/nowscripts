import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, ShieldCheck, Info } from "lucide-react";
import { useAuthModal } from "../contexts/AuthModalContext";
import { useAuth } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { googleIcon } from "../assets/icons";

import { BrandIconOnly } from "./BrandLogo";

export function AuthModal() {
  const { isOpen, view, closeModal, setView } = useAuthModal();
  const { handleUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
      setSubmitted(false);
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
    setSubmitted(true);
    
    // TEMP DEMO LOGIN
    // Remove before production deployment
    if (email === "mowadmin@gmail.com" && password === "now12345") {
      handleUser({
        _id: "demo_admin_123",
        name: "Admin User",
        email: "mowadmin@gmail.com",
        role: "Admin",
        avatar: "https://i.pravatar.cc/150?u=admin",
        bio: "Demo Admin Account",
        list: []
      } as any);
      closeModal();
      navigate("/admin/certificates");
      return;
    }

    if (!email || !password || (view === "signup" && !name)) {
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
              className="relative w-full max-w-[440px] pointer-events-auto flex flex-col"
            >
              <div 
                className="w-full bg-white rounded-xl p-8 relative shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                  <h2 className="text-[24px] font-bold text-[#1a1a1a]">
                    {view === "login" ? "Log in" : "Create an Account"}
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {view === "signup" && (
                    <div>
                      <input
                        ref={inputRef}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className={`w-full h-[48px] bg-white border rounded-md px-4 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none transition-colors ${
                          submitted && name === "" ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        }`}
                      />
                    </div>
                  )}

                  <div>
                    <input
                      ref={view === "login" ? inputRef : null}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className={`w-full h-[48px] bg-white border rounded-md px-4 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none transition-colors ${
                        submitted && email === "" && view === "signup" ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      }`}
                    />
                    {submitted && email === "" && view === "signup" && (
                      <p className="text-red-500 text-[12px] mt-1 text-left">Enter a valid email</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={`w-full h-[48px] bg-white border rounded-md pl-4 pr-12 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none transition-colors ${
                          submitted && password === "" && view === "signup" ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {submitted && password === "" && view === "signup" && (
                      <p className="text-red-500 text-[12px] mt-1 text-left">Enter a password</p>
                    )}
                  </div>

                  {view === "signup" && (
                    <div className="flex items-start gap-2 pt-1 pb-2">
                      <input 
                        type="checkbox" 
                        defaultChecked
                        className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        id="promo"
                      />
                      <label htmlFor="promo" className="text-[14px] text-gray-600 leading-snug">
                        I'd like to receive promotional and instructional emails
                      </label>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full h-[48px] bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[16px] font-bold rounded-md transition-colors flex items-center justify-center mt-2"
                  >
                    {view === "login" ? "Log in" : "Next"}
                  </button>
                </form>

                <div className="flex items-center gap-3 my-6">
                  <div className="h-[1px] bg-gray-200 flex-1"></div>
                  <span className="text-gray-600 text-[14px] font-medium">Or</span>
                  <div className="h-[1px] bg-gray-200 flex-1"></div>
                </div>

                <button
                  onClick={handleGoogleAuth}
                  className="w-full h-[48px] bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 text-[15px] font-semibold rounded-md flex items-center justify-center gap-3 transition-colors"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                  Continue with Google
                </button>

                <div className="text-center mt-8 text-[14px] text-gray-600">
                  {view === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <button
                        onClick={() => setView("signup")}
                        className="text-gray-900 font-bold hover:underline"
                      >
                        Create one
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        onClick={() => setView("login")}
                        className="text-gray-900 font-bold hover:underline"
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
