const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'content');

const folders = {
  'fundamentals': [
    { title: 'Cloud Computing Basics', file: 'cloud-computing.md' },
    { title: 'Introduction to ITIL', file: 'itil-foundation.md' },
    { title: 'ServiceNow Overview & Introduction', file: 'servicenow-overview.md' },
    { title: 'PDI Account Creation', file: 'pdi-account-creation.md' },
    { title: 'User Interface', file: 'user-interface.md' },
    { title: 'Forms', file: 'forms.md' },
    { title: 'Formatters', file: 'formatters.md' },
    { title: 'Lists', file: 'lists.md' },
    { title: 'Plugins', file: 'plugins.md' },
    { title: 'Tables, Fields & Columns', file: 'tables-fields-columns.md' },
    { title: 'User Administration', file: 'user-administration.md' },
  ],
  'itsm': [
    { title: 'Incident Management Lifecycle', file: 'incident-management.md' },
    { title: 'Data Lookup Rules', file: 'data-lookup-rules.md' },
    { title: 'Assignment Lookup Rules', file: 'assignment-lookup-rules.md' },
    { title: 'UI Policy', file: 'ui-policy.md' },
    { title: 'Data Policy', file: 'data-policy.md' },
    { title: 'Metrics', file: 'metrics.md' },
    { title: 'Related Lists', file: 'related-lists.md' },
    { title: 'Service Level Management', file: 'service-level-management.md' },
    { title: 'Import Sets', file: 'import-sets.md' },
    { title: 'Update Sets', file: 'update-sets.md' },
    { title: 'Service Catalog', file: 'service-catalog.md' },
  ],
  'workflow': [
    { title: 'Workflow', file: 'workflow.md' },
    { title: 'Execution Plan', file: 'execution-plan.md' },
    { title: 'Reports & Dashboards', file: 'reports-dashboards.md' },
  ],
  'administration': [
    { title: 'Access Control Lists', file: 'access-control-lists.md' },
    { title: 'Email Notifications', file: 'email-notifications.md' },
    { title: 'MID Server', file: 'mid-server.md' },
    { title: 'Cloning Instance', file: 'cloning-instance.md' },
  ],
  'advanced-itsm': [
    { title: 'Major Incident Management', file: 'major-incident-management.md' },
    { title: 'Problem Management', file: 'problem-management.md' },
    { title: 'Change Management', file: 'change-management.md' },
    { title: 'Knowledge Management', file: 'knowledge-management.md' },
  ],
  'development': [
    { title: 'JavaScript Fundamentals', file: 'javascript-fundamentals.md' },
    { title: 'Glide APIs', file: 'glide-apis.md' },
    { title: 'Client Scripts', file: 'client-scripts.md' },
    { title: 'UI Actions', file: 'ui-actions.md' },
    { title: 'Business Rules', file: 'business-rules.md' },
    { title: 'UI Scripts', file: 'ui-scripts.md' },
    { title: 'Scheduled Jobs', file: 'scheduled-jobs.md' },
    { title: 'Script Includes', file: 'script-includes.md' },
    { title: 'Glide Ajax', file: 'glide-ajax.md' },
    { title: 'Inbound Email Actions', file: 'inbound-email-actions.md' },
    { title: 'Outbound Email Actions', file: 'outbound-email-actions.md' },
    { title: 'Transform Event Scripts', file: 'transform-event-scripts.md' },
    { title: 'Flow Designer', file: 'flow-designer.md' },
    { title: 'IntegrationHub', file: 'integrationhub.md' },
    { title: 'REST APIs', file: 'rest-apis.md' },
    { title: 'Scripted REST APIs', file: 'scripted-rest-apis.md' },
    { title: 'Advanced Development', file: 'advanced-development.md' },
  ]
};

// Map nicely formatted section titles
const sectionNames = {
  'fundamentals': 'ServiceNow Fundamentals',
  'itsm': 'ITSM Module',
  'workflow': 'Workflow & Reporting',
  'administration': 'Administration & Security',
  'advanced-itsm': 'Advanced ITSM',
  'development': 'Development Track'
};

let globalOrder = 1;

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

for (const [folder, files] of Object.entries(folders)) {
  const folderPath = path.join(baseDir, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  files.forEach((fileObj, index) => {
    const filePath = path.join(folderPath, fileObj.file);
    const content = `---
title: ${fileObj.title}
duration: 45 mins
difficulty: Beginner
category: ${sectionNames[folder]}
order: ${globalOrder++}
tags:
  - ServiceNow
  - ${folder}
---

# ${fileObj.title}

## Introduction to ${fileObj.title}

Content coming soon...

## Deep Dive

Content coming soon...

## Summary

Content coming soon...
`;
    fs.writeFileSync(filePath, content);
  });
}

console.log('Markdown files generated successfully!');
