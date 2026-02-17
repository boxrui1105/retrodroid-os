import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, RotateCcw, Home, Globe, ExternalLink } from 'lucide-react';
const MOCK_PAGES: Record<string, React.ReactNode> = {
  'home': (
    <div className="space-y-8 p-6 text-center">
      <div className="inline-block p-4 border-2 border-current mb-4">
        <Globe size={48} className="mx-auto" />
      </div>
      <h1 className="text-3xl font-black uppercase tracking-[0.2em]">Net_Explorer_v4</h1>
      <div className="max-w-md mx-auto relative">
        <input 
          placeholder="SEARCH THE DEEP_NET..." 
          className="w-full bg-current/10 border-2 border-current p-3 pl-10 outline-none text-sm font-bold uppercase"
        />
        <Search className="absolute left-3 top-3.5 opacity-50" size={18} />
      </div>
      <div className="grid grid-cols-2 gap-4 text-[10px] font-bold">
        {['NEON.NEWS', 'HACK.NET', 'CYBER.WARE', 'DROID.DOCS'].map(site => (
          <div key={site} className="p-3 border border-current/30 hover:bg-current/10 cursor-pointer uppercase transition-all">
            {site}
          </div>
        ))}
      </div>
    </div>
  ),
  'neon.news': (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-black border-b-4 border-current pb-2 italic">NEON_MORNING_POST</h2>
      <div className="space-y-4">
        <div className="p-4 bg-current/5 border border-current/20">
          <p className="text-[10px] opacity-50 mb-1">2099-10-24 // SECTOR 7</p>
          <h3 className="font-bold text-lg mb-2 uppercase">Neural-Link Outage Hits Core Districts</h3>
          <p className="text-sm leading-relaxed">Central Hub confirms a major bypass in the neural backbone. Citizens are advised to switch to manual cognitive processing until further notice.</p>
        </div>
        <div className="p-4 bg-current/5 border border-current/20">
          <p className="text-[10px] opacity-50 mb-1">2099-10-23 // UNDERGROUND</p>
          <h3 className="font-bold text-lg mb-2 uppercase">New Synth-Caffeine Brand Hits the Shelves</h3>
          <p className="text-sm leading-relaxed">'Glitch-Brew' promises 400% alertness increase with only 12% chance of permanent jitter-syndrome.</p>
        </div>
      </div>
    </div>
  )
};
export const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState('droid://home');
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = (to: string) => {
    setCurrentPage(to);
    setUrl(`droid://${to}`);
  };
  return (
    <div className="h-full flex flex-col bg-black">
      {/* Address Bar UI */}
      <div className="h-14 border-b border-current/30 flex items-center px-4 gap-4 bg-current/5 shrink-0">
        <div className="flex gap-2">
          <button onClick={() => navigate('home')} className="p-1 hover:bg-current/20 rounded"><ChevronLeft size={18} /></button>
          <button className="p-1 opacity-20"><ChevronRight size={18} /></button>
          <button className="p-1 hover:bg-current/20 rounded"><RotateCcw size={18} /></button>
        </div>
        <div className="flex-1 bg-black border border-current/40 px-3 py-1.5 flex items-center gap-2 text-xs">
          <Globe size={12} className="opacity-50" />
          <span className="font-bold tracking-tighter opacity-80 uppercase">{url}</span>
        </div>
        <button onClick={() => navigate('home')} className="p-1 hover:bg-current/20 rounded"><Home size={18} /></button>
      </div>
      {/* Viewport */}
      <div className="flex-1 overflow-y-auto">
        {MOCK_PAGES[currentPage] || (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center">
            <ExternalLink size={48} className="mb-4 text-red-500" />
            <h2 className="text-xl font-bold text-red-500 uppercase">404: PROTOCOL_NOT_FOUND</h2>
            <p className="text-xs opacity-50 mt-2 uppercase">The requested neural node does not exist or has been purged by the system janitor.</p>
            <button onClick={() => navigate('home')} className="mt-6 border border-current px-4 py-2 text-xs uppercase hover:bg-current/10">Return Home</button>
          </div>
        )}
      </div>
      {/* Status */}
      <div className="h-6 border-t border-current/20 flex items-center px-4 text-[8px] uppercase tracking-widest opacity-30">
        Secure Handshake: Established (TLS 9.0) // Latency: 4ms
      </div>
    </div>
  );
};