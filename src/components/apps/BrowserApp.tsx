import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, RotateCcw, Home, Globe, Lock, ShieldCheck } from 'lucide-react';
import { useOSStore } from '@/store/os-store';
import { Card } from '@/components/ui/card';
const MOCK_PAGES: Record<string, React.ReactNode> = {
  'home': (
    <div className="space-y-12 p-8 text-center bg-white dark:bg-zinc-950 h-full">
      <div className="pt-12">
        <h1 className="text-5xl font-black tracking-tighter flex items-center justify-center gap-2">
          <span className="text-blue-500">G</span>
          <span className="text-red-500">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-500">l</span>
          <span className="text-red-500">e</span>
        </h1>
      </div>
      <div className="max-w-xl mx-auto relative group">
        <input
          placeholder="Search or type URL"
          className="w-full h-14 bg-zinc-100 dark:bg-zinc-800 rounded-full px-12 outline-none text-sm focus:ring-2 ring-primary transition-all border-none shadow-sm"
        />
        <Search className="absolute left-4 top-4 text-muted-foreground" size={20} />
      </div>
      <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
        {['YouTube', 'Gmail', 'Maps', 'News'].map(site => (
          <div key={site} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer shadow-sm transition-colors">
              <Globe size={24} className="text-muted-foreground" />
            </div>
            <span className="text-[11px] font-medium">{site}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  'news': (
    <div className="p-6 space-y-6 bg-zinc-50 dark:bg-zinc-950 h-full">
      <h2 className="text-2xl font-bold tracking-tight border-b-2 border-primary pb-2 flex items-center gap-2">
        <ShieldCheck className="text-primary" /> Daily News Portal
      </h2>
      <div className="grid gap-4">
        {[1, 2].map(i => (
          <Card key={i} className="p-5 border-none shadow-sm rounded-2xl bg-white dark:bg-zinc-900">
            <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Top Story</span>
            <h3 className="font-bold text-lg mt-1">Material Design 4.0 Interface Released</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Google announces the latest iteration of its design language, focusing on adaptive colors and fluid motion...
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
};
export const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState('android://home');
  const [currentPage, setCurrentPage] = useState('home');
  const t = useOSStore((s) => s.t);
  const navigate = (to: string) => {
    setCurrentPage(to);
    setUrl(`android://${to}`);
  };
  return (
    <div className="h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* Search Bar UI */}
      <div className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 p-3 flex items-center gap-3 shrink-0">
        <div className="flex gap-1">
          <button onClick={() => navigate('home')} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"><ChevronLeft size={20} /></button>
          <button className="p-2 opacity-30"><ChevronRight size={20} /></button>
        </div>
        <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-full h-10 px-4 flex items-center gap-2 text-sm">
          <Lock size={14} className="text-green-500" />
          <span className="text-muted-foreground truncate flex-1">{url}</span>
          <button onClick={() => navigate(currentPage === 'home' ? 'news' : 'home')}><RotateCcw size={16} className="text-muted-foreground" /></button>
        </div>
        <button onClick={() => navigate('home')} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"><Home size={20} /></button>
      </div>
      {/* Viewport */}
      <div className="flex-1 overflow-y-auto">
        {MOCK_PAGES[currentPage]}
      </div>
      {/* Footer */}
      <div className="h-8 bg-white dark:bg-zinc-900 border-t dark:border-zinc-800 flex items-center px-4 justify-between">
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Chrome Lite v15.4</span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[9px] text-muted-foreground">Secure Connection</span>
        </div>
      </div>
    </div>
  );
};