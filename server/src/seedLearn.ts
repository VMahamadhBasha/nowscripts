import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Course from "./models/course";
import Module from "./models/module";
import Lesson from "./models/lesson";
import Quiz from "./models/quiz";

dotenv.config();

const beginnerModules = [
  "Cloud Computing Basics",
  "ITIL Foundation",
  "ServiceNow Introduction",
  "PDI Account Creation",
  "User Interface",
  "Forms",
  "Lists",
  "Formatters",
  "Plugins",
  "Tables & Fields",
  "User Administration"
];

const intermediateModules = [
  "Incident Management",
  "Data Lookup Rules",
  "Assignment Rules",
  "UI Policies",
  "Data Policies",
  "Metrics",
  "Related Lists",
  "Service Level Management",
  "Import Sets",
  "Update Sets",
  "Service Catalog"
];

const advancedModules = [
  "Workflow",
  "Reports & Dashboards",
  "ACL",
  "Email Notifications",
  "MID Server",
  "Cloning",
  "Problem Management",
  "Major Incident Management",
  "Change Management",
  "Knowledge Management"
];

async function seedLearn() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/medium");
    console.log("Connected to MongoDB");

    // Clear existing
    await Course.deleteMany({});
    await Module.deleteMany({});
    await Lesson.deleteMany({});
    await Quiz.deleteMany({});
    console.log("Cleared existing learn collections");

    const tracks = [
      { title: "Beginner Track", level: "Beginner", modules: beginnerModules },
      { title: "Intermediate Track", level: "Intermediate", modules: intermediateModules },
      { title: "Advanced Track", level: "Advanced", modules: advancedModules }
    ];

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      const newCourse = await Course.create({
        title: track.title,
        description: `Learn the ${track.level} concepts of ServiceNow.`,
        level: track.level,
        order: i,
        modules: []
      });

      const courseModules = [];

      for (let j = 0; j < track.modules.length; j++) {
        const modTitle = track.modules[j];
        
        const newModule = await Module.create({
          courseId: newCourse._id,
          title: modTitle,
          description: `Comprehensive overview of ${modTitle}`,
          learningObjectives: [`Understand ${modTitle}`, `Apply ${modTitle} in real scenarios`],
          estimatedTime: "45 mins",
          difficulty: track.level,
          order: j
        });

        courseModules.push(newModule._id);

        // Create a dummy lesson
        await Lesson.create({
          moduleId: newModule._id,
          contentMarkdown: `## Welcome to ${modTitle}\n\nThis is the markdown content for ${modTitle}. \n\n### Key Concepts\n- Concept 1\n- Concept 2\n\n\`\`\`javascript\n// Sample ServiceNow Script\nvar gr = new GlideRecord('incident');\ngr.query();\n\`\`\`\n`,
          codeExamples: [{ title: "GlideRecord Example", code: "var gr = new GlideRecord('incident');", language: "javascript" }],
          resources: [{ title: "ServiceNow Docs", url: "https://docs.servicenow.com" }]
        });

        // Create a dummy quiz
        await Quiz.create({
          moduleId: newModule._id,
          questions: [
            {
              questionText: `What is the primary purpose of ${modTitle}?`,
              options: ["Option A", "Option B", "Option C", "Option D"],
              correctOptionIndex: 0,
              explanation: "Option A is correct because it directly relates to the core functionality."
            }
          ]
        });
      }

      newCourse.modules = courseModules as any;
      await newCourse.save();
      console.log(`Created ${track.title} with ${track.modules.length} modules.`);
    }

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedLearn();
