import { ThemeContextProviderProps } from '@/Interfaces/ThemeContextProvider';

import { useState } from 'react';
import ThemeContext from './ThemeContext';
import background from '@/assets/backgroundImages//stars-background.webp';
import { backGroundImages } from '@/Types/Types';

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [mode, setMode] = useState('dark');
  const [backgroundImage, setBackgroundImage] = useState(background);
  const [backgroundIsChanging, setBackgroundIsChanging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImages, setBackgroundImages] = useState<backGroundImages[]>(
    [],
  );
  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        backgroundImage,
        setBackgroundImage,
        backgroundIsChanging,
        setBackgroundIsChanging,
        isLoading,
        setIsLoading,
        backgroundImages,
        setBackgroundImages,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
