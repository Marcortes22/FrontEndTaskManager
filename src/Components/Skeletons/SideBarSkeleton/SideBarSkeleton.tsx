import { Box, Skeleton } from '@mui/material';

export default function SideBarSkeleton() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {[...Array(7)].map((_, index) => (
          <Skeleton
            variant="rectangular"
            animation="wave"
            key={index}
            sx={{
              width: '100%',
              height: '35px',
              bgcolor: 'grey.900',
              borderRadius: '5px',
            }}
          ></Skeleton>
        ))}
      </Box>
    </>
  );
}
