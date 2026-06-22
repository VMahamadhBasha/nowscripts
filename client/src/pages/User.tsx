import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../baseUrl";
import { useAuth } from "../contexts/Auth";
import Post from "../components/Post";
import ListSection from "../components/ListSection";
import UserCard from "../components/UserCard";
import AboutSection from "../components/AboutSection";
import SavedSection from "../components/SavedSection";
import { Award, Target, Zap, LayoutDashboard, Settings, MoreHorizontal, BookOpen, Star, Mail, MapPin, Link as LinkIcon, Calendar, BookMarked, MessageSquare } from "lucide-react";
import { formatNumber, toTitleCase } from "../utils/helper";
import ReactTimeAgo from "react-time-ago";

const USER_PAGE_TAB_OPTIONS_AUTH = [
  { id: 1, url: "/user/userId", title: "posts", icon: <MessageSquare className="w-4 h-4" /> },
  { id: 2, url: "/user/userId/lists", title: "bookmarks", icon: <BookMarked className="w-4 h-4" /> },
  { id: 3, url: "/user/userId/about", title: "about", icon: <BookOpen className="w-4 h-4" /> },
];

const USER_PAGE_TAB_OPTIONS_UNAUTH = [
  { id: 1, url: "/user/userId", title: "posts", icon: <MessageSquare className="w-4 h-4" /> },
  { id: 3, url: "/user/userId/about", title: "about", icon: <BookOpen className="w-4 h-4" /> },
];

export default function UserProfile() {
  const { tab, id } = useParams();
  const { user } = useAuth();
  const [query] = useSearchParams();
  const navigate = useNavigate();

  const activeQuery = query.get("active");

  const [optionsTab, setOptionsTab] = useState(USER_PAGE_TAB_OPTIONS_UNAUTH);
  const [posts, setposts] = useState<Array<any>>([]);
  const [userData, setUserData] = useState<Array<any>>([]);

  const { data } = useQuery({
    queryFn: () => httpRequest.get(`${url}/user/${id}`),
    queryKey: ["user", id],
    onSuccess: (data) => {
      document.title = data.data.name + " - NowScripts";
      setOptionsTab(() => {
        if (user?._id === id)
          return USER_PAGE_TAB_OPTIONS_AUTH.map((item) => ({ ...item, url: item.url.replace("userId", data.data._id) }));
        else
          return USER_PAGE_TAB_OPTIONS_UNAUTH.map((item) => ({ ...item, url: item.url.replace("userId", data.data._id) }));
      });
    },
  });

  const { refetch } = useQuery({
    queryFn: () => httpRequest.get(`${url}/post/user/${id}`),
    enabled: false,
    queryKey: ["post", "user", id],
    onSuccess(response) {
      setposts(response.data);
    },
  });

  const { refetch: getAllFollowers } = useQuery({
    queryFn: () => httpRequest.get(`${url}/user/followers/${id}`),
    enabled: false,
    queryKey: ["followers", "user", id],
    onSuccess(res) {
      setUserData(res.data);
    },
  });

  const { refetch: getAllFollowings } = useQuery({
    queryFn: () => httpRequest.get(`${url}/user/followings/${id}`),
    enabled: false,
    queryKey: ["followings", "user", id],
    onSuccess(res) {
      setUserData(res.data);
    },
  });

  useEffect(() => {
    if (!data?.data) return;
    if (tab === "followers") {
      getAllFollowers();
    } else if (tab === "followings") {
      getAllFollowings();
    } else {
      refetch();
    }
  }, [data?.data, tab, activeQuery]);

  function filterPost(postId: string) {
    setposts((prev) => prev.filter((item) => item._id !== postId));
  }

  if (!data?.data) return <div className="text-center py-20 text-slate-500 dark:text-slate-400 font-bold">Loading Profile...</div>;

  const profile = data.data;

  // Render Tabs
  const currentTab = tab || "posts";

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-8 pb-24 text-slate-900 dark:text-slate-100 font-sans selection:bg-now-primary selection:text-black dark:text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PROFILE HEADER CARD */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm mb-8">
           <div className="h-48 bg-gradient-to-r from-[#0F172A] to-[#1E293B] relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              {user?._id === id && (
                 <button className="absolute top-4 right-4 bg-white dark:bg-slate-900/10 hover:bg-white dark:bg-slate-900/20 text-white backdrop-blur-md border border-white/20 p-2 rounded-lg transition-colors">
                    <Settings className="w-5 h-5" />
                 </button>
              )}
           </div>
           
           <div className="px-8 pb-8 relative">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
                 <div className="flex items-end gap-6">
                    <img 
                       src={profile.avatar} 
                       className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-white shadow-lg object-cover bg-white dark:bg-slate-900" 
                       alt="" 
                    />
                    <div className="pb-2 hidden sm:block">
                       <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{profile.name}</h1>
                       <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{profile.role || "ServiceNow Developer"}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 pb-2">
                    {user?._id !== id ? (
                       <>
                          <button className="bg-[#0F172A] hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm">
                             Follow
                          </button>
                          <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#0F172A] text-slate-900 dark:text-slate-100 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors">
                             Message
                          </button>
                       </>
                    ) : (
                       <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#0F172A] text-slate-900 dark:text-slate-100 px-6 py-2.5 rounded-lg text-sm font-bold transition-colors">
                          Edit Profile
                       </button>
                    )}
                 </div>
              </div>

              {/* Mobile Name (shows only on mobile since desktop is inline with avatar) */}
              <div className="sm:hidden mb-6">
                 <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{profile.name}</h1>
                 <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{profile.role || "ServiceNow Developer"}</p>
              </div>

              <div className="max-w-2xl text-[#475569] leading-relaxed mb-6">
                 {profile.bio || "Passionate about ServiceNow development and sharing knowledge with the community."}
              </div>

              {/* Badges & Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                 <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Global
                 </div>
                 <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Joined <ReactTimeAgo date={Date.parse(profile.createdAt)} locale="en-US" timeStyle="round" />
                 </div>
                 {profile.certifications?.map((cert: string) => (
                    <div key={cert} className="flex items-center gap-1.5 text-yellow-700 bg-yellow-50 border border-yellow-200 px-2.5 py-1 rounded-md uppercase tracking-wider text-[10px] font-bold">
                       <Award className="w-3.5 h-3.5" /> {cert}
                    </div>
                 ))}
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                 <Link to={`/user/${id}/followers`} className="flex items-center gap-2 hover:text-[#00C08B] transition-colors">
                    <span className="font-extrabold text-slate-900 dark:text-slate-100 text-lg">{formatNumber(profile.followers?.length || 0)}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider font-bold">Followers</span>
                 </Link>
                 <Link to={`/user/${id}/followings`} className="flex items-center gap-2 hover:text-[#00C08B] transition-colors">
                    <span className="font-extrabold text-slate-900 dark:text-slate-100 text-lg">{formatNumber(profile.followings?.length || 0)}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider font-bold">Following</span>
                 </Link>
                 <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#00C08B] text-lg">{formatNumber(profile.xp || 1240)}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider font-bold flex items-center gap-1"><Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" /> XP</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 dark:text-slate-100 text-lg">{formatNumber(profile.contributionScore || 85)}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider font-bold">Contribution Score</span>
                 </div>
              </div>
           </div>
        </div>

        {/* CONTENT TABS */}
        <div className="flex items-center gap-8 mb-8 border-b border-slate-200 dark:border-slate-800">
           {optionsTab.map(opt => {
              const isActive = (tab === undefined && opt.title === 'posts') || tab === opt.title;
              return (
                 <Link
                    key={opt.id}
                    to={opt.url}
                    className={`flex items-center gap-2 pb-4 px-1 border-b-2 transition-all font-bold text-sm uppercase tracking-wider ${
                       isActive 
                          ? "border-[#00C08B] text-[#00C08B]" 
                          : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100"
                    }`}
                 >
                    {opt.icon} {opt.title}
                 </Link>
              );
           })}
        </div>

        {/* TAB CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
           
           <div className="min-w-0 space-y-6">
              {/* Followers / Following List */}
              {(tab === "followers" || tab === "followings") && (
                 <div>
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">{userData.length} {toTitleCase(tab)}</h2>
                    <div className="space-y-4">
                       {userData.map((u: any) => (
                          <UserCard
                             _id={u._id}
                             avatar={u.avatar}
                             followers={u.followers}
                             name={u.name}
                             bio={u.bio}
                             key={u._id}
                          />
                       ))}
                    </div>
                 </div>
              )}

              {/* Lists Active Query */}
              {tab === "lists" && activeQuery && (
                 <div>
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">List: {activeQuery}</h2>
                    <ListSection listName={activeQuery} />
                 </div>
              )}

              {/* Main Posts Tab */}
              {(tab === undefined || tab === "posts") && (
                 <div className="space-y-5">
                    {posts.length === 0 ? (
                       <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center">
                          <MessageSquare className="w-12 h-12 text-[#CBD5E1] mx-auto mb-4" />
                          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">No posts yet</h3>
                          <p className="text-slate-500 dark:text-slate-400 text-sm">{profile.name} hasn't published anything.</p>
                       </div>
                    ) : (
                       posts.map((item: any) => (
                          <Post
                             showUserList={true}
                             postId={item._id}
                             timestamp={item.createdAt}
                             title={item.title}
                             username={profile.name}
                             userId={id as string}
                             image={item.image}
                             tag={item.tags?.at(0)}
                             tags={item.tags}
                             userImage={profile.avatar}
                             key={item._id}
                             summary={item.summary}
                             showMuteicon={false}
                             filterPost={filterPost}
                             userRole={profile.role}
                             userCertifications={profile.certifications}
                             views={item.views}
                             postType={item.postType}
                             difficulty={item.difficulty}
                             readTime={item.readTime}
                             likesCount={item.votes?.length}
                             commentsCount={item.comments?.length}
                          />
                       ))
                    )}
                 </div>
              )}

              {/* Lists Tab */}
              {tab === "lists" && !activeQuery && (
                 <SavedSection userId={id!} />
              )}

              {/* About Tab */}
              {tab === "about" && (
                 <AboutSection
                    userId={id!}
                    bio={profile.bio}
                    followers={profile.followers?.length || 0}
                    followings={profile.followings?.length || 0}
                 />
              )}
           </div>

           {/* RIGHT SIDEBAR */}
           <div className="hidden lg:block space-y-6">
              
              {/* Gamification Stats Mini Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                 <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-5 flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#00C08B]" /> Achievements
                 </h3>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Learning Streak</span>
                       <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                          <FlameIcon /> {profile.learningStreak || 5} Days
                       </span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Badges</span>
                       <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                          {profile.badges?.length || 3}
                       </span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Community Rank</span>
                       <span className="text-sm font-extrabold text-[#00C08B]">
                          Top 5%
                       </span>
                    </div>
                 </div>
              </div>

              {/* Skills */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                 <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Skills</h3>
                 <div className="flex flex-wrap gap-2">
                    {(profile.skills?.length > 0 ? profile.skills : ["ITSM", "CMDB", "Service Portal", "JavaScript", "Flow Designer", "REST API"]).map((skill: string) => (
                       <span key={skill} className="text-xs font-medium bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1.5 rounded-md">
                          {skill}
                       </span>
                    ))}
                 </div>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
}

const FlameIcon = () => (
   <svg xmlns="http://www.w3.org/w0000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 fill-orange-500">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
   </svg>
);
