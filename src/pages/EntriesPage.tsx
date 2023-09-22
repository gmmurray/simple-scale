import {
  Box,
  Button,
  Checkbox,
  Chip,
  Link as MUILink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Fragment, useCallback, useState } from 'react';
import {
  getDiffInfo,
  getOverallWeightGoal,
  isAtOrPastWeightGoal,
  sortEntries,
} from '../data/appData';

import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import dayjs from 'dayjs';
import { roundToOneDecimal } from '../util/mathUtil';
import { useEntriesProvider } from '../data/entries/entriesContext';
import { useSettingsProvider } from '../data/settings/settingsContext';

function EntriesPage() {
  const { settings } = useSettingsProvider();
  const { entries, selectEntry, toggleCsvDialog, update } =
    useEntriesProvider();

  const [deleteIds, setDeleteIds] = useState<Set<string>>(new Set());

  const visibleEntries = sortEntries(entries);
  const overallWeightGoal = getOverallWeightGoal(settings);
  const firstGoalEntry = sortEntries(entries, 'asc').find(entry =>
    isAtOrPastWeightGoal(entry, settings),
  );

  const handleUpdateDeleteIdsClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, entryId: string) => {
      event.stopPropagation();
      setDeleteIds(state => {
        const newState = new Set(state.values());
        if (newState.has(entryId)) {
          newState.delete(entryId);
        } else {
          newState.add(entryId);
        }
        return newState;
      });
    },
    [],
  );

  const handleToggleAllDeleteIds = useCallback(() => {
    setDeleteIds(state => {
      const newState = new Set<string>();

      if (state.size !== entries.length) {
        entries.forEach(e => newState.add(e.id));
      }

      return newState;
    });
  }, [entries]);

  const handleDeleteClick = useCallback(async () => {
    const confirmed = confirm(
      `Are you sure you want to delete these entries? This cannot be undone`,
    );
    if (!confirmed) {
      return;
    }

    const updatedEntries = entries.filter(e => !deleteIds.has(e.id));
    await update(updatedEntries);
    setDeleteIds(new Set<string>());
  }, [deleteIds, entries, update]);

  return (
    <Fragment>
      <Toolbar variant="dense">
        {deleteIds.size > 0 ? (
          <Fragment>
            <Typography variant="body1">{`${deleteIds.size} selected`}</Typography>
            <Button
              sx={{ ml: 'auto' }}
              color="error"
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            {settings.goals.weight && (
              <MUILink
                variant="body1"
                color="text.secondary"
                component={Link}
                to="/settings#goals-weight"
              >
                {`Goal Weight: ${settings.goals.weight.end} ${settings.goals.weight.unit}`}
              </MUILink>
            )}
            <MUILink
              component="button"
              onClick={toggleCsvDialog}
              sx={{ ml: 'auto' }}
            >
              Import/Export
            </MUILink>
          </Fragment>
        )}
      </Toolbar>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {!!firstGoalEntry && (
                <TableCell align="center" padding="checkbox"></TableCell>
              )}
              <TableCell align="center" padding="checkbox">
                <Checkbox
                  indeterminate={
                    deleteIds.size > 0 && deleteIds.size !== entries.length
                  }
                  checked={deleteIds.size === entries.length}
                  onClick={handleToggleAllDeleteIds}
                />
              </TableCell>
              <TableCell align="center">
                <Typography variant="overline" color="text.secondary">
                  Date
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="overline" color="text.secondary">
                  Weight
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="overline" color="text.secondary">
                  Change
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleEntries.map((entry, index) => {
              const diffInfo = getDiffInfo(
                entry,
                visibleEntries[index + 1],
                overallWeightGoal,
              );
              return (
                <TableRow
                  key={index}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => selectEntry(entry)}
                >
                  {!!firstGoalEntry && (
                    <TableCell align="center" padding="checkbox">
                      {firstGoalEntry.id === entry.id && (
                        <Box
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <Tooltip title="You reached your goal with this entry">
                            <StarIcon color="primary" />
                          </Tooltip>
                        </Box>
                      )}
                    </TableCell>
                  )}
                  <TableCell align="center" padding="checkbox">
                    <Checkbox
                      onClick={event =>
                        handleUpdateDeleteIdsClick(event, entry.id)
                      }
                      checked={deleteIds.has(entry.id)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {dayjs(entry.timestamp).toDate().toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">{`${roundToOneDecimal(
                    entry.value,
                  )} ${entry.unit}`}</TableCell>
                  <TableCell align="center">
                    {!!diffInfo && (
                      <Chip
                        label={`${
                          diffInfo.diff > 0
                            ? `+${diffInfo.diff}`
                            : diffInfo.diff
                        } ${entry.unit}`}
                        color={diffInfo.desirable ? 'success' : 'error'}
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

export default EntriesPage;
