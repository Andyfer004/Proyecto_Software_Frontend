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
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/material/styles";
import useReminders from "../../common/Hooks/useReminders";
import CheckIcon from "@mui/icons-material/Check";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: "background-color 0.3s ease, text-decoration 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));

// Función para obtener el color según la prioridad
const getPriorityColor = (priorityid: number) => {
  switch (priorityid) {
    case 1:
      return "red";
    case 2:
      return "orange";
    case 3:
      return "green";
    default:
      return "grey";
  }
};

const Reminders: React.FC = () => {
  const { data, loading, error, createReminder, modifyReminder, removeReminder } = useReminders();
  const [newReminder, setNewReminder] = useState("");
  const [priorityid, setPriorityid] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const [sortType, setSortType] = useState("today");
  const reminders = data || [];

  const handleAddReminder = async () => {
    const selectedProfileId = localStorage.getItem("selectedProfile"); // Obtener el profileid guardado
    if (!newReminder.trim() || !selectedProfileId) return;
  
    await createReminder({
      description: newReminder,
      alarm: false,
      datereminder: new Date().toISOString().split("T")[0],
      hourreminder: new Date().toISOString().split("T")[1].substring(0, 5),
      profileid: parseInt(selectedProfileId, 10), // Usar el profileid del perfil seleccionado
      priorityid,
    });
  
    setNewReminder("");
    setPriorityid(1);
    setIsAdding(false);
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
    if (editedText.trim() === "") return;
    await modifyReminder(id, { description: editedText });
    setEditingId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdateReminder(id);
    }
  };

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
    <Box className='mt-4'>
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
              <Checkbox />
              <CircleIcon
                style={{ color: getPriorityColor(reminder.priorityid), marginRight: 8 }}
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
              autoFocus
            />
            <FormControl fullWidth>
              <InputLabel id="priority-label">Prioridad</InputLabel>
              <Select
                labelId="priority-label"
                value={priorityid}
                onChange={(e) => setPriorityid(Number(e.target.value))}
                label="Prioridad"
              >
                <MenuItem value={1}>Alta</MenuItem>
                <MenuItem value={2}>Media</MenuItem>
                <MenuItem value={3}>Baja</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={handleAddReminder} disabled={!newReminder.trim()}>
              Guardar
            </Button>
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
    </Box>
  );
};

export default Reminders;
