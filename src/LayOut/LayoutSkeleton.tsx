import { MainSkeleton } from '@/Components';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
export default function LayoutSkeleton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100dvh',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '64px',
            backgroundColor: '#121212',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: '16px',
            paddingLeft: '16px',
          }}
        >
          <Skeleton
            sx={{ bgcolor: 'grey.800' }}
            variant="circular"
            width={20}
            height={20}
          />

          <Skeleton
            sx={{ bgcolor: 'grey.800' }}
            variant="circular"
            width={40}
            height={40}
          />
        </Box>

        <Box
          sx={{
            marginTop: '64px',
            flex: 1,
            width: '100%',
            display: 'flex',
            backgroundColor: 'black',
            overflow: 'hidden',
          }}
        >
          {isMobile ? null : (
            <Box
              sx={{
                width: '64px',
                height: '100vh',
                paddingX: '3px',
                backgroundColor: '#121212',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
            >
              {[...Array(7)].map((_, index) => (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  key={index}
                  sx={{
                    width: '100%',
                    height: '35px',
                    bgcolor: 'grey.900',
                    display: 'flex',
                    justifyContent: 'end',
                    borderRadius: '5px',
                  }}
                ></Skeleton>
              ))}
            </Box>
          )}

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '16px',
              overflowY: 'hidden',
            }}
          >
            <MainSkeleton />
          </Box>
        </Box>
      </Box>
    </>
  );
}
