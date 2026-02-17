import { create } from 'zustand';
export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  component: string;
}
interface OSState {
  isBooting: boolean;
  isLocked: boolean;
  activeAppId: string | null;
  systemTime: Date;
  installedApps: AppConfig[];
  setBooting: (val: boolean) => void;
  setLocked: (val: boolean) => void;
  setActiveApp: (id: string | null) => void;
  updateTime: () => void;
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
  setBooting: (val) => set({ isBooting: val }),
  setLocked: (val) => set({ isLocked: val }),
  setActiveApp: (id) => set({ activeAppId: id }),
  updateTime: () => set({ systemTime: new Date() }),
}));