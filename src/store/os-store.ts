import { create } from 'zustand';
export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  component: string;
}
export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}
export interface SystemSettings {
  glitchIntensity: number;
  accentColor: 'green' | 'pink' | 'cyan';
  scanlineIntensity: number;
  crtFlicker: boolean;
}
interface OSState {
  isBooting: boolean;
  isLocked: boolean;
  activeAppId: string | null;
  systemTime: Date;
  installedApps: AppConfig[];
  terminalHistory: string[];
  notes: Note[];
  settings: SystemSettings;
  // Actions
  setBooting: (val: boolean) => void;
  setLocked: (val: boolean) => void;
  setActiveApp: (id: string | null) => void;
  updateTime: () => void;
  // Terminal Actions
  addTerminalLine: (line: string) => void;
  clearTerminal: () => void;
  // Notes Actions
  addNote: (note: Omit<Note, 'id' | 'updatedAt'>) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  // Settings Actions
  updateSettings: (settings: Partial<SystemSettings>) => void;
}
export const useOSStore = create<OSState>((set) => ({
  isBooting: true,
  isLocked: true,
  activeAppId: null,
  systemTime: new Date(),
  installedApps: [
    { id: 'hello', name: 'HELLO.EXE', icon: 'Cpu', component: 'HelloApp' },
    { id: 'terminal', name: 'TERM.SH', icon: 'Terminal', component: 'TerminalApp' },
    { id: 'notes', name: 'NOTES.TXT', icon: 'FileText', component: 'NotesApp' },
    { id: 'settings', name: 'SYS.CONF', icon: 'Settings', component: 'SettingsApp' },
  ],
  terminalHistory: [
    "NEON_DROID_OS [Version 1.0.42]",
    "(c) 2099 Neon-Dynamic Systems. All rights reserved.",
    "",
    "Type 'help' for available commands."
  ],
  notes: [
    { id: '1', title: 'TODO', content: '1. Buy synthetic caffeine\n2. Patch neural link\n3. Evade Sector 7 patrols', updatedAt: Date.now() }
  ],
  settings: {
    glitchIntensity: 2,
    accentColor: 'green',
    scanlineIntensity: 0.5,
    crtFlicker: true,
  },
  setBooting: (val) => set({ isBooting: val }),
  setLocked: (val) => set({ isLocked: val }),
  setActiveApp: (id) => set({ activeAppId: id }),
  updateTime: () => set({ systemTime: new Date() }),
  addTerminalLine: (line) => set((state) => ({ 
    terminalHistory: [...state.terminalHistory, line] 
  })),
  clearTerminal: () => set({ terminalHistory: [] }),
  addNote: (note) => set((state) => ({
    notes: [
      { 
        id: crypto.randomUUID(), 
        ...note, 
        updatedAt: Date.now() 
      },
      ...state.notes
    ]
  })),
  updateNote: (id, content) => set((state) => ({
    notes: state.notes.map(n => n.id === id ? { ...n, content, updatedAt: Date.now() } : n)
  })),
  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter(n => n.id !== id)
  })),
  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  })),
}));