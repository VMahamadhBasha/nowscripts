const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../client/src/content');
const learnDir = path.join(contentDir, 'learn');
const interviewPrepDir = path.join(contentDir, 'interview-prep');

// Create learn and interview-prep directories
if (!fs.existsSync(learnDir)) {
  fs.mkdirSync(learnDir, { recursive: true });
}
if (!fs.existsSync(interviewPrepDir)) {
  fs.mkdirSync(interviewPrepDir, { recursive: true });
}

// Move existing folders into learn/
const existingFolders = ['administration', 'advanced-itsm', 'development', 'fundamentals', 'itsm', 'workflow'];
for (const folder of existingFolders) {
  const oldPath = path.join(contentDir, folder);
  const newPath = path.join(learnDir, folder);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${folder} to learn/${folder}`);
  }
}

// Define Interview Prep Structure
const interviewStructure = {
  'servicenow-basics': [
    'what-is-servicenow.md',
    'architecture.md',
    'cloud-computing.md',
    'multi-tenant-architecture.md'
  ],
  'itsm-fundamentals': [
    'incident-management.md',
    'problem-management.md',
    'change-management.md'
  ],
  'administration': [
    'users-groups-roles.md',
    'acl.md',
    'notifications.md'
  ],
  'development': [
    'client-scripts.md',
    'business-rules.md',
    'script-includes.md',
    'glide-record.md'
  ],
  'integrations': [
    'rest-api.md',
    'soap-api.md'
  ],
  'flow-designer': [
    'flow-designer-basics.md',
    'approvals.md'
  ],
  'cmdb-discovery': [
    'cmdb-basics.md',
    'discovery.md'
  ],
  'scenario-questions': [
    'top-scenario-questions.md'
  ],
  'csa': [
    'top-100-csa-questions.md',
    'csa-scenarios.md'
  ],
  'cad': [
    'top-100-cad-questions.md',
    'cad-scenarios.md'
  ],
  'hr': [
    'hr-questions.md'
  ],
  'interview-experiences': [
    'tcs.md',
    'infosys.md',
    'accenture.md'
  ],
  'mock-interviews': [
    'admin-mock.md',
    'developer-mock.md'
  ]
};

// Generate folders and placeholder files
for (const [folder, files] of Object.entries(interviewStructure)) {
  const folderPath = path.join(interviewPrepDir, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    if (!fs.existsSync(filePath)) {
      const title = file.replace('.md', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      const content = `---
title: "${title}"
---

# ${title}

## Overview

Content coming soon...

## Interview Questions

Content coming soon...

## Scenario Questions

Content coming soon...
`;
      fs.writeFileSync(filePath, content);
      console.log(`Created ${folder}/${file}`);
    }
  }
}

console.log("Interview Prep architecture successfully generated.");
