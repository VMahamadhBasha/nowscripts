import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRight, Calendar, ExternalLink, Flame, BookOpen, Settings, Users, Sparkles, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Article {
  _id: string;
  title: string;
  source: string;
  author?: string;
  publishedAt: string;
  summary: string;
  articleUrl: string;
  category: string;
  imageUrl?: string;
}

const fetchLatestArticles = async (): Promise<Article[]> => {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/newsletter?limit=4`);
  return response.data.articles || response.data; // Handle both paginated and non-paginated responses
};

const getCategoryIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case "releases": return <Settings className="w-4 h-4" />;
    case "ai": return <Sparkles className="w-4 h-4 text-purple-400" />;
    case "certifications": return <BookOpen className="w-4 h-4" />;
    case "community": return <Users className="w-4 h-4" />;
    default: return <Flame className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category?.toLowerCase()) {
    case "releases": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "ai": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "certifications": return "bg-[#00C9A7]/10 text-[#00C9A7] border-[#00C9A7]/20";
    case "community": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  }
};

export function ServiceNowPulse() {
  const { data: articles = [], isLoading, isError } = useQuery<Article[]>({
    queryKey: ["latestNewsletterArticles"],
    queryFn: fetchLatestArticles,
  });

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const latestArticles = articles.length > 1 ? articles.slice(1, 4) : []; // Up to 3 latest

  return (
    <section className="py-32 bg-[#020617] relative z-10 border-t border-[rgba(255,255,255,0.05)]">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] -translate-y-1/2 z-0 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111827] border border-[rgba(255,255,255,0.08)] text-[#00E5FF] text-sm font-semibold tracking-wide uppercase mb-6"
            >
              <Flame className="w-4 h-4 text-[#00E5FF]" />
              The Latest Updates
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
            >
              ServiceNow <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-blue-500">Pulse</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#94A3B8] leading-relaxed"
            >
              Stay updated with the latest ServiceNow releases, certifications, AI innovations, developer updates, and community news.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/newsletter"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#020617] font-bold hover:bg-gray-200 transition-colors whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              View All News <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 h-[500px] bg-[#0F172A]/40 rounded-3xl animate-pulse border border-[rgba(255,255,255,0.05)]"></div>
            <div className="lg:col-span-5 flex flex-col gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-[#0F172A]/40 rounded-2xl animate-pulse border border-[rgba(255,255,255,0.05)]"></div>
              ))}
            </div>
          </div>
        ) : isError || articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-[#0F172A]/40 rounded-3xl border border-[rgba(255,255,255,0.05)]">
            <AlertCircle className="w-12 h-12 text-[#64748B] mb-4" />
            <p className="text-lg font-medium text-[#94A3B8]">ServiceNow Pulse is updating. Check back shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Featured Article */}
            {featuredArticle && (
              <motion.article 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 group relative bg-[#0F172A]/60 backdrop-blur-md border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] rounded-3xl flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 min-h-[400px]"
              >
                {featuredArticle.imageUrl && (
                  <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                    <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent"></div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020617]/80 pointer-events-none z-0"></div>
                
                <div className="p-8 md:p-12 flex flex-col h-full relative z-10 justify-end">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getCategoryColor(featuredArticle.category)}`}>
                      {getCategoryIcon(featuredArticle.category)}
                      {featuredArticle.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#94A3B8]">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-[#00E5FF] transition-colors line-clamp-3">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-[#94A3B8] text-lg mb-8 line-clamp-3 leading-relaxed">
                    {featuredArticle.summary}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-[rgba(255,255,255,0.08)]">
                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <span className="font-bold text-white">{featuredArticle.source}</span>
                      {featuredArticle.author && <span>by {featuredArticle.author}</span>}
                    </div>
                    <a 
                      href={featuredArticle.articleUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-bold text-[#00E5FF] hover:text-white transition-colors"
                    >
                      Read Article <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Latest Articles Sidebar */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {latestArticles.map((article, idx) => (
                <motion.article 
                  key={article._id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-[#0F172A]/40 backdrop-blur-sm border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[#0F172A]/80 rounded-2xl p-6 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[10px] uppercase tracking-wider font-bold ${getCategoryColor(article.category).split(' ')[1]}`}>
                      {article.category}
                    </span>
                    <span className="text-[10px] text-[#64748B] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-[#00E5FF] transition-colors line-clamp-2">
                    <a href={article.articleUrl} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </h4>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-[#94A3B8] font-medium">{article.source}</span>
                    <a 
                      href={article.articleUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#64748B] group-hover:text-[#00E5FF] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
              
              {/* Fallback if less than 3 latest articles */}
              {latestArticles.length < 3 && articles.length > 0 && (
                <div className="flex-1 min-h-[120px] rounded-2xl border border-dashed border-[rgba(255,255,255,0.1)] flex items-center justify-center">
                  <p className="text-sm text-[#64748B]">More updates coming soon...</p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
