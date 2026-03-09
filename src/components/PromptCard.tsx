import React, { useState } from 'react';
import { Copy, Edit2, Trash2, Check } from 'lucide-react';
import { Prompt } from '../types';

interface PromptCardProps {
  prompt: Prompt;
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, onEdit, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.title);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div
      className={`relative group flex flex-col justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer shadow-sm ${prompt.color}`}
      onClick={handleCopy}
    >
      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(prompt);
          }}
          className="p-1.5 rounded-md bg-white/50 hover:bg-white/80 text-gray-700 transition-colors"
          title="Edit"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(prompt.id);
          }}
          className="p-1.5 rounded-md bg-white/50 hover:bg-white/80 text-red-600 transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mb-4 pr-16">
        <h3 className="font-medium text-base mb-1 line-clamp-4 whitespace-pre-wrap">{prompt.title}</h3>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/10">
        <span className="text-xs font-medium opacity-70 uppercase tracking-wider">
          Click to copy
        </span>
        {copied ? (
          <Check size={18} className="text-green-600" />
        ) : (
          <Copy size={18} className="opacity-70 group-hover:opacity-100" />
        )}
      </div>
    </div>
  );
}
