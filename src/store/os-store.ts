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
  terminalHistory: string[];
  // Actions
  setBooting: (val: boolean) => void;
  setLocked: (val: boolean) => void;
  setActiveApp: (id: string | null) => void;
  setRecentsOpen: (val: boolean) => void;
  updateTime: () => void;
  clearRecents: () => void;
  addTerminalLine: (line: string) => void;
  clearTerminal: () => void;
  // Language & Translation
  setLanguage: (lang: 'en' | 'zh') => void;
  t: (key: string) => string;
  // Persistence Actions
  initializeOS: () => Promise<void>;
  // Notes Actions
  addNote: (note: Omit<Note, 'id' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  // Settings Actions
  updateSettings: (settings: Partial<SystemSettings>) => void;
}
const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    'app.hello': 'About Pancake',
    'app.terminal': 'Terminal',
    'app.notes': 'Notes',
    'app.browser': 'Browser',
    'app.settings': 'Settings',
    'status.carrier': 'Pancake',
    'lock.swipe': 'Swipe to unlock',
    'nav.recents': 'Pancake Task Manager',
    'nav.clear': 'Clear All',
    'nav.empty': 'No Recent Activity',
    'settings.visual': 'Display',
    'settings.darkmode': 'Dark Mode',
    'settings.language': 'System Language',
    'settings.accent': 'Accent Color',
    'settings.info': 'Device Information',
    'notes.sidebar': 'All Notes',
    'notes.new': 'New Note',
    'notes.empty': 'No note selected',
    'notes.placeholder': 'Start typing your note...',
    'browser.home': 'Home',
    'browser.search': 'Search or type URL',
    'device.model': 'Model',
    'device.version': 'Pancake Version',
    'device.processor': 'Processor',
    'device.ram': 'Memory',
    'device.storage': 'Storage',
    'device.sim': 'Simulation Mode'
  },
  zh: {
    'app.hello': '��于煎饼',
    'app.terminal': '终端',
    'app.notes': '便签',
    'app.browser': '浏览器',
    'app.settings': '设置',
    'status.carrier': '煎饼系统',
    'lock.swipe': '上滑解��',
    'nav.recents': '多任务管理',
    'nav.clear': '���部清除',
    'nav.empty': '无最近活动',
    'settings.visual': '显��设置',
    'settings.darkmode': '深色模式',
    'settings.language': '系统语言',
    'settings.accent': '强调色',
    'settings.info': '设备信息',
    'notes.sidebar': '全部便签',
    'notes.new': '新建便签',
    'notes.empty': '未选��便签',
    'notes.placeholder': '开始输入便签内容...',
    'browser.home': '主页',
    'browser.search': '搜索或输入��址',
    'device.model': '型号',
    'device.version': '煎饼版本',
    'device.processor': '���理器',
    'device.ram': '内存',
    'device.storage': '存储空间',
    'device.sim': '模拟模式'
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
  terminalHistory: [
    'Initializing Pancake Kernel v11.0.4...',
    'Loading system modules [OK]',
    'Establishing encrypted P-Cloud connection...',
    'Welcome to Pancake Shell v1.0',
    'Type "help" for a list of system commands.'
  ],
  installedApps: [
    { id: 'hello', nameKey: 'app.hello', icon: 'Info', component: 'HelloApp' },
    { id: 'terminal', nameKey: 'app.terminal', icon: 'Terminal', component: 'TerminalApp' },
    { id: 'notes', nameKey: 'app.notes', icon: 'FileText', component: 'NotesApp' },
    { id: 'browser', nameKey: 'app.browser', icon: 'Globe', component: 'BrowserApp' },
    { id: 'settings', nameKey: 'app.settings', icon: 'Settings', component: 'SettingsApp' },
  ],
  notes: [
    { id: '1', title: 'Welcome', content: 'Welcome to Pancake Mobile OS 11. Your cloud notes will appear here.', updatedAt: Date.now() }
  ],
  settings: {
    isDarkMode: false,
    language: 'en',
    accentColor: '#f97316',
  },
  t: (key) => {
    const lang = get().settings.language;
    return TRANSLATIONS[lang]?.[key] || key;
  },
  initializeOS: async () => {
    set({ isSyncing: true });
    try {
      const res = await fetch('/api/os/sync');
      const json = await res.json();
      if (json.success && json.data) {
        const { settings, notes } = json.data;
        // Only update if we actually got valid data from the server
        if (settings && typeof settings === 'object' && Object.keys(settings).length > 0) {
          set((state) => ({ settings: { ...state.settings, ...settings } }));
        }
        if (notes && Array.isArray(notes) && notes.length > 0) {
          set({ notes });
        }
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
  addTerminalLine: (line) => set((state) => ({ terminalHistory: [...state.terminalHistory, line] })),
  clearTerminal: () => set({ terminalHistory: [] }),
  addNote: (note) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: note.title,
      content: note.content,
      updatedAt: Date.now()
    };
    set((state) => {
      const updatedNotes = [newNote, ...state.notes];
      syncNotes(updatedNotes);
      return { notes: updatedNotes };
    });
  },
  updateNote: (id, updates) => {
    set((state) => {
      const updatedNotes = state.notes.map(n =>
        n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n
      );
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