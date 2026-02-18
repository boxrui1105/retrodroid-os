import { create } from 'zustand';
export interface AppConfig {
  id: string;
  nameKey: string;
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
  isDarkMode: boolean;
  language: 'en' | 'zh';
  accentColor: string;
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
  notes: Note[];
  settings: SystemSettings;
  // Actions
  setBooting: (val: boolean) => void;
  setLocked: (val: boolean) => void;
  setActiveApp: (id: string | null) => void;
  setRecentsOpen: (val: boolean) => void;
  updateTime: () => void;
  clearRecents: () => void;
  // Language & Translation
  setLanguage: (lang: 'en' | 'zh') => void;
  t: (key: string) => string;
  // Persistence Actions
  initializeOS: () => Promise<void>;
  // Notes Actions
  addNote: (note: Omit<Note, 'id' | 'updatedAt'>) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  // Settings Actions
  updateSettings: (settings: Partial<SystemSettings>) => void;
}
const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    'app.hello': 'Hello',
    'app.terminal': 'Terminal',
    'app.notes': 'Notes',
    'app.browser': 'Browser',
    'app.settings': 'Settings',
    'status.carrier': 'Android',
    'lock.swipe': 'Swipe to unlock',
    'nav.recents': 'Recents Task Manager',
    'nav.clear': 'Clear All',
    'nav.empty': 'No Recent Activity'
  },
  zh: {
    'app.hello': '关于手机',
    'app.terminal': '终端',
    'app.notes': '便签',
    'app.browser': '浏览器',
    'app.settings': '设置',
    'status.carrier': '安卓系统',
    'lock.swipe': '上滑���锁',
    'nav.recents': '多任务管理',
    'nav.clear': '全部��除',
    'nav.empty': '无最近活动'
  }
};
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
    { id: 'hello', nameKey: 'app.hello', icon: 'Smartphone', component: 'HelloApp' },
    { id: 'terminal', nameKey: 'app.terminal', icon: 'Terminal', component: 'TerminalApp' },
    { id: 'notes', nameKey: 'app.notes', icon: 'FileText', component: 'NotesApp' },
    { id: 'browser', nameKey: 'app.browser', icon: 'Globe', component: 'BrowserApp' },
    { id: 'settings', nameKey: 'app.settings', icon: 'Settings', component: 'SettingsApp' },
  ],
  notes: [
    { id: '1', title: 'System Note', content: 'Welcome to Android Material OS.', updatedAt: Date.now() }
  ],
  settings: {
    isDarkMode: false,
    language: 'en',
    accentColor: '#1a73e8',
  },
  t: (key) => {
    const lang = get().settings.language;
    return TRANSLATIONS[lang][key] || key;
  },
  initializeOS: async () => {
    set({ isSyncing: true });
    try {
      const res = await fetch('/api/os/sync');
      const json = await res.json();
      if (json.success && json.data) {
        const { settings, notes } = json.data;
        if (settings) set((state) => ({ settings: { ...state.settings, ...settings } }));
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
  setLanguage: (lang) => set((state) => ({ settings: { ...state.settings, language: lang } })),
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