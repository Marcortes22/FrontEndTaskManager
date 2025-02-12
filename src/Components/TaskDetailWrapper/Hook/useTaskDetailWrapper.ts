import { Anchor } from '@/Types/Types';
import { useMediaQuery, useTheme } from '@mui/material';

export function useTaskDetailWrapper() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const anchor: Anchor = isMobile ? 'bottom' : 'right';
  return { anchor, isMobile };
}
