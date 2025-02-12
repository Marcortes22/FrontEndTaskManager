import { Box, LinearProgress, Fade } from '@mui/material';
import { useLinearProgres } from './Hook/useLinearProgres';

export default function LinearProgres({ isLoading }: { isLoading: boolean }) {
  const { showLoader } = useLinearProgres(isLoading);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        top: 64,
      }}
    >
      <Fade in={isLoading || showLoader} timeout={500}>
        <LinearProgress color="inherit" />
      </Fade>
    </Box>
  );
}
