import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh" 
      sx={{ p: 2 }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
