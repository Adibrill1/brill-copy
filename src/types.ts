export type Prompt = {
  id: string;
  title: string;
  color: string;
  order: number;
};

export const COLORS = [
  { name: 'Red', value: 'bg-red-100 text-red-900 border-red-200 hover:bg-red-200' },
  { name: 'Orange', value: 'bg-orange-100 text-orange-900 border-orange-200 hover:bg-orange-200' },
  { name: 'Amber', value: 'bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200' },
  { name: 'Yellow', value: 'bg-yellow-100 text-yellow-900 border-yellow-200 hover:bg-yellow-200' },
  { name: 'Lime', value: 'bg-lime-100 text-lime-900 border-lime-200 hover:bg-lime-200' },
  { name: 'Green', value: 'bg-green-100 text-green-900 border-green-200 hover:bg-green-200' },
  { name: 'Emerald', value: 'bg-emerald-100 text-emerald-900 border-emerald-200 hover:bg-emerald-200' },
  { name: 'Teal', value: 'bg-teal-100 text-teal-900 border-teal-200 hover:bg-teal-200' },
  { name: 'Cyan', value: 'bg-cyan-100 text-cyan-900 border-cyan-200 hover:bg-cyan-200' },
  { name: 'Sky', value: 'bg-sky-100 text-sky-900 border-sky-200 hover:bg-sky-200' },
  { name: 'Blue', value: 'bg-blue-100 text-blue-900 border-blue-200 hover:bg-blue-200' },
  { name: 'Indigo', value: 'bg-indigo-100 text-indigo-900 border-indigo-200 hover:bg-indigo-200' },
  { name: 'Violet', value: 'bg-violet-100 text-violet-900 border-violet-200 hover:bg-violet-200' },
  { name: 'Purple', value: 'bg-purple-100 text-purple-900 border-purple-200 hover:bg-purple-200' },
  { name: 'Fuchsia', value: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200 hover:bg-fuchsia-200' },
  { name: 'Pink', value: 'bg-pink-100 text-pink-900 border-pink-200 hover:bg-pink-200' },
  { name: 'Rose', value: 'bg-rose-100 text-rose-900 border-rose-200 hover:bg-rose-200' },
  { name: 'Slate', value: 'bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200' },
  { name: 'Gray', value: 'bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200' },
  { name: 'Zinc', value: 'bg-zinc-100 text-zinc-900 border-zinc-200 hover:bg-zinc-200' },
  { name: 'Neutral', value: 'bg-neutral-100 text-neutral-900 border-neutral-200 hover:bg-neutral-200' },
  { name: 'Stone', value: 'bg-stone-100 text-stone-900 border-stone-200 hover:bg-stone-200' },
];
