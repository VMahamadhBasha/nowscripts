import mongoose from "mongoose";
import dotenv from "dotenv";
import Roadmap from "./models/roadmap";
import RoadmapModule from "./models/RoadmapModule";

dotenv.config();

const roadmaps = [
  {
    title: "ServiceNow Fundamentals",
    slug: "fundamentals",
    description: "Foundation Knowledge of the Now Platform.",
    difficulty: "Beginner",
    estimatedDuration: "2 Weeks",
    certification: "Platform Baseline",
    order: 1,
    modules: [
      { title: "Platform Introduction", description: "Learn the basics of ServiceNow UI and architecture.", estimatedTime: "2h", order: 1 },
      { title: "Navigation & Lists", description: "Master navigating the platform and list views.", estimatedTime: "1h", order: 2 },
      { title: "Forms & Filters", description: "Create and use forms, configure filters.", estimatedTime: "1.5h", order: 3 },
      { title: "Users, Groups & Roles", description: "Understand user administration basics.", estimatedTime: "2h", order: 4 },
    ]
  },
  {
    title: "ITSM Module",
    slug: "itsm",
    description: "Learn Incident, Problem, and Change Management.",
    difficulty: "Beginner",
    estimatedDuration: "3 Weeks",
    certification: "ITSM Understanding",
    order: 2,
    modules: [
      { title: "Incident Management", description: "Manage incident lifecycles.", estimatedTime: "3h", order: 1 },
      { title: "Problem Management", description: "Root cause analysis process.", estimatedTime: "2h", order: 2 },
      { title: "Change Management", description: "Standard, Normal, and Emergency changes.", estimatedTime: "4h", order: 3 },
      { title: "CMDB Basics", description: "Configuration Management Database introduction.", estimatedTime: "2h", order: 4 },
    ]
  },
  {
    title: "Administration",
    slug: "administration",
    description: "Become a ServiceNow System Administrator.",
    difficulty: "Intermediate",
    estimatedDuration: "4 Weeks",
    certification: "CSA",
    order: 3,
    modules: [
      { title: "User Administration", description: "Advanced user and role management.", estimatedTime: "2h", order: 1 },
      { title: "ACL", description: "Access Control Lists security rules.", estimatedTime: "4h", order: 2 },
      { title: "Notifications", description: "Email and SMS notifications.", estimatedTime: "2h", order: 3 },
      { title: "Import Sets & Update Sets", description: "Moving data and code between instances.", estimatedTime: "3h", order: 4 },
    ]
  },
  {
    title: "ServiceNow Development",
    slug: "development",
    description: "Start scripting and developing on the platform.",
    difficulty: "Intermediate",
    estimatedDuration: "5 Weeks",
    certification: "Developer Foundation",
    order: 4,
    modules: [
      { title: "GlideRecord", description: "Server-side database queries.", estimatedTime: "4h", order: 1 },
      { title: "Business Rules", description: "Server-side logic execution.", estimatedTime: "4h", order: 2 },
      { title: "Client Scripts & UI Policies", description: "Client-side behavior.", estimatedTime: "3h", order: 3 },
      { title: "Script Includes", description: "Reusable server-side script libraries.", estimatedTime: "4h", order: 4 },
    ]
  },
  {
    title: "Workflow & Automation",
    slug: "workflow-automation",
    description: "Automate processes with Flow Designer.",
    difficulty: "Intermediate",
    estimatedDuration: "3 Weeks",
    certification: "Process Automation Specialist",
    order: 5,
    modules: [
      { title: "Flow Designer", description: "Build flows without code.", estimatedTime: "4h", order: 1 },
      { title: "Integration Hub", description: "Connect to third-party APIs.", estimatedTime: "3h", order: 2 },
      { title: "Workflow Editor", description: "Legacy workflow automation.", estimatedTime: "2h", order: 3 },
    ]
  },
  {
    title: "CMDB & Discovery",
    slug: "cmdb-discovery",
    description: "Master IT Operations Management foundations.",
    difficulty: "Advanced",
    estimatedDuration: "4 Weeks",
    certification: "CIS Discovery",
    order: 6,
    modules: [
      { title: "Discovery Basics", description: "Set up schedules and credentials.", estimatedTime: "4h", order: 1 },
      { title: "MID Server", description: "Install and configure MID servers.", estimatedTime: "2h", order: 2 },
      { title: "Identification & Reconciliation", description: "Prevent duplicate CIs.", estimatedTime: "3h", order: 3 },
    ]
  },
  {
    title: "Integrations",
    slug: "integrations",
    description: "Connect ServiceNow to the world.",
    difficulty: "Advanced",
    estimatedDuration: "4 Weeks",
    certification: "Integration Specialist",
    order: 7,
    modules: [
      { title: "REST APIs", description: "Inbound and outbound REST.", estimatedTime: "4h", order: 1 },
      { title: "SOAP APIs", description: "Legacy XML integrations.", estimatedTime: "2h", order: 2 },
      { title: "LDAP & Azure AD", description: "Directory service integrations.", estimatedTime: "3h", order: 3 },
    ]
  },
  {
    title: "Advanced Development",
    slug: "advanced-development",
    description: "Master scoped apps and Service Portal.",
    difficulty: "Expert",
    estimatedDuration: "6 Weeks",
    certification: "CAD",
    order: 8,
    modules: [
      { title: "Service Portal", description: "Build custom portals.", estimatedTime: "5h", order: 1 },
      { title: "Widgets", description: "AngularJS widget development.", estimatedTime: "5h", order: 2 },
      { title: "Scoped Applications", description: "Build full custom apps from scratch.", estimatedTime: "6h", order: 3 },
    ]
  },
  {
    title: "Security & Governance",
    slug: "security-governance",
    description: "Secure instances and maintain compliance.",
    difficulty: "Expert",
    estimatedDuration: "3 Weeks",
    certification: "Platform Governance Expert",
    order: 9,
    modules: [
      { title: "Domain Separation", description: "Multi-tenant architecture.", estimatedTime: "4h", order: 1 },
      { title: "Instance Security", description: "Hardening your ServiceNow instance.", estimatedTime: "3h", order: 2 },
    ]
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/medium");
    console.log("Connected to MongoDB for Roadmap Seeding");

    await Roadmap.deleteMany({});
    await RoadmapModule.deleteMany({});
    
    console.log("Cleared existing roadmaps...");

    for (const r of roadmaps) {
      const { modules, ...roadmapData } = r;
      const createdRoadmap = await Roadmap.create(roadmapData);
      
      const moduleDocs = modules.map(m => ({
        ...m,
        roadmapId: createdRoadmap._id,
      }));
      
      await RoadmapModule.insertMany(moduleDocs);
      console.log(`Seeded roadmap: ${r.title}`);
    }

    console.log("Roadmap Data successfully seeded!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding roadmaps:", error);
    process.exit(1);
  }
};

seedData();
