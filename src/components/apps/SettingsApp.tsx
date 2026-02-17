import React from 'react';
import { useOSStore } from '@/store/os-store';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Palette, Monitor, Cpu, Info } from 'lucide-react';
export const SettingsApp: React.FC = () => {
  const settings = useOSStore((s) => s.settings);
  const updateSettings = useOSStore((s) => s.updateSettings);
  return (
    <div className="h-full bg-black/40 p-6 space-y-8 overflow-y-auto font-mono">
      <div className="space-y-6">
        <h2 className="flex items-center gap-2 text-xs font-black tracking-[0.3em] uppercase opacity-50 border-b border-[#00ff41]/20 pb-2">
          <Monitor size={14} /> Visual_Output
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">GLITCH_INTENSITY</span>
            <span className="retro-text-pink text-xs">{settings.glitchIntensity}</span>
          </div>
          <Slider
            value={[settings.glitchIntensity]}
            onValueChange={([v]) => updateSettings({ glitchIntensity: v })}
            max={10}
            step={1}
            className="w-full"
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">SCANLINE_STRENGTH</span>
            <span className="retro-text-pink text-xs">{Math.round(settings.scanlineIntensity * 100)}%</span>
          </div>
          <Slider
            value={[settings.scanlineIntensity * 100]}
            onValueChange={([v]) => updateSettings({ scanlineIntensity: v / 100 })}
            max={100}
            step={1}
          />
        </div>
        <div className="flex items-center justify-between p-4 border border-[#00ff41]/20 bg-[#00ff41]/5">
          <div className="space-y-0.5">
            <span className="text-sm font-bold block">CRT_FLICKER</span>
            <span className="text-[10px] opacity-50">Simulate analog display instability</span>
          </div>
          <Switch 
            checked={settings.crtFlicker}
            onCheckedChange={(checked) => updateSettings({ crtFlicker: checked })}
          />
        </div>
      </div>
      <div className="space-y-6">
        <h2 className="flex items-center gap-2 text-xs font-black tracking-[0.3em] uppercase opacity-50 border-b border-[#00ff41]/20 pb-2">
          <Palette size={14} /> Appearance
        </h2>
        <div className="flex gap-4">
          {['green', 'pink', 'cyan'].map((color) => (
            <button
              key={color}
              onClick={() => updateSettings({ accentColor: color as any })}
              className={`w-12 h-12 border-2 transition-all ${
                settings.accentColor === color ? 'border-white scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color === 'green' ? '#00ff41' : color === 'pink' ? '#ff00ff' : '#00ffff' }}
            />
          ))}
        </div>
      </div>
      <div className="p-4 bg-white/5 border-l-2 border-[#ff00ff] text-[10px] space-y-2">
        <div className="flex items-center gap-2 opacity-60">
          <Info size={12} />
          <span className="font-bold">SYSTEM_SPECS</span>
        </div>
        <p>OS_VERSION: 1.0.42-STABLE</p>
        <p>BUILD_SIG: x86_64-neon-droid</p>
        <p>STORAGE_AVAIL: 1.2 PB / 4 PB</p>
      </div>
    </div>
  );
};