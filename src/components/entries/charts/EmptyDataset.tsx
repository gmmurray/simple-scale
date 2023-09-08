import { Paper, Typography } from '@mui/material';

function EmptyDataset() {
  return (
    <Paper
      sx={{
        p: 2,
        height: '30vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6">No data available</Typography>
    </Paper>
  );
}

export default EmptyDataset;
