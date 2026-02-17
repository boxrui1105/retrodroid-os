import React from 'react';
import { useOSStore } from '@/store/os-store';
import { Switch } from '@/components/ui/switch';
import { Monitor, Palette, Globe, Info, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
export const SettingsApp: React.FC = () => {
  const settings = useOSStore((s) => s.settings);
  const updateSettings = useOSStore((s) => s.updateSettings);
  const t = useOSStore((s) => s.t);
  const currentLanguage = useOSStore((s) => s.settings.language);
  const currentAccent = useOSStore((s) => s.settings.accentColor);
  const colors = [
    { name: 'Pancake Orange', value: '#f97316' },
    { name: 'Blue', value: '#1a73e8' },
    { name: 'Green', value: '#34a853' },
    { name: 'Red', value: '#ea4335' },
    { name: 'Purple', value: '#a855f7' },
  ];
  return (
    <div className="h-full bg-zinc-50 dark:bg-zinc-950 p-6 space-y-6 overflow-y-auto pb-12">
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Monitor size={14} /> {t('settings.visual')}
        </h2>
        <Card className="p-4 flex items-center justify-between border-none shadow-sm bg-white dark:bg-zinc-900 rounded-2xl">
          <div className="space-y-0.5">
            <span className="text-sm font-medium block">{t('settings.darkmode')}</span>
            <span className="text-xs text-muted-foreground">Adjust system appearance</span>
          </div>
          <Switch
            checked={settings.isDarkMode}
            onCheckedChange={(checked) => updateSettings({ isDarkMode: checked })}
          />
        </Card>
      </section>
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Globe size={14} /> {t('settings.language')}
        </h2>
        <Card className="p-4 border-none shadow-sm bg-white dark:bg-zinc-900 rounded-2xl">
          <ToggleGroup
            type="single"
            value={currentLanguage}
            onValueChange={(val) => val && updateSettings({ language: val as 'en' | 'zh' })}
            className="justify-start gap-4"
          >
            <ToggleGroupItem
              value="en"
              className={cn(
                "px-6 rounded-full border transition-all",
                currentLanguage === 'en' && "bg-primary text-primary-foreground border-primary"
              )}
            >
              English
            </ToggleGroupItem>
            <ToggleGroupItem
              value="zh"
              className={cn(
                "px-6 rounded-full border transition-all",
                currentLanguage === 'zh' && "bg-primary text-primary-foreground border-primary"
              )}
            >
              中文
            </ToggleGroupItem>
          </ToggleGroup>
        </Card>
      </section>
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Palette size={14} /> {t('settings.accent')}
        </h2>
        <Card className="p-4 border-none shadow-sm bg-white dark:bg-zinc-900 rounded-2xl">
          <div className="flex flex-wrap gap-4">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => updateSettings({ accentColor: color.value })}
                className={cn(
                  "w-12 h-12 rounded-full transition-all flex items-center justify-center shadow-inner",
                  currentAccent === color.value ? "ring-2 ring-offset-2 ring-primary scale-110" : "hover:scale-105"
                )}
                style={{ backgroundColor: color.value }}
              >
                {currentAccent === color.value && <Check size={20} className="text-white" />}
              </button>
            ))}
          </div>
        </Card>
      </section>
      <Card className="p-4 border-none shadow-sm bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center gap-4">
        <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-full text-orange-600 dark:text-orange-300">
          <Info size={20} />
        </div>
        <div className="space-y-0.5">
          <span className="text-sm font-bold block">{t('settings.info')}</span>
          <span className="text-xs text-muted-foreground">Pancake OS 11 (Sweet Edition)</span>
        </div>
      </Card>
    </div>
  );
};