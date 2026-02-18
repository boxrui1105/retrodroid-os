import React from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/os-store';
import * as LucideIcons from 'lucide-react';
export const Launcher: React.FC = () => {
  const apps = useOSStore((s) => s.installedApps);
  const setActiveApp = useOSStore((s) => s.setActiveApp);
  const t = useOSStore((s) => s.t);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };
  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };
  return (
    <div className="p-8 h-full w-full overflow-y-auto scrollbar-hide">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-4 gap-y-10"
      >
        {apps.map((app) => {
          const Icon = (LucideIcons as any)[app.icon] || LucideIcons.HelpCircle;
          return (
            <motion.button
              key={app.id}
              variants={item}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveApp(app.id)}
              className="flex flex-col items-center gap-2 group outline-none"
            >
              <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-3xl flex items-center justify-center shadow-md border border-black/5 group-active:brightness-90 transition-all overflow-hidden">
                <div className="text-android-blue">
                  <Icon size={32} strokeWidth={2} />
                </div>
              </div>
              <span className="text-[12px] font-medium text-foreground/80 text-center tracking-tight truncate w-full px-1">
                {t(app.nameKey)}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};