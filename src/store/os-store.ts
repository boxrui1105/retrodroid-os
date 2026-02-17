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
  isSyncing: boolean;
  activeAppId: string | null;
  isRecentsOpen: boolean;
  systemTime: Date;
  recentApps: string[];
  installedApps: AppConfig[];
  terminalHistory: string[];
  notes: Note[];
  settings: SystemSettings;
  // Actions
  setBooting: (val: boolean) => void;
  setLocked: (val: boolean) => void;
  setActiveApp: (id: string | null) => void;
  setRecentsOpen: (val: boolean) => void;
  updateTime: () => void;
  clearRecents: () => void;
  // Persistence Actions
  initializeOS: () => Promise<void>;
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
const syncSettings = async (settings: SystemSettings) => {
  try {
    await fetch('/api/os/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
  } catch (e) {
    console.error('Failed to sync settings:', e);
  }
};
const syncNotes = async (notes: Note[]) => {
  try {
    await fetch('/api/os/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notes)
    });
  } catch (e) {
    console.error('Failed to sync notes:', e);
  }
};
export const useOSStore = create<OSState>((set, get) => ({
  isBooting: true,
  isLocked: true,
  isSyncing: false,
  activeAppId: null,
  isRecentsOpen: false,
  systemTime: new Date(),
  recentApps: [],
  installedApps: [
    { id: 'hello', name: 'HELLO.EXE', icon: 'Cpu', component: 'HelloApp' },
    { id: 'terminal', name: 'TERM.SH', icon: 'Terminal', component: 'TerminalApp' },
    { id: 'notes', name: 'NOTES.TXT', icon: 'FileText', component: 'NotesApp' },
    { id: 'browser', name: 'NET.EXE', icon: 'Globe', component: 'BrowserApp' },
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
  initializeOS: async () => {
    set({ isSyncing: true });
    try {
      const res = await fetch('/api/os/sync');
      const json = await res.json();
      if (json.success && json.data) {
        const { settings, notes } = json.data;
        if (settings) set({ settings });
        if (notes) set({ notes });
      }
    } catch (e) {
      console.error('Initial OS sync failed:', e);
    } finally {
      set({ isSyncing: false });
    }
  },
  setBooting: (val) => set({ isBooting: val }),
  setLocked: (val) => set({ isLocked: val }),
  setRecentsOpen: (val) => set({ isRecentsOpen: val }),
  setActiveApp: (id) => set((state) => {
    const newRecentApps = id 
      ? [id, ...state.recentApps.filter(appId => appId !== id)].slice(0, 10)
      : state.recentApps;
    return { 
      activeAppId: id, 
      recentApps: newRecentApps,
      isRecentsOpen: false 
    };
  }),
  updateTime: () => set({ systemTime: new Date() }),
  clearRecents: () => set({ recentApps: [] }),
  addTerminalLine: (line) => set((state) => ({
    terminalHistory: [...state.terminalHistory, line]
  })),
  clearTerminal: () => set({ terminalHistory: [] }),
  addNote: (note) => {
    set((state) => {
      const newNote = { id: crypto.randomUUID(), ...note, updatedAt: Date.now() };
      const updatedNotes = [newNote, ...state.notes];
      syncNotes(updatedNotes);
      return { notes: updatedNotes };
    });
  },
  updateNote: (id, content) => {
    set((state) => {
      const updatedNotes = state.notes.map(n => n.id === id ? { ...n, content, updatedAt: Date.now() } : n);
      syncNotes(updatedNotes);
      return { notes: updatedNotes };
    });
  },
  deleteNote: (id) => {
    set((state) => {
      const updatedNotes = state.notes.filter(n => n.id !== id);
      syncNotes(updatedNotes);
      return { notes: updatedNotes };
    });
  },
  updateSettings: (newSettings) => {
    set((state) => {
      const updatedSettings = { ...state.settings, ...newSettings };
      syncSettings(updatedSettings);
      return { settings: updatedSettings };
    });
  },
}));