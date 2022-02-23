import React from 'react';
import { Button } from '@mui/material';

export function SubmitButton (prop) {
  const { handleClick } = prop;

return (
    <Button 
      variant="contained" 
      size="large" 
      onClick={() => handleClick()}>
        Submit
      </Button>
  )
}