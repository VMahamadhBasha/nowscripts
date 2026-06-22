export const mockCourses = [
  {
    _id: "course_1",
    title: "Beginner Track",
    description: "Learn the Beginner concepts of ServiceNow.",
    level: "Beginner",
    modules: [
      "Cloud Computing Basics", "ITIL Foundation", "ServiceNow Introduction", "PDI Account Creation", "User Interface", "Forms", "Lists", "Formatters", "Plugins", "Tables & Fields", "User Administration"
    ].map((title, i) => ({ _id: `mod_beg_${i}`, title, description: `Comprehensive overview of ${title}` }))
  },
  {
    _id: "course_2",
    title: "Intermediate Track",
    description: "Learn the Intermediate concepts of ServiceNow.",
    level: "Intermediate",
    modules: [
       "Incident Management", "Data Lookup Rules", "Assignment Rules", "UI Policies", "Data Policies", "Metrics", "Related Lists", "Service Level Management", "Import Sets", "Update Sets", "Service Catalog"
    ].map((title, i) => ({ _id: `mod_int_${i}`, title, description: `Comprehensive overview of ${title}` }))
  },
  {
    _id: "course_3",
    title: "Advanced Track",
    description: "Learn the Advanced concepts of ServiceNow.",
    level: "Advanced",
    modules: [
      "Workflow", "Reports & Dashboards", "ACL", "Email Notifications", "MID Server", "Cloning", "Problem Management", "Major Incident Management", "Change Management", "Knowledge Management"
    ].map((title, i) => ({ _id: `mod_adv_${i}`, title, description: `Comprehensive overview of ${title}` }))
  }
];

export const mockStats = {
  data: {
    completedModules: ["mod_beg_0", "mod_beg_1"],
    learningStreak: 3,
    learningHours: 5,
    certificatesEarned: []
  }
};

export const getMockModule = (moduleId: string) => {
  let foundCourse = null;
  let foundModule = null;

  for (const course of mockCourses) {
    const mod = course.modules.find(m => m._id === moduleId);
    if (mod) {
      foundCourse = course;
      foundModule = mod;
      break;
    }
  }

  if (!foundModule) return null;

  return {
    module: {
      ...foundModule,
      courseId: { title: foundCourse?.title },
      difficulty: foundCourse?.level,
      estimatedTime: "45 mins",
      learningObjectives: [`Understand ${foundModule.title}`, `Apply ${foundModule.title} in real scenarios`]
    },
    lesson: {
      contentMarkdown: `## Welcome to ${foundModule.title}\n\nThis is the markdown content for ${foundModule.title}. \n\n### Key Concepts\n- Concept 1\n- Concept 2\n\n\`\`\`javascript\n// Sample ServiceNow Script\nvar gr = new GlideRecord('incident');\ngr.query();\n\`\`\`\n`,
      codeExamples: [{ title: "GlideRecord Example", code: "var gr = new GlideRecord('incident');", language: "javascript" }]
    },
    quiz: {
      _id: "mock_quiz_1",
      moduleId: foundModule._id,
      questions: [
        {
          _id: "q_1",
          questionText: `What is the primary purpose of ${foundModule.title}?`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctOptionIndex: 0,
          explanation: "Option A is correct because it directly relates to the core functionality."
        }
      ]
    }
  };
};
