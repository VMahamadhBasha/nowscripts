const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'client/src/pages/Home.tsx',
  'client/src/pages/Post.tsx',
  'client/src/pages/User.tsx',
  'client/src/pages/Notifications.tsx',
  'client/src/components/HomeHeader.tsx',
  'client/src/components/HomePostSection.tsx',
  'client/src/components/Search.tsx',
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
  
  // Standard Tailwind Grays to Slates
  '\\bbg-white\\b': 'bg-white dark:bg-slate-900', 
  '\\bbg-gray-50\\b': 'bg-slate-50 dark:bg-slate-800/50',
  '\\bbg-gray-100\\b': 'bg-slate-100 dark:bg-slate-800',
  '\\bbg-gray-200\\b': 'bg-slate-200 dark:bg-slate-700',
  '\\btext-gray-900\\b': 'text-slate-900 dark:text-slate-100',
  '\\btext-gray-800\\b': 'text-slate-800 dark:text-slate-200',
  '\\btext-gray-700\\b': 'text-slate-700 dark:text-slate-300',
  '\\btext-gray-600\\b': 'text-slate-600 dark:text-slate-400',
  '\\btext-gray-500\\b': 'text-slate-500 dark:text-slate-400',
  '\\btext-gray-400\\b': 'text-slate-400 dark:text-slate-500',
  '\\bborder-gray-200\\b': 'border-slate-200 dark:border-slate-800',
  '\\bborder-gray-100\\b': 'border-slate-100 dark:border-slate-800/50',
  '\\btext-black\\b': 'text-black dark:text-white',
};

filesToUpdate.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping ${filePath} - not found`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  for (const [key, value] of Object.entries(colorMap)) {
    const regex = new RegExp(key, 'g');
    content = content.replace(regex, value);
  }

  // Double replacements fallback
  content = content.replace(/bg-white dark:bg-slate-900 dark:bg-slate-900/g, 'bg-white dark:bg-slate-900');
  content = content.replace(/text-black dark:text-white dark:text-white/g, 'text-black dark:text-white');
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated ${filePath}`);
});

console.log('Community Theme styles updated.');
