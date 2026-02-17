import React, { useState, useEffect, useRef } from 'react';
import { useOSStore } from '@/store/os-store';
export const TerminalApp: React.FC = () => {
  const history = useOSStore((s) => s.terminalHistory);
  const addLine = useOSStore((s) => s.addTerminalLine);
  const clearHistory = useOSStore((s) => s.clearTerminal);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);
  const processCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    addLine(`guest@neon-droid:~$ ${cmd}`);
    switch (cleanCmd) {
      case 'help':
        addLine('Available commands: help, ls, whoami, sys-info, clear, echo [text]');
        break;
      case 'ls':
        addLine('DRV_C:  [OS_CORE]  [USER_DATA]  [LOGS]');
        addLine('DRV_D:  [TEMP]     [DECRYPTED]');
        break;
      case 'whoami':
        addLine('USER_GUEST_01 (UNREGISTERED)');
        addLine('Access Level: 0');
        break;
      case 'sys-info':
        addLine('NEON_DROID Kernel v1.0.42');
        addLine('Uptime: 00:42:15');
        addLine('CPU: NEURAL_CORE X8 @ 4.2GHz');
        break;
      case 'clear':
        clearHistory();
        break;
      default:
        if (cleanCmd.startsWith('echo ')) {
          addLine(cmd.slice(5));
        } else if (cleanCmd !== '') {
          addLine(`sh: command not found: ${cleanCmd}`);
        }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    setInput('');
  };
  return (
    <div className="h-full bg-black flex flex-col p-4 font-mono text-sm">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all leading-relaxed">
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2 items-center">
        <span className="retro-text-green font-bold whitespace-nowrap">guest@neon-droid:~$</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-[#00ff41] caret-[#ff00ff]"
        />
      </form>
    </div>
  );
};