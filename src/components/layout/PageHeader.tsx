import { Box, IconButton, Tooltip, Typography } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEntriesProvider } from '../../data/entries/entriesContext';

type Props = {
  title: string;
};

function PageHeader({ title }: Props) {
  const { toggleAddDialog } = useEntriesProvider();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box>
        <Typography variant="h2" component="h1" id="back-to-top-anchor">
          {title}
        </Typography>
      </Box>
      <Box sx={{ ml: 'auto' }}>
        <Tooltip title="Add weight entry">
          <IconButton edge="end" onClick={toggleAddDialog}>
            <AddCircleIcon fontSize="large" color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default PageHeader;
