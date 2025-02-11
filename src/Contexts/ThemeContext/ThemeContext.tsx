import { ThemeContextType } from '@/Types/ThemeContext';
import React from 'react';

const ThemeContext = React.createContext<ThemeContextType>({
  mode: '',
  setMode: () => {},
  backgroundImage: '',
  setBackgroundImage: () => {},
  backgroundIsChanging: false,
  setBackgroundIsChanging: () => {},
  isLoading: false,
  setIsLoading: () => {},
  backgroundImages: [],
  setBackgroundImages: () => {},
});

export default ThemeContext;
