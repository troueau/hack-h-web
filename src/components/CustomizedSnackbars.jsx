import React, { useContext, useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { UserContext } from '../UserContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const { authenticatedUser, afterClose } = useContext(UserContext);
// const [open, setOpen] = useState(true);

  const handleClose = () => {
    afterClose();
  };
 
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar 
          open={authenticatedUser?.snack?.isOpen} 
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            <span style={{fontSize: '1.5em'}}>{authenticatedUser?.snack?.message}</span>
        </Alert>
      </Snackbar>
    </Stack>
  );
}