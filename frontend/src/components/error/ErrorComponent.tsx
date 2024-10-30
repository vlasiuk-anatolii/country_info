import React from 'react';
import { Box, Alert } from '@mui/material';

interface ErrorComponentProps {
  errorMessage: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessage }) => {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        maxWidth: 600, 
        mx: 'auto',
        mt: 2,  
      }}
    >
      <Alert severity="error" sx={{ mb: 2 }}>
        {errorMessage}
      </Alert>
    </Box>
  );
};

export default ErrorComponent;
