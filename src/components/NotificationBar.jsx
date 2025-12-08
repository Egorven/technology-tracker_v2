import { useState, createContext, useContext, useCallback } from 'React';
import { Snackbar, Alert, AlertTitle, IconButton } from '@mui/material';
import {
  CheckCircleOutline,
  ErrorOutline,
  WarningAmberOutlined,
  InfoOutlined,
  Close as CloseIcon
} from '@mui/icons-material';

const NotificationContext = createContext();

const NOTIFICATION_TYPES = {
  success: { severity: 'success', icon: <CheckCircleOutline fontSize="inherit" /> },
  error: { severity: 'error', icon: <ErrorOutline fontSize="inherit" /> },
  warning: { severity: 'warning', icon: <WarningAmberOutlined fontSize="inherit" /> },
  info: { severity: 'info', icon: <InfoOutlined fontSize="inherit" /> },
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback(({ message, title, type = 'info', autoHideDuration = 5000 }) => {
    const config = NOTIFICATION_TYPES[type] || NOTIFICATION_TYPES.info;
    setNotification({
      open: true,
      message,
      title,
      severity: config.severity,
      icon: config.icon,
      autoHideDuration,
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Snackbar
          open={notification.open}
          autoHideDuration={notification.autoHideDuration}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{

            '& .MuiSnackbarContent-root': {
              width: { xs: '100vw', sm: 'auto' },
              maxWidth: { xs: '100vw', sm: '600px' },
              margin: { xs: 0, sm: 2 },
              borderRadius: { xs: 0, sm: 4 },
            }
          }}
        >
          <Alert
            severity={notification.severity}
            icon={notification.icon}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{
              width: '100%',
              fontSize: '0.9rem',
            }}
          >
            {notification.title && (
              <AlertTitle sx={{ fontWeight: 'bold' }}>{notification.title}</AlertTitle>
            )}
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
};