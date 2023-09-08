import { Box, Button } from '@mui/material';

import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <Box sx={{ p: 4 }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>Page not found</i>
      </p>
      <p>
        <Button component={Link} to="/">
          Go home
        </Button>
      </p>
    </Box>
  );
}

export default ErrorPage;
