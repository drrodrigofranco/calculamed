import React from 'react';

interface AdSpaceProps {
  format?: 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

const AdSpace: React.FC<AdSpaceProps> = ({ format = 'horizontal', className = '' }) => {
  let sizeClass = '';
  if (format === 'horizontal') sizeClass = 'h-24 w-full';
  if (format === 'vertical') sizeClass = 'h-[600px] w-full min-w-[160px]';
  if (format === 'rectangle') sizeClass = 'h-64 w-full';

  return (
    <div className={`bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg flex flex-col items-center justify-center overflow-hidden my-4 ${sizeClass} ${className}`}>
      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Publicidade</span>
      <div className="text-slate-300 dark:text-slate-400 text-xs text-center px-4">
        Espaço reservado para Google AdSense
      </div>
    </div>
  );
};

export default AdSpace;