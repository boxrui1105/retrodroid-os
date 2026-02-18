import React from 'react';
import { SystemShell } from '@/components/os/SystemShell';
import { Toaster } from '@/components/ui/sonner';
import { useOSStore } from '@/store/os-store';
export function HomePage() {
  const isDarkMode = useOSStore((s) => s.settings.isDarkMode);
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden">
      <SystemShell />
      <Toaster
        theme={isDarkMode ? "dark" : "light"}
        richColors
        position="top-center"
        toastOptions={{
          className: "rounded-[24px] shadow-lg border-none",
          style: {
            fontFamily: 'Inter, sans-serif'
          }
        }}
      />
    </div>
  );
}