import React from 'react';
import { SystemShell } from '@/components/os/SystemShell';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden">
      <SystemShell />
      <Toaster 
        theme="dark" 
        richColors 
        position="top-center"
        toastOptions={{
          style: {
            background: '#0d0d0d',
            border: '2px solid #00ff41',
            color: '#00ff41',
            borderRadius: '0px',
            fontFamily: 'JetBrains Mono, monospace'
          }
        }}
      />
    </div>
  );
}