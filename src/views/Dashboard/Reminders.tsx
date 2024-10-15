import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  Button,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import useReminders from "../../common/Hooks/useReminders";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));

const Reminders: React.FC = () => {
  const { data, loading, error, createReminder, modifyReminder, removeReminder } = useReminders();
  const [newReminder, setNewReminder] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const [sortType, setSortType] = useState("today");

  const reminders = data?.reminders || [];

  const handleCheckboxToggle = (id: number) => {
    const reminderToUpdate = reminders.find((reminder: any) => reminder.id === id);
    if (reminderToUpdate) {
      modifyReminder(id, { alarm: !reminderToUpdate.alarm });
    }
  };

  const handleAddReminder = async () => {
    if (newReminder.trim()) {
      await createReminder({
        description: newReminder,
        alarm: false,
        datereminder: new Date().toISOString().split("T")[0],
        hourreminder: new Date().toISOString().split("T")[1].substring(0, 5),
        profileid: 1,
      });
      setNewReminder("");
      setIsAdding(false);
    }
  };

  const handleDeleteReminder = async (id: number) => {
    await removeReminder(id);
  };

  const handleEditReminder = (id: number) => {
    const reminderToEdit = reminders.find((reminder: any) => reminder.id === id);
    if (reminderToEdit) {
      setEditingId(id);
      setEditedText(reminderToEdit.description);
    }
  };

  const handleUpdateReminder = async (id: number) => {
    try {
      if (editedText.trim() === "") return;
      await modifyReminder(id, { description: editedText });
      setEditingId(null);
    } catch (error) {
      console.error("Error al actualizar el recordatorio:", error);
      setEditingId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdateReminder(id);
    }
  };

  // Sorting logic
  const sortedReminders = [...reminders].sort((a, b) => {
    if (sortType === "today") {
      return new Date(a.datereminder).getTime() - new Date(b.datereminder).getTime();
    } else if (sortType === "alphabetical") {
      return a.description.localeCompare(b.description);
    }
    return 0;
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <Typography variant="h6">Reminders</Typography>
      <FormControl fullWidth variant="outlined" margin="dense">
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          label="Sort By"
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="alphabetical">Alphabetical</MenuItem>
        </Select>
      </FormControl>
      <List>
        {Array.isArray(sortedReminders) && sortedReminders.length > 0 ? (
          sortedReminders.map((reminder: any) => (
            <StyledListItem key={reminder.id}>
              <Checkbox
                checked={reminder.alarm}
                onChange={() => handleCheckboxToggle(reminder.id)}
              />
              {editingId === reminder.id ? (
                <TextField
                  fullWidth
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  onBlur={() => handleUpdateReminder(reminder.id)}
                  onKeyDown={(e) => handleKeyDown(e, reminder.id)}
                  autoFocus
                />
              ) : (
                <ListItemText
                  primary={reminder.description}
                  onClick={() => handleEditReminder(reminder.id)}
                />
              )}
              <Tooltip title="Eliminar">
                <IconButton
                  edge="end"
                  size="small"
                  onClick={() => handleDeleteReminder(reminder.id)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            </StyledListItem>
          ))
        ) : (
          <Typography>No hay recordatorios disponibles</Typography>
        )}
        {isAdding ? (
          <StyledListItem>
            <TextField
              fullWidth
              placeholder="Nuevo recordatorio..."
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
              onBlur={handleAddReminder}
              autoFocus
            />
          </StyledListItem>
        ) : (
          <StyledListItem onClick={() => setIsAdding(true)}>
            <IconButton edge="start">
              <AddIcon />
            </IconButton>
            <ListItemText primary="Agregar recordatorio" />
          </StyledListItem>
        )}
      </List>
      <Button onClick={handleAddReminder} disabled={!newReminder.trim()}>
        Guardar nuevo recordatorio
      </Button>
    </>
  );
};

export default Reminders;
