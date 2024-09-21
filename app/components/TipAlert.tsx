import React from 'react';

interface TipProps {
  content: string;
}

const Tip: React.FC<TipProps> = ({ content }) => {
  return (
    <div className="relative group">
      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center cursor-help transition-colors duration-300 hover:bg-primary-dark">
        <span className="text-xs font-bold">i</span>
      </div>
      <div className="absolute bottom-full right-1/2 transform translate-x-1/2 w-64 p-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-10 text-sm">
        <div className="text-primary font-bold mb-1">Tip</div>
        <p className="text-gray-700">{content}</p>
        <div className="absolute -bottom-2 left-1/2 w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45 -translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default Tip;