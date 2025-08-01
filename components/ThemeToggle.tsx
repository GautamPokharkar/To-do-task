'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 flex gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
        <div className="w-8 h-8 rounded-full bg-gray-400 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="fixed top-6 right-6 flex gap-2">
      <button
        onClick={() => setTheme('light')}
        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
          theme === 'light'
            ? 'bg-white border-gray-600 shadow-lg'
            : 'bg-gray-200 border-gray-400 opacity-60 hover:opacity-80'
        }`}
        aria-label="Light theme"
      />
      <button
        onClick={() => setTheme('dark')}
        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
          theme === 'dark'
            ? 'bg-gray-800 border-white shadow-lg'
            : 'bg-gray-600 border-gray-400 opacity-60 hover:opacity-80'
        }`}
        aria-label="Dark theme"
      />
    </div>
  );
}