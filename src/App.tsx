import React, { useState, useEffect } from 'react';
import { Plus, Search, Settings, LayoutGrid, List } from 'lucide-react';
import { Prompt, COLORS } from './types';
import { PromptCard } from './components/PromptCard';
import { PromptModal } from './components/PromptModal';

export default function App() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('quick-prompts');
    if (saved) {
      try {
        setPrompts(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved prompts', e);
      }
    } else {
      // Add some default prompts if empty
      const defaultPrompts: Prompt[] = [
        {
          id: '1',
          title: 'Hi there,\n\nHope you are having a great week!',
          color: COLORS[10].value, // Blue
          order: 0,
        },
        {
          id: '2',
          title: 'Date:\nAttendees:\n\nAgenda:\n1. \n2. \n\nAction Items:\n- [ ] ',
          color: COLORS[6].value, // Emerald
          order: 1,
        },
        {
          id: '3',
          title: 'Thank you so much for reaching out and thinking of me. Unfortunately, I don\'t have the bandwidth to take this on right now. Wishing you the best with the project!',
          color: COLORS[16].value, // Rose
          order: 2,
        }
      ];
      setPrompts(defaultPrompts);
      localStorage.setItem('quick-prompts', JSON.stringify(defaultPrompts));
    }
  }, []);

  // Save to localStorage whenever prompts change
  useEffect(() => {
    localStorage.setItem('quick-prompts', JSON.stringify(prompts));
  }, [prompts]);

  const handleSavePrompt = (promptData: Omit<Prompt, 'id' | 'order'>) => {
    if (editingPrompt) {
      setPrompts(prompts.map(p => 
        p.id === editingPrompt.id 
          ? { ...p, ...promptData } 
          : p
      ));
    } else {
      const newPrompt: Prompt = {
        ...promptData,
        id: crypto.randomUUID(),
        order: prompts.length,
      };
      setPrompts([...prompts, newPrompt]);
    }
    setEditingPrompt(null);
    setIsModalOpen(false);
  };

  const handleDeletePrompt = (id: string) => {
    setPrompts(prompts.filter(p => p.id !== id));
  };

  const openEditModal = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingPrompt(null);
    setIsModalOpen(true);
  };

  const filteredPrompts = prompts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg leading-none">B</span>
            </div>
            <h1 className="text-xl font-bold hidden sm:block tracking-tight">Brill copy</h1>
          </div>

          <div className="flex-1 max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
            
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-colors shadow-sm hover:shadow"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Prompt</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPrompts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400">
              <Search size={48} />
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">No prompts found</h2>
            <p className="text-slate-500 max-w-md mb-8">
              {searchQuery 
                ? "We couldn't find any prompts matching your search. Try a different keyword."
                : "You haven't added any prompts yet. Create your first one to get started!"}
            </p>
            {!searchQuery && (
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Plus size={20} />
                Create First Prompt
              </button>
            )}
          </div>
        ) : (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onEdit={openEditModal}
                onDelete={handleDeletePrompt}
              />
            ))}
          </div>
        )}
      </main>

      <PromptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePrompt}
        initialData={editingPrompt}
      />
    </div>
  );
}
