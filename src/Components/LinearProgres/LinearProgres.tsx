import { Box, LinearProgress, Fade } from '@mui/material';
import { useEffect, useState } from 'react';

interface LinearProgresProps {
  isLoading: boolean; // Recibe si está cargando o no
}

export default function LinearProgres({ isLoading }: LinearProgresProps) {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowLoader(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(true);
    }
  }, [isLoading]);

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
