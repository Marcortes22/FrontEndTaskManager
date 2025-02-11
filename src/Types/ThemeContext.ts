export type ThemeContextType = {
  mode: string;
  setMode: (mode: string) => void;
  backgroundImage: string;
  setBackgroundImage: (backgroundImage: string) => void;
  backgroundIsChanging: boolean;
  setBackgroundIsChanging: (backgroundIsChanging: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};
