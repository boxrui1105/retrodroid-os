import React, { useState, useEffect, useRef } from 'react';
import { useOSStore } from '@/store/os-store';
export const TerminalApp: React.FC = () => {
  const history = useOSStore((s) => s.terminalHistory);
  const addLine = useOSStore((s) => s.addTerminalLine);
  const clearHistory = useOSStore((s) => s.clearTerminal);
  const accentColor = useOSStore((s) => s.settings.accentColor);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);
  const processCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    addLine(`user@pancake:~$ ${cmd}`);
    switch (cleanCmd) {
      case 'help':
        addLine('Pancake Shell v1.0. Available commands: help, ls, whoami, uptime, clear, echo [text]');
        break;
      case 'ls':
        addLine('apps/  cache/  data/  etc/  pancake/  sys/  var/');
        break;
      case 'whoami':
        addLine('pancake_guest_11');
        break;
      case 'uptime':
        addLine('up 42 minutes, Pancake Engine running stable');
        break;
      case 'clear':
        clearHistory();
        break;
      default:
        if (cleanCmd.startsWith('echo ')) {
          addLine(cmd.slice(5));
        } else if (cleanCmd !== '') {
          addLine(`/pancake/bin/sh: ${cleanCmd}: command not found`);
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
        <span style={{ color: accentColor }} className="font-bold whitespace-nowrap">user@pancake:~$</span>
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