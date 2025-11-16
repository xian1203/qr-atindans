import { useState, useEffect } from 'react';

export interface AppearanceSettings {
  theme: string;
  language: string;
  compactView: boolean;
  animations: boolean;
  fontSize: string;
  colorScheme: string;
}

export const useAppearance = () => {
  const [settings, setSettings] = useState<AppearanceSettings>({
    theme: 'system',
    language: 'english',
    compactView: false,
    animations: true,
    fontSize: 'normal',
    colorScheme: 'teal',
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-preference') || 'system';
    const savedLanguage = localStorage.getItem('language-preference') || 'english';
    const savedCompactView = localStorage.getItem('compact-view') === 'true';
    const savedAnimations = localStorage.getItem('animations') !== 'false';
    const savedFontSize = localStorage.getItem('font-size') || 'normal';
    const savedColorScheme = localStorage.getItem('color-scheme') || 'teal';

    const newSettings = {
      theme: savedTheme,
      language: savedLanguage,
      compactView: savedCompactView,
      animations: savedAnimations,
      fontSize: savedFontSize,
      colorScheme: savedColorScheme,
    };

    setSettings(newSettings);
    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
    applyColorScheme(savedColorScheme);
    applyCompactView(savedCompactView);
    applyAnimations(savedAnimations);
  }, []);

  const applyTheme = (theme: string) => {
    const html = document.documentElement;

    if (theme === 'dark') {
      html.classList.add('dark');
      setIsDarkMode(true);
    } else if (theme === 'light') {
      html.classList.remove('dark');
      setIsDarkMode(false);
    } else if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        html.classList.add('dark');
        setIsDarkMode(true);
      } else {
        html.classList.remove('dark');
        setIsDarkMode(false);
      }
    }

    localStorage.setItem('theme-preference', theme);
  };

  const applyFontSize = (size: string) => {
    const html = document.documentElement;
    html.style.fontSize = size === 'small' ? '14px' : size === 'large' ? '18px' : '16px';

    switch (size) {
      case 'small':
        html.style.setProperty('--font-scale', '0.9');
        break;
      case 'large':
        html.style.setProperty('--font-scale', '1.1');
        break;
      default:
        html.style.setProperty('--font-scale', '1');
    }

    localStorage.setItem('font-size', size);
  };

  const applyColorScheme = (scheme: string) => {
    document.documentElement.classList.remove('color-blue', 'color-green', 'color-purple', 'color-teal');

    if (scheme !== 'teal') {
      document.documentElement.classList.add(`color-${scheme}`);
    }

    const colorMap: { [key: string]: string } = {
      teal: '#14b8a6',
      blue: '#3b82f6',
      green: '#10b981',
      purple: '#a855f7',
    };

    document.documentElement.style.setProperty('--color-primary', colorMap[scheme] || colorMap['teal']);
    localStorage.setItem('color-scheme', scheme);
  };

  const applyCompactView = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add('compact-view');
    } else {
      document.documentElement.classList.remove('compact-view');
    }
    localStorage.setItem('compact-view', String(enabled));
  };

  const applyAnimations = (enabled: boolean) => {
    if (!enabled) {
      document.documentElement.style.setProperty('--animations', '0');
    } else {
      document.documentElement.style.setProperty('--animations', '1');
    }
    localStorage.setItem('animations', String(enabled));
  };

  const updateTheme = (theme: string) => {
    setSettings({ ...settings, theme });
    applyTheme(theme);
  };

  const updateLanguage = (language: string) => {
    setSettings({ ...settings, language });
    localStorage.setItem('language-preference', language);
  };

  const updateFontSize = (fontSize: string) => {
    setSettings({ ...settings, fontSize });
    applyFontSize(fontSize);
  };

  const updateColorScheme = (colorScheme: string) => {
    setSettings({ ...settings, colorScheme });
    applyColorScheme(colorScheme);
  };

  const toggleCompactView = () => {
    const newValue = !settings.compactView;
    setSettings({ ...settings, compactView: newValue });
    applyCompactView(newValue);
  };

  const toggleAnimations = () => {
    const newValue = !settings.animations;
    setSettings({ ...settings, animations: newValue });
    applyAnimations(newValue);
  };

  return {
    settings,
    isDarkMode,
    updateTheme,
    updateLanguage,
    updateFontSize,
    updateColorScheme,
    toggleCompactView,
    toggleAnimations,
  };
};
