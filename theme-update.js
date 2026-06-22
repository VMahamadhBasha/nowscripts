const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'client/src/pages/LearnDashboard.tsx',
  'client/src/pages/InterviewPrepDashboard.tsx',
  'client/src/components/markdown/MarkdownRenderer.tsx',
  'client/src/components/markdown/FieldInfoCard.tsx',
  'client/src/components/markdown/Callout.tsx',
  'client/src/components/markdown/TableRenderer.tsx',
  'client/src/components/markdown/Lists.tsx',
  'client/src/components/markdown/HeadingRenderer.tsx',
];

const colorMap = {
  // Backgrounds
  'bg-\\[#FFFFFF\\]': 'bg-white dark:bg-slate-950',
  'bg-\\[#F8FAFC\\]': 'bg-slate-50 dark:bg-slate-900',
  'hover:bg-\\[#F8FAFC\\]': 'hover:bg-slate-50 dark:hover:bg-slate-900',
  'bg-\\[#E2E8F0\\]': 'bg-slate-200 dark:bg-slate-800',
  'hover:bg-\\[#E2E8F0\\]': 'hover:bg-slate-200 dark:hover:bg-slate-800',
  
  // Text
  'text-\\[#0F172A\\]': 'text-slate-900 dark:text-slate-100',
  'hover:text-\\[#0F172A\\]': 'hover:text-slate-900 dark:hover:text-slate-100',
  'text-\\[#64748B\\]': 'text-slate-500 dark:text-slate-400',
  'hover:text-\\[#64748B\\]': 'hover:text-slate-500 dark:hover:text-slate-400',
  'placeholder-\\[#64748B\\]': 'placeholder-slate-500 dark:placeholder-slate-400',
  
  // Borders
  'border-\\[#E2E8F0\\]': 'border-slate-200 dark:border-slate-800',
  'hover:border-\\[#E2E8F0\\]': 'hover:border-slate-200 dark:hover:border-slate-800',
  
  // Tailwind default grays -> dark mode slates
  '\\bbg-white\\b': 'bg-white dark:bg-slate-900', 
  '\\bbg-gray-50\\b': 'bg-slate-50 dark:bg-slate-800/50',
  '\\bbg-gray-100\\b': 'bg-slate-100 dark:bg-slate-800',
  '\\btext-gray-900\\b': 'text-slate-900 dark:text-slate-100',
  '\\btext-gray-800\\b': 'text-slate-800 dark:text-slate-200',
  '\\btext-gray-700\\b': 'text-slate-700 dark:text-slate-300',
  '\\btext-gray-600\\b': 'text-slate-600 dark:text-slate-400',
  '\\btext-gray-500\\b': 'text-slate-500 dark:text-slate-400',
  '\\btext-gray-400\\b': 'text-slate-400 dark:text-slate-500',
  '\\bborder-gray-200\\b': 'border-slate-200 dark:border-slate-800',
  '\\bborder-gray-100\\b': 'border-slate-100 dark:border-slate-800/50',
};

filesToUpdate.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping ${filePath} - not found`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Avoid double replacements (e.g. replacing already replaced tokens)
  // Since we run this once, it's fine.
  
  // Handle fractions manually before the generic replacements
  content = content.replace(/bg-\[\#F8FAFC\]\/50/g, 'bg-slate-50/50 dark:bg-slate-900/50');
  content = content.replace(/bg-\[\#E2E8F0\]\/50/g, 'bg-slate-200/50 dark:bg-slate-800/50');

  for (const [key, value] of Object.entries(colorMap)) {
    const regex = new RegExp(key, 'g');
    content = content.replace(regex, value);
  }

  // Also fix double bg-white (if we ran it multiple times by accident or there was a conflict)
  // Just in case:
  content = content.replace(/bg-white dark:bg-slate-900 dark:bg-slate-900/g, 'bg-white dark:bg-slate-900');
  content = content.replace(/bg-white dark:bg-slate-950 dark:bg-slate-900/g, 'bg-white dark:bg-slate-950');
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated ${filePath}`);
});

console.log('Theme styles updated.');
