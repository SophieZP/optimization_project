import { Alert, AlertTitle, Box } from '@mui/material';

interface ErrorMessageProps {
  message: string;
  title?: string;
  severity?: 'error' | 'warning' | 'info';
}

export const ErrorMessage = ({
  message,
  title = 'Error',
  severity = 'error'
}: ErrorMessageProps) => {
  return (
    <Box my={2}>
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};