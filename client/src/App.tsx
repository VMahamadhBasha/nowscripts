import Navbar from "./components/Navbar";
import LandingNavbar from "./components/LandingNavbar";
import UnAuthHome from "./pages/UnAuthHome";
import CommunityFeed from "./pages/Home";
import { AuthModalProvider } from "./contexts/AuthModalContext";
import { AuthModal } from "./components/AuthModal";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AuthRedirect from "./pages/AuthRedirect";
import ProtectedRoute from "./router/Authentication";
import Post from "./pages/Post";
import Notifications from "./pages/Notifications";
import User from "./pages/User";
import Write from "./pages/Write";
import { useAuth } from "./contexts/Auth";
import SignIn from "./pages/SignIn";
import LearnDashboard from "./pages/LearnDashboard";
import InterviewPrepDashboard from "./pages/InterviewPrepDashboard";

import RoadmapDashboard from "./pages/RoadmapDashboard";
import RoadmapViewer from "./pages/RoadmapViewer";
import CertificationCenter from "./pages/CertificationCenter";
import {
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { Toaster, toast, Toast } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import { io } from "socket.io-client";
import { url } from "./baseUrl";
import SearchResults from "./pages/SearchResults";
import Suggestions from "./pages/Suggestions";

export const DEFAULT_IMG =
  "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F1_dmbNkD5D-u45r44go_cf0g.png?alt=media&token=3ef51503-f601-448b-a55b-0682607ddc8a";

type AppContextType = {
  hideNavbar(val: boolean): void;
  handleToast(message: string): void;
  socket: any;
};

const Context = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  return useContext(Context) as AppContextType;
}

function PublicLayout() {
  return (
    <AuthModalProvider>
      <div className="flex flex-col min-h-screen bg-now-background text-now-text font-sans relative">
        <LandingNavbar />
        <div className="flex-1">
          <Outlet />
        </div>
        <AuthModal />
      </div>
    </AuthModalProvider>
  );
}

function AppLayout({ notificationsCount }: { notificationsCount: number }) {
  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-now-primary selection:text-black">
      <Navbar notificationsCount={notificationsCount} />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  const { user } = useAuth();
  const [notificationsCount, setNotificationsCount] = useState(0);
  const socket = useMemo(() => io(url), []);

  useEffect(() => {
    if (!user) return;
    socket.emit("start", { userId: user?._id });
    socket.emit("checkNotifications", { userId: user?._id });
    socket.on("notificationsCount", ({ count }) => {
      setNotificationsCount(count);
    });
    socket.on("haveNotifications", (have) => {
      if (have) {
        setNotificationsCount((prev) => prev + 1);
        handleToast("You have a new notification!");
      }
    });
  }, [socket, user]);

  function hideNavbar(val: boolean) {
    // Deprecated. We use layouts now. Kept for backwards compatibility if needed by deep components.
  }
  
  function handleToast(message: string) {
    toast((t) => <ToastComponent message={message} t={t} />, {
      style: {
        borderRadius: "4px",
        background: "#333",
        color: "#fff",
        padding: "15px 18px",
      },
    });
  }
  
  function NullifyNotificationsCount() {
    setNotificationsCount(0);
  }

  const contextValue: AppContextType = {
    hideNavbar,
    handleToast,
    socket,
  };

  return (
    <Context.Provider value={contextValue}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="App selection:bg-now-primary selection:text-black min-h-screen">
        <Routes>
          {/* Public Layout Routes (Accessible to all, but shows AvatarMenu if logged in) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<UnAuthHome />} />
            <Route path="/roadmaps" element={<RoadmapDashboard />} />
            <Route path="/roadmaps/:slug" element={<RoadmapViewer />} />
            <Route path="/certifications" element={<CertificationCenter />} />
          </Route>

          {/* Protected App Layout Routes (Requires Login) */}
          <Route element={<ProtectedRoute><AppLayout notificationsCount={notificationsCount} /></ProtectedRoute>}>
            <Route path="/learn" element={<LearnDashboard />} />
            <Route path="/learn/:categorySlug/:lessonSlug" element={<LearnDashboard />} />
            <Route path="/interview-prep" element={<InterviewPrepDashboard />} />
            <Route path="/interview-prep/:categorySlug/:lessonSlug" element={<InterviewPrepDashboard />} />
            <Route path="/community" element={<CommunityFeed />} />
            <Route path="/tag/:tag" element={<CommunityFeed />} />
            <Route path="/projects" element={<div className="text-[#0F172A] text-center mt-20 text-2xl font-bold">Projects Coming Soon</div>} />
            <Route path="/suggestions" element={<Suggestions />} />
            <Route path="/search/:tab/:query" element={<SearchResults />} />
            <Route path="/blog/:id" element={<Post />} />
            <Route path="/user/:id/:tab?" element={<User />} />
            <Route path="/notifications" element={<Notifications emptyNotifications={NullifyNotificationsCount} />} />
            <Route path="/write/:postId?" element={
              <div className="write_page mx-auto w-full md:w-3/4 lg:w-1/2 h-full">
                <Write />
              </div>
            } />
          </Route>

          {/* Auth Pages (No layout) */}
          <Route path="/signin/:tab" element={<SignIn />} />
          <Route path="/oauth/redirect" element={<AuthRedirect />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

function ToastComponent({ message, t }: { message: string; t: Toast }) {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <span style={{ color: "white", fontFamily: "Roboto Slab", fontSize: "14px", marginRight: "30px" }}>
        {message}
      </span>
      <button
        style={{ color: "white", backgroundColor: "transparent", border: "none", outline: "none", marginLeft: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        onClick={() => toast.dismiss(t.id)}
      >
        <CloseIcon sx={{ fontSize: "17px" }} />
      </button>
    </div>
  );
}
