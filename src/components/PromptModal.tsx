import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Prompt, COLORS } from '../types';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: Omit<Prompt, 'id' | 'order'>) => void;
  initialData?: Prompt | null;
}

export function PromptModal({ isOpen, onClose, onSave, initialData }: PromptModalProps) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(COLORS[0].value);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setColor(initialData.color);
    } else {
      setTitle('');
      setColor(COLORS[0].value);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSave({
      title: title.trim(),
      color,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData ? 'Edit Prompt' : 'New Prompt'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto flex-1 flex flex-col gap-4">
          <div className="flex-1 flex flex-col">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Text to copy
            </label>
            <textarea
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full flex-1 min-h-[150px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
              placeholder="Paste your text here..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="grid grid-cols-6 gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    c.value.split(' ')[0]
                  } ${
                    color === c.value
                      ? 'ring-2 ring-offset-2 ring-blue-500 scale-110'
                      : 'border-transparent hover:scale-110'
                  }`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 mt-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Save Prompt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
