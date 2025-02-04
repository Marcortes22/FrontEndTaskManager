import globalStyles from '@/Styles/globals.module.css';
import { Box, Skeleton } from '@mui/material';
export default function MainSkeleton() {
  return (
    <>
      <Box className={globalStyles.pageContainer}>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Skeleton
                variant="text"
                sx={{ fontSize: '40px', width: '20%', bgcolor: 'grey.900' }}
              />

              <Skeleton
                sx={{ bgcolor: 'grey.800' }}
                variant="circular"
                width={20}
                height={20}
              />
            </Box>

            <Skeleton
              variant="text"
              sx={{ fontSize: '20px', width: '30%', bgcolor: 'grey.900' }}
            />
          </Box>

          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: '35px',
              bgcolor: 'grey.900',
              display: 'flex',
              justifyContent: 'end',
              borderRadius: '5px',
            }}
          ></Skeleton>
        </Box>
      </Box>
    </>
  );
}
