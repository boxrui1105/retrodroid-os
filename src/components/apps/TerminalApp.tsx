import React, { useState, useEffect, useRef } from 'react';
import { useOSStore } from '@/store/os-store';
import { cn } from '@/lib/utils';
export const TerminalApp: React.FC = () => {
  const history = useOSStore((s) => s.terminalHistory);
  const addLine = useOSStore((s) => s.addTerminalLine);
  const clearHistory = useOSStore((s) => s.clearTerminal);
  const accentColor = useOSStore((s) => s.settings.accentColor);
  const language = useOSStore((s) => s.settings.language);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);
  const processCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    addLine(`user@android:~$ ${cmd}`);
    switch (cleanCmd) {
      case 'help':
        addLine('Available commands: help, ls, whoami, uptime, clear, echo [text]');
        break;
      case 'ls':
        addLine('bin/  data/  etc/  mnt/  proc/  sys/  system/  vendor/');
        break;
      case 'whoami':
        addLine('guest_user_7741');
        break;
      case 'uptime':
        addLine('up 2 hours, 14 minutes');
        break;
      case 'clear':
        clearHistory();
        break;
      default:
        if (cleanCmd.startsWith('echo ')) {
          addLine(cmd.slice(5));
        } else if (cleanCmd !== '') {
          addLine(`/system/bin/sh: ${cleanCmd}: not found`);
        }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    processCommand(input);
    setInput('');
  };
  return (
    <div className="h-full bg-zinc-950 flex flex-col p-4 font-mono text-sm text-zinc-300">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all leading-relaxed">
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2 items-center border-t border-zinc-800 pt-3">
        <span style={{ color: accentColor }} className="font-bold whitespace-nowrap">user@android:~$</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-zinc-100 caret-primary"
        />
      </form>
    </div>
  );
};