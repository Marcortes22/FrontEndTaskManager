import { ThemeContextType } from '@/Models/Theme.models';
import React from 'react';

const ThemeContext = React.createContext<ThemeContextType>({
  mode: '',
  setMode: () => {},
  backgroundImage: '',
  setBackgroundImage: () => {},
});

export default ThemeContext;
