import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ChevronDown, ChevronRight, PlayCircle, FileText, 
  CheckSquare, Award, Clock, Target, List, Video, BookOpen, ChevronLeft, ChevronRight as IconNext, CheckCircle
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { courseData, LessonData, Subtopic, generateSlug } from "../utils/markdownParser";

// Custom heading renderer to auto-generate IDs for scroll spy
const CustomH2 = ({ children, ...props }: any) => {
  // Try to extract text content. children might be a string or an array of elements/strings
  let text = "";
  if (typeof children === "string") text = children;
  else if (Array.isArray(children)) {
    text = children.map((c: any) => typeof c === "string" ? c : "").join("");
  }
  const id = generateSlug(text);
  
  // We wrap it in a section-like div to keep the same structure as before
  return (
    <section id={id} className="scroll-mt-24 group relative mt-24 mb-6">
      <div className="flex items-center">
        {/* We'll handle the check circle absolutely in CSS or just rely on the existing styling */}
        <h2 className="text-3xl font-bold text-[#0F172A]" {...props}>
          {children}
        </h2>
      </div>
    </section>
  );
};

export default function LearnDashboard() {
  const { categorySlug, lessonSlug } = useParams();
  const navigate = useNavigate();

  // Find initial lesson based on URL params, or default to the very first one
  const getInitialLesson = () => {
    if (categorySlug && lessonSlug) {
      const found = courseData.flatMap(c => c.lessons).find(l => l.categorySlug === categorySlug && l.slug === lessonSlug);
      if (found) return found;
    }
    return courseData[0]?.lessons[0];
  };

  const [activeLesson, setActiveLesson] = useState<LessonData>(getInitialLesson());
  const [searchQuery, setSearchQuery] = useState("");
  
  // By default, expand the section of the active lesson
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    [activeLesson?.category || courseData[0]?.sectionTitle]: true
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({
    [activeLesson?.id]: true
  });
  
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [completedSubtopics, setCompletedSubtopics] = useState<Record<string, boolean>>({});
  const [activeSubtopicId, setActiveSubtopicId] = useState<string>("");
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Flatten lessons for next/prev navigation
  const allLessons = courseData.flatMap(section => section.lessons);
  const currentIndex = activeLesson ? allLessons.findIndex(l => l.id === activeLesson.id) : -1;

  // Sync URL when activeLesson changes
  useEffect(() => {
    if (activeLesson) {
      const newUrl = `/learn/${activeLesson.categorySlug}/${activeLesson.slug}`;
      if (window.location.pathname !== newUrl) {
        navigate(newUrl, { replace: true });
      }
    }
  }, [activeLesson, navigate]);

  const filteredData = courseData.map(section => {
    const filteredLessons = section.lessons.filter(l => 
      l.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...section, lessons: filteredLessons };
  }).filter(section => section.lessons.length > 0);

  useEffect(() => {
    if (!activeLesson) return;
    setExpandedLessons(prev => ({ ...prev, [activeLesson.id]: true }));
    setExpandedSections(prev => ({ ...prev, [activeLesson.category]: true }));
    
    if (activeLesson.subtopics && activeLesson.subtopics.length > 0) {
      if (!window.location.hash) {
         setActiveSubtopicId(activeLesson.subtopics[0].id);
      }
    }
    
    if (scrollContainerRef.current) {
       scrollContainerRef.current.scrollTop = 0;
       setReadingProgress(0);
    }
  }, [activeLesson]);

  // Jump to hash on mount or when activeLesson changes
  useEffect(() => {
    if (!activeLesson) return;
    const hash = window.location.hash.replace('#', '');
    if (hash && activeLesson.subtopics && activeLesson.subtopics.some(s => s.id === hash)) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el && scrollContainerRef.current) {
           el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [activeLesson]);

  // Intersection Observer
  useEffect(() => {
    if (!activeLesson) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const totalScroll = container.scrollHeight - container.clientHeight;
      const currentScroll = container.scrollTop;
      if (totalScroll > 0) {
        setReadingProgress(Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)));
      } else {
        setReadingProgress(100);
      }
    };

    container.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter(e => e.isIntersecting);
      if (visibleEntries.length > 0) {
        visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const topMost = visibleEntries[0].target.id;
        
        setActiveSubtopicId(topMost);
        
        window.history.replaceState(null, "", `#${topMost}`);

        setCompletedSubtopics(prev => ({ ...prev, [topMost]: true }));
      }
    }, { 
      root: container, 
      rootMargin: '-10% 0px -60% 0px' 
    });

    if (activeLesson.subtopics) {
      activeLesson.subtopics.forEach(sub => {
        const el = document.getElementById(sub.id);
        if (el) observer.observe(el);
      });
    }

    return () => {
      container.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [activeLesson]);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  const toggleLesson = (lessonId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedLessons(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }));
  };

  const goToNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      setActiveLesson(allLessons[currentIndex + 1]);
    }
  };

  const goToPrevLesson = () => {
    if (currentIndex > 0) {
      setActiveLesson(allLessons[currentIndex - 1]);
    }
  };

  const scrollToSubtopic = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!activeLesson) return <div className="p-8 text-center">Loading Content...</div>;

  // We slice the rawMarkdown to remove the frontmatter block at the top before rendering
  const contentToRender = activeLesson.rawMarkdown.replace(/^---[\s\S]+?---/, '').trim();

  return (
    <div className="bg-[#FFFFFF] text-[#0F172A] font-sans flex flex-col h-full overflow-hidden selection:bg-now-primary selection:text-black relative">
      
      <div className="absolute top-0 left-0 w-full h-1 bg-[#E2E8F0] z-50">
        <div 
          className="h-full bg-now-primary transition-all duration-300 ease-out" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="flex flex-1 overflow-hidden h-full mt-1 relative">
        
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-[#0F172A]/20 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <div className={`absolute lg:relative w-80 flex-shrink-0 border-r border-[#E2E8F0] bg-[#FFFFFF] flex flex-col z-50 h-full overflow-hidden transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}>
          <div className="p-6 border-b border-[#E2E8F0]">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#0F172A]">
              <BookOpen className="text-now-primary w-5 h-5" /> Course Contents
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input 
                type="text" 
                placeholder="Search lessons..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-now-primary transition-colors text-[#0F172A] placeholder-[#64748B]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pb-24">
            {filteredData.map((section, sIdx) => (
              <div key={sIdx} className="border-b border-[#E2E8F0]">
                <button 
                  onClick={() => toggleSection(section.sectionTitle)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors"
                >
                  <span className="font-bold text-sm text-[#0F172A]">{section.sectionTitle}</span>
                  {expandedSections[section.sectionTitle] ? (
                    <ChevronDown className="w-4 h-4 text-[#64748B]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#64748B]" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSections[section.sectionTitle] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-[#F8FAFC]/50"
                    >
                      {section.lessons.map(lesson => {
                        const isLessonActive = activeLesson.id === lesson.id;
                        const isLessonExpanded = expandedLessons[lesson.id];

                        return (
                          <div key={lesson.id} className="border-b border-[#E2E8F0] last:border-b-0">
                            <div className="flex items-stretch">
                              <button
                                onClick={() => setActiveLesson(lesson)}
                                className={`flex-1 px-6 py-3 flex items-center gap-3 text-left transition-all ${
                                  isLessonActive 
                                    ? "bg-now-primary/5 text-[#0F172A]" 
                                    : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                                }`}
                              >
                                <div className="flex flex-col truncate flex-1">
                                  <span className="text-xs font-semibold uppercase tracking-wider mb-0.5 opacity-70">
                                    Lesson {lesson.order}
                                  </span>
                                  <span className={`text-sm truncate ${isLessonActive ? "font-bold" : "font-medium"}`}>
                                    {lesson.title}
                                  </span>
                                </div>
                              </button>
                              
                              <button 
                                onClick={(e) => toggleLesson(lesson.id, e)}
                                className={`px-4 flex items-center justify-center transition-colors border-l border-transparent ${isLessonActive ? "hover:bg-now-primary/10" : "hover:bg-[#E2E8F0]"}`}
                              >
                                {isLessonExpanded ? (
                                  <ChevronDown className={`w-4 h-4 ${isLessonActive ? "text-now-primary" : "text-[#64748B]"}`} />
                                ) : (
                                  <ChevronRight className={`w-4 h-4 ${isLessonActive ? "text-now-primary" : "text-[#64748B]"}`} />
                                )}
                              </button>
                            </div>

                            <AnimatePresence>
                              {isLessonExpanded && lesson.subtopics && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-[#FFFFFF]"
                                >
                                  <div className="py-2">
                                    {lesson.subtopics.map(sub => {
                                      const isSubActive = isLessonActive && activeSubtopicId === sub.id;
                                      return (
                                        <button
                                          key={sub.id}
                                          onClick={() => {
                                            if (!isLessonActive) {
                                              setActiveLesson(lesson);
                                              setMobileMenuOpen(false);
                                              setTimeout(() => scrollToSubtopic(sub.id), 100);
                                            } else {
                                              scrollToSubtopic(sub.id);
                                              setMobileMenuOpen(false);
                                            }
                                          }}
                                          className={`w-full px-6 py-2 pl-12 flex items-center text-left text-sm transition-colors ${
                                            isSubActive
                                              ? "text-now-primary font-bold bg-now-primary/5 border-r-2 border-now-primary"
                                              : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                                          }`}
                                        >
                                          <div className={`w-1.5 h-1.5 rounded-full mr-3 shrink-0 transition-colors ${isSubActive ? "bg-now-primary" : "bg-[#E2E8F0]"}`} />
                                          <span className="truncate">{sub.title}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto bg-[#FFFFFF] custom-scrollbar relative h-full flex justify-center"
        >
          <div className="w-full max-w-4xl px-8 lg:px-16 py-12 pb-48">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeLesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-16 border-b border-[#E2E8F0] pb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <button 
                      onClick={() => setMobileMenuOpen(true)}
                      className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-[#F8FAFC] text-[#0F172A]"
                    >
                      <List className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-bold text-now-primary bg-now-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">
                      Lesson {activeLesson.order}
                    </span>
                    <span className="text-sm text-[#64748B] font-medium hidden sm:inline">{activeLesson.category}</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 text-[#0F172A] leading-tight">
                    {activeLesson.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                    <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-2 rounded-lg text-[#0F172A]">
                      <Clock className="w-4 h-4 text-[#64748B]" />
                      <span>{activeLesson.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-500/10 text-green-700 border border-green-500/20 px-4 py-2 rounded-lg">
                      <Award className="w-4 h-4" />
                      <span>{activeLesson.difficulty}</span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-slate prose-lg max-w-none text-[#0F172A] leading-loose">
                   <Markdown
                     options={{
                       overrides: {
                         h2: {
                           component: CustomH2
                         }
                       }
                     }}
                   >
                     {contentToRender}
                   </Markdown>
                </div>

                <div className="mt-32 pt-10 border-t border-[#E2E8F0] flex items-center justify-between">
                   <button 
                     onClick={goToPrevLesson}
                     disabled={currentIndex === 0}
                     className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                       currentIndex === 0 
                         ? "opacity-50 cursor-not-allowed text-[#64748B] bg-[#F8FAFC]" 
                         : "bg-[#FFFFFF] text-[#0F172A] border border-[#E2E8F0] shadow-sm hover:bg-[#F8FAFC] hover:border-now-primary"
                     }`}
                   >
                     <ChevronLeft className="w-5 h-5" /> Previous Lesson
                   </button>
                   
                   <button 
                     onClick={(e) => {
                        if(!completedLessons[activeLesson.id]) {
                           setCompletedLessons(prev => ({ ...prev, [activeLesson.id]: true }));
                        }
                        goToNextLesson();
                     }}
                     disabled={currentIndex === allLessons.length - 1}
                     className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-sm ${
                       currentIndex === allLessons.length - 1
                         ? "opacity-50 cursor-not-allowed text-gray-500 bg-gray-100" 
                         : "bg-now-primary text-white hover:bg-now-accent"
                     }`}
                   >
                     Complete & Continue <IconNext className="w-5 h-5" />
                   </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden xl:flex w-72 flex-shrink-0 border-l border-[#E2E8F0] bg-[#FFFFFF] flex-col z-10 h-full overflow-hidden">
          <div className="p-6 pb-4">
            <h3 className="font-bold text-[#0F172A] uppercase tracking-widest text-xs">On This Page</h3>
          </div>
          <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-2 custom-scrollbar">
            {activeLesson.subtopics && activeLesson.subtopics.map(sub => (
               <button 
                 key={sub.id}
                 onClick={() => scrollToSubtopic(sub.id)}
                 className={`block text-left text-sm transition-all w-full border-l-2 pl-4 py-2 ${
                   activeSubtopicId === sub.id 
                     ? "border-now-primary text-now-primary font-bold bg-now-primary/5" 
                     : "border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:border-[#64748B]"
                 }`}
               >
                 {sub.title}
               </button>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #CBD5E1;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #94A3B8;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
