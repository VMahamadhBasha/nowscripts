const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../client/src/pages/InterviewPrepDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replacements
content = content.replace(/import \{ courseData/g, 'import { interviewData');
content = content.replace(/courseData/g, 'interviewData');
content = content.replace(/LearnDashboard/g, 'InterviewPrepDashboard');
content = content.replace(/\/learn\//g, '/interview-prep/');
content = content.replace(/Learn - NowScripts/g, 'Interview Prep - NowScripts');
content = content.replace(/Learning Path/g, 'Interview Prep Path');
content = content.replace(/Interactive ServiceNow Curriculum/g, 'Interactive ServiceNow Interview Preparation');
content = content.replace(/Start your journey from beginner to expert/g, 'Prepare for admin, developer, and CSA/CAD interviews');
content = content.replace(/Back to Dashboard/g, 'Back to Hub');

fs.writeFileSync(filePath, content);
console.log('Successfully updated InterviewPrepDashboard.tsx');
