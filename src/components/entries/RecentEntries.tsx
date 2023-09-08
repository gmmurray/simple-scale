import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Entry, sortEntries } from '../../data/appData';

import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { roundToOneDecimal } from '../../util/mathUtil';
import { useEntriesProvider } from '../../data/entries/entriesContext';
import { useMemo } from 'react';

function RecentEntries() {
  const { entries, selectEntry } = useEntriesProvider();
  const recent = useMemo(() => getRecent(entries), [entries]);
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h5">Recent entries</Typography>
        <Button component={Link} to="/entries" sx={{ ml: 'auto' }}>
          View all
        </Button>
      </Box>
      <List>
        {recent.map(entry => {
          return (
            <ListItem key={entry.id} disablePadding>
              <ListItemButton onClick={() => selectEntry(entry)}>
                <ListItemText
                  primary={dayjs(entry.timestamp).toDate().toLocaleDateString()}
                  secondary={`${roundToOneDecimal(entry.value)} ${entry.unit}`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default RecentEntries;

const getRecent = (entries: Entry[]) =>
  sortEntries(entries)
    .filter(entry => dayjs().isAfter(dayjs(entry.timestamp)))
    .slice(0, 3);
