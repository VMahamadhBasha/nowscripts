// Types for parsed markdown data
export type Subtopic = {
  id: string;      // The auto-generated hash id for the subtopic heading
  title: string;   // The heading title
  content: string; // The markdown content below the heading (optional, as we render the whole file)
};

export type LessonData = {
  id: string;      // Based on slug
  slug: string;    // filename without .md
  categorySlug: string; // folder name
  title: string;
  category: string;
  duration: string; // Used for readingTime now
  readingTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  order: number;
  tags: string[];
  description?: string;
  lastUpdated?: string;
  author?: string;
  subtopics: Subtopic[];
  rawMarkdown: string; // The full markdown body used for rendering
};

export type CourseSection = {
  sectionTitle: string;
  lessons: LessonData[];
};

/**
 * Generates an ID from a string, e.g., "What is Cloud Computing" -> "what-is-cloud-computing"
 */
export function generateSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const LEARN_FOLDER_TO_CATEGORY: Record<string, string> = {
  'fundamentals': 'Fundamentals',
  'itsm': 'ITSM Module',
  'workflow': 'Workflow & Automation',
  'administration': 'Administration',
  'advanced-itsm': 'Advanced ITSM',
  'development': 'Development',
  'cmdb': 'CMDB & Discovery',
  'integrations': 'Integrations',
  'security': 'Security & Governance',
  'certifications': 'Certifications'
};

const INTERVIEW_FOLDER_TO_CATEGORY: Record<string, string> = {
  'servicenow-basics': 'ServiceNow Basics',
  'itsm-fundamentals': 'ITSM Fundamentals',
  'administration': 'Administration',
  'development': 'Development',
  'service-portal': 'Service Portal',
  'integrations': 'Integrations',
  'flow-designer': 'Flow Designer',
  'cmdb-discovery': 'CMDB & Discovery',
  'scenario-questions': 'Scenario-Based Questions',
  'csa': 'CSA Questions',
  'cad': 'CAD Questions',
  'hr': 'HR Questions',
  'interview-experiences': 'Real Interview Experiences',
  'mock-interviews': 'Mock Interviews'
};

/**
 * Parse a markdown file string to extract frontmatter, content, and headings
 */
function parseMarkdownFile(rawMd: string, filepath: string, type: 'learn' | 'interview'): LessonData | null {
  try {
    // 1. Extract frontmatter using regex
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = rawMd.match(frontmatterRegex);

    let frontmatter: Record<string, any> = {};
    let rawMarkdown = rawMd.trim();

    if (match) {
      const frontmatterStr = match[1];
      rawMarkdown = match[2].trim();

      // 2. Parse basic YAML frontmatter (key: value)
      const lines = frontmatterStr.split('\n');
      let currentArrayKey: string | null = null;

      for (const line of lines) {
        const arrayMatch = line.match(/^\s+-\s+(.+)$/);
        if (arrayMatch && currentArrayKey) {
          frontmatter[currentArrayKey].push(arrayMatch[1].trim());
          continue;
        }

        const keyValMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.+)$/);
        if (keyValMatch) {
          const key = keyValMatch[1].trim();
          const val = keyValMatch[2].trim();
          if (!val) {
            currentArrayKey = key;
            frontmatter[key] = [];
          } else {
            frontmatter[key] = isNaN(Number(val)) ? val : Number(val);
            currentArrayKey = null;
          }
        }
      }
    }

    // 3. Extract subtopics from ## headings
    const subtopics: Subtopic[] = [];
    const headingRegex = /^##\s+(.+)$/gm;
    let headingMatch;

    while ((headingMatch = headingRegex.exec(rawMarkdown)) !== null) {
      const rawTitle = headingMatch[1].trim();
      // Remove common markdown characters for cleaner TOC titles
      const cleanTitle = rawTitle.replace(/(\*\*|__|[*_`~])/g, '');
      subtopics.push({
        id: generateSlug(cleanTitle),
        title: cleanTitle,
        content: "" // We will let markdown-to-jsx render the full file
      });
    }

    // Extract category slug and file slug from filepath
    const pathParts = filepath.split('/');
    const filename = pathParts.pop() || '';
    const categorySlug = pathParts.pop() || '';
    const slug = filename.replace('.md', '');

    // Map folder slugs to formal category names
    let autoCategory = categorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    if (type === 'learn') {
       autoCategory = LEARN_FOLDER_TO_CATEGORY[categorySlug] || autoCategory;
    } else {
       autoCategory = INTERVIEW_FOLDER_TO_CATEGORY[categorySlug] || autoCategory;
    }
    
    // Calculate reading time based on 200 words per minute
    const wordCount = rawMarkdown.split(/\s+/).length;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    const readingTime = `${readingTimeMinutes} min read`;

    return {
      id: `${categorySlug}-${slug}`,
      slug,
      categorySlug,
      title: frontmatter.title || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      category: autoCategory,
      duration: readingTime, // Update duration to automatically use reading time
      readingTime: readingTime,
      difficulty: frontmatter.difficulty || 'Beginner',
      order: frontmatter.order || 999,
      tags: frontmatter.tags || [],
      description: frontmatter.description,
      lastUpdated: frontmatter.lastUpdated,
      author: frontmatter.author,
      subtopics,
      rawMarkdown
    };
  } catch (err) {
    console.error(`Failed to parse markdown file ${filepath}`, err);
    return null;
  }
}

const LEARN_ORDER = [
  "Fundamentals",
  "ITSM Module",
  "Workflow & Automation",
  "Administration",
  "Advanced ITSM",
  "Development",
  "CMDB & Discovery",
  "Integrations",
  "Security & Governance",
  "Certifications"
];

const INTERVIEW_ORDER = [
  "ServiceNow Basics",
  "ITSM Fundamentals",
  "Administration",
  "Development",
  "Service Portal",
  "Integrations",
  "Flow Designer",
  "CMDB & Discovery",
  "Scenario-Based Questions",
  "CSA Questions",
  "CAD Questions",
  "HR Questions",
  "Real Interview Experiences",
  "Mock Interviews"
];

/**
 * Loads and parses all markdown files to build the course tree
 */
export function getCourseData(type: 'learn' | 'interview' = 'learn'): CourseSection[] {
  // Vite feature to load all matching files as strings synchronously
  const modules = import.meta.glob('../content/**/*.md', { as: 'raw', eager: true });
  
  const allLessons: LessonData[] = [];

  for (const [filepath, rawMd] of Object.entries(modules)) {
    // Filter by type subdirectory
    const expectedDir = type === 'interview' ? '/interview-prep/' : `/${type}/`;
    if (!filepath.includes(expectedDir)) continue;

    const content = typeof rawMd === 'string' ? rawMd : (rawMd as any).default;
    const lesson = parseMarkdownFile(content, filepath, type);
    if (lesson) {
      allLessons.push(lesson);
    }
  }

  // Group by category
  const categoryMap = new Map<string, LessonData[]>();
  
  allLessons.forEach(lesson => {
    const cat = lesson.category;
    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, []);
    }
    categoryMap.get(cat)!.push(lesson);
  });

  const courseSections: CourseSection[] = [];
  
  categoryMap.forEach((lessons, sectionTitle) => {
    // Sort lessons within section by order
    lessons.sort((a, b) => a.order - b.order);
    courseSections.push({
      sectionTitle,
      lessons
    });
  });

  // Sort sections strictly based on the requested learning/interview path
  const categoryOrder = type === 'learn' ? LEARN_ORDER : INTERVIEW_ORDER;

  courseSections.sort((a, b) => {
    const idxA = categoryOrder.indexOf(a.sectionTitle);
    const idxB = categoryOrder.indexOf(b.sectionTitle);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.sectionTitle.localeCompare(b.sectionTitle); // Fallback to alphabetical for unmapped categories
  });

  return courseSections;
}

export const courseData = getCourseData('learn');
export const interviewData = getCourseData('interview');
