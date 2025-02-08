import { ThemeContextProviderProps } from '@/Interfaces/ThemeContextProvider';

import { useState } from 'react';
import ThemeContext from './ThemeContext';
import background from '@/assets/backgroundImages//stars-background.webp';

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [mode, setMode] = useState('dark');
  const [backgroundImage, setBackgroundImage] = useState(background);
  return (
    <ThemeContext.Provider
      value={{ mode, setMode, backgroundImage, setBackgroundImage }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
