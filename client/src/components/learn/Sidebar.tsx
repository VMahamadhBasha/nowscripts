import React from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, CheckCircle2, Circle } from "lucide-react";

export default function Sidebar({ courses, completedModules }: { courses: any[], completedModules: string[] }) {
  const { moduleId } = useParams();

  return (
    <aside className="w-80 bg-[#FFFFFF] border-r border-[#E2E8F0] h-screen overflow-y-auto sticky top-0 hide_scroll">
      <div className="p-6">
        <Link to="/learn" className="text-now-primary hover:text-now-accent font-bold text-lg mb-8 flex items-center">
          ← Back to Dashboard
        </Link>
        
        <div className="space-y-8 mt-8">
          {courses.map((course: any) => (
            <div key={course._id}>
              <h3 className="text-xs font-bold text-now-muted uppercase tracking-wider mb-4 px-2">
                {course.title}
              </h3>
              <ul className="space-y-1">
                {course.modules.map((mod: any) => {
                  const isActive = mod._id === moduleId;
                  const isCompleted = completedModules.includes(mod._id);
                  
                  return (
                    <li key={mod._id}>
                      <Link
                        to={`/learn/${mod._id}`}
                        className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive 
                            ? "bg-now-primary/10 text-now-primary font-medium" 
                            : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 mr-3 text-now-primary shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 mr-3 text-[#64748B]/50 shrink-0" />
                        )}
                        <span className="truncate">{mod.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
