import React from 'react';
import { generateSlug } from '../../utils/markdownParser';
import { Link2 } from 'lucide-react';
import toast from 'react-hot-toast';

const copyToClipboard = (id: string) => {
  const url = `${window.location.origin}${window.location.pathname}#${id}`;
  navigator.clipboard.writeText(url);
  toast.success('Heading link copied!');
};

const extractText = (node: any): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node) && (node.props as any).children) {
    return extractText((node.props as any).children);
  }
  return '';
};

export const H1 = ({ children, ...props }: any) => (
  <h1 className="text-[48px] font-[800] mb-[32px] tracking-tight text-slate-900 dark:text-slate-100 leading-tight" {...props}>
    {children}
  </h1>
);

export const H2 = ({ children, ...props }: any) => {
  const text = extractText(children);
  const id = generateSlug(text);

  return (
    <section id={id} className="scroll-mt-24 group relative mt-[64px] mb-[24px]">
      <div className="flex items-center">
        <h2 className="text-[32px] font-[700] text-slate-900 dark:text-slate-100 leading-tight" {...props}>
          {children}
        </h2>
        <button
          onClick={() => copyToClipboard(id)}
          className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-slate-400 dark:text-slate-500 hover:text-now-primary hover:bg-now-primary/10 rounded-md relative"
          title="Copy link to heading"
        >
          <Link2 className="w-5 h-5" />
          <span className="copy-heading-tooltip absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-[11px] px-2 py-1 rounded font-medium whitespace-nowrap">
            Copy link
          </span>
        </button>
      </div>
    </section>
  );
};

export const H3 = ({ children, ...props }: any) => {
  const text = extractText(children);
  const id = generateSlug(text);

  return (
    <div id={id} className="scroll-mt-24 group relative mt-[40px] mb-[16px] flex items-center">
      <h3 className="text-[24px] font-[600] text-slate-900 dark:text-slate-100 leading-snug" {...props}>
        {children}
      </h3>
      <button
        onClick={() => copyToClipboard(id)}
        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 dark:text-slate-500 hover:text-now-primary hover:bg-now-primary/10 rounded-md relative"
      >
        <Link2 className="w-4 h-4" />
      </button>
    </div>
  );
};
