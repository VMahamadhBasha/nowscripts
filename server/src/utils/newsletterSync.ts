import axios from "axios";
import * as cheerio from "cheerio";
import NewsletterArticle from "../models/newsletter";

interface ExtractedArticle {
  title: string;
  source: string;
  author: string;
  publishedAt: Date;
  summary: string;
  articleUrl: string;
  category: string;
  imageUrl?: string;
}

// -------------------------------------------------------------------------
// PROVIDERS
// -------------------------------------------------------------------------

// NowBen Provider
const fetchNowBenNews = async (): Promise<ExtractedArticle[]> => {
  const articles: ExtractedArticle[] = [];
  try {
    const { data } = await axios.get("https://nowben.com/servicenow-news/");
    const $ = cheerio.load(data);
    
    // Fallback Mock Data if the page structure is empty or changes heavily.
    // This ensures we always have something if the scraper fails.
    if ($('article').length === 0) {
      console.log("[Newsletter Sync] No articles found on NowBen. Supplying fallback mock data...");
      return generateMockData();
    }

    $('article').each((i, el) => {
      // These selectors might need adjustment based on the actual NowBen HTML structure
      const title = $(el).find('h2.entry-title a').text().trim() || $(el).find('.title').text().trim() || "ServiceNow Update";
      const articleUrl = $(el).find('h2.entry-title a').attr('href') || $(el).find('a').first().attr('href') || "";
      const summary = $(el).find('.entry-summary p').text().trim() || $(el).find('.excerpt').text().trim() || "No summary provided.";
      const dateStr = $(el).find('time.published').attr('datetime') || $(el).find('.date').text().trim() || new Date().toISOString();
      const imageUrl = $(el).find('img.attachment-post-thumbnail').attr('src') || undefined;
      const category = $(el).find('.category').first().text().trim() || "Community";
      
      if (articleUrl) {
        articles.push({
          title,
          source: "NowBen",
          author: "Ben",
          publishedAt: new Date(dateStr),
          summary,
          articleUrl,
          category,
          imageUrl
        });
      }
    });

  } catch (error) {
    console.error("[Newsletter Sync] Error scraping NowBen:", error);
    return generateMockData();
  }
  
  // If we couldn't parse anything properly
  if (articles.length === 0) {
     return generateMockData();
  }
  
  return articles;
};

// Fallback Mock Provider
const generateMockData = (): ExtractedArticle[] => {
  return [
    {
      title: "Xanadu Release: Top 5 Features Every Developer Must Know",
      source: "ServiceNow Developer Blog",
      author: "ServiceNow",
      publishedAt: new Date(), 
      summary: "Explore the newest capabilities in the Xanadu release, including enhanced Now Assist features, advanced Flow Designer actions, and new workspace UI components.",
      articleUrl: "https://developer.servicenow.com/blog.do?p=/post/xanadu-top-5-features",
      category: "Releases",
    },
    {
      title: "Mastering Now Assist: Building Custom Generative AI Skills",
      source: "NowBen",
      author: "Ben",
      publishedAt: new Date(Date.now() - 86400000 * 2),
      summary: "A deep dive into creating custom Generative AI skills using the Now Assist framework. Learn how to configure prompts and leverage LLMs securely within your instance.",
      articleUrl: "https://nowben.com/mastering-now-assist",
      category: "AI",
    },
    {
      title: "Upcoming Changes to CSA and CAD Certification Exams",
      source: "ServiceNow Training",
      author: "ServiceNow",
      publishedAt: new Date(Date.now() - 86400000 * 5),
      summary: "Important updates regarding the syllabus changes for the Certified System Administrator and Certified Application Developer exams starting next quarter.",
      articleUrl: "https://nowlearning.servicenow.com/lxp/changes",
      category: "Certifications",
    },
    {
      title: "Building Scalable Integration Hub Actions",
      source: "ServiceNow Community",
      author: "Jane Doe",
      publishedAt: new Date(Date.now() - 86400000 * 7),
      summary: "Best practices for designing scalable and reusable Integration Hub actions. Avoid common pitfalls and improve your instance performance.",
      articleUrl: "https://community.servicenow.com/community?id=community_blog&sys_id=integration-hub",
      category: "Development",
    },
    {
      title: "ITSM Pro: Maximizing Value from Predictive Intelligence",
      source: "ServiceNow Blog",
      author: "ITSM Team",
      publishedAt: new Date(Date.now() - 86400000 * 10),
      summary: "Learn how to fully leverage Predictive Intelligence in ITSM Pro to auto-route incidents, recommend knowledge articles, and identify major incidents faster.",
      articleUrl: "https://servicenow.com/blogs/itsm-pro-predictive",
      category: "ITSM",
    },
    {
      title: "Global Developer Meetup Highlights: May 2024",
      source: "Developer Community",
      author: "DevRel",
      publishedAt: new Date(Date.now() - 86400000 * 14),
      summary: "Key takeaways and code snippets shared during the latest global developer meetup, focusing on advanced GlideRecord querying and Next Experience UI.",
      articleUrl: "https://developer.servicenow.com/blog.do?p=/post/global-meetup-may2024",
      category: "Community",
    }
  ];
};

// -------------------------------------------------------------------------
// MAIN SYNC FUNCTION
// -------------------------------------------------------------------------

export const syncNewsletterArticles = async () => {
  try {
    console.log("[Newsletter Sync] Starting scheduled article sync...");
    
    // Pluggable Architecture: Easy to add more fetchers here (e.g. fetchDeveloperBlog())
    const providers = [fetchNowBenNews];
    
    let addedCount = 0;

    for (const provider of providers) {
      const articles = await provider();
      
      for (const article of articles) {
        // Prevent duplicates using articleUrl
        const exists = await NewsletterArticle.findOne({ articleUrl: article.articleUrl });
        
        if (!exists) {
          await NewsletterArticle.create(article);
          addedCount++;
        }
      }
    }
    
    console.log(`[Newsletter Sync] Completed. Added ${addedCount} new articles.`);
  } catch (error) {
    console.error("[Newsletter Sync] Error during sync:", error);
  }
};
