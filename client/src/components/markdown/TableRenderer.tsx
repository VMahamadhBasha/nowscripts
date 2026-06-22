import React from 'react';

export const Table = ({ children, ...props }: any) => (
  <div className="markdown-table-wrapper shadow-sm">
    <table className="w-full text-left border-collapse text-sm text-slate-700 dark:text-slate-300" {...props}>
      {children}
    </table>
  </div>
);

export const TableHead = ({ children, ...props }: any) => (
  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-b-2 border-slate-200 dark:border-slate-800" {...props}>
    {children}
  </thead>
);

export const TableRow = ({ children, ...props }: any) => (
  <tr className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:bg-slate-800/50 transition-colors" {...props}>
    {children}
  </tr>
);

export const TableHeader = ({ children, ...props }: any) => (
  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap" {...props}>
    {children}
  </th>
);

export const TableCell = ({ children, ...props }: any) => (
  <td className="px-6 py-4 leading-relaxed" {...props}>
    {children}
  </td>
);
