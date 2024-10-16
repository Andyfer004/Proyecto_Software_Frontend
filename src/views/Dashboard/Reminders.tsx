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
import CircleIcon from "@mui/icons-material/Circle"; // Ícono de círculo para mostrar la prioridad
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

// Función para obtener el color según la prioridad
const getPriorityColor = (priorityid: any) => {

  const id = parseInt(priorityid);


  switch (id) {
    case 1:
      return "red"; // Alta prioridad
    case 2:
      return "orange"; // Media prioridad
    case 3:
      return "green"; // Baja prioridad
    default:
      return "grey"; // Sin prioridad
  }
};

// Tareas completadas quemadas
const completedTasks = [
  { id: 1001, description: "Tarea Discreta ", alarm: true, priorityid: 1, completed: true },
  { id: 1002, description: "Tarea Ing Software", alarm: false, priorityid: 2, completed: true },
];

const Reminders: React.FC = () => {
  const { data, loading, error, createReminder, modifyReminder, removeReminder } = useReminders();
  const [newReminder, setNewReminder] = useState("");
  const [priorityid, setPriorityid] = useState(1); // Prioridad por defecto (1: Alta)
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const [sortType, setSortType] = useState("today");
  const [showCompleted, setShowCompleted] = useState(false); // Estado para mostrar/ocultar tareas completadas quemadas

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
        profileid: 1, // Asegúrate de que este perfil existe
        priorityid,  // Agregar el id de prioridad
      });
      setNewReminder("");
      setPriorityid(1); // Resetear la prioridad por defecto
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

      {/* Lista de recordatorios */}
      <List>
        {Array.isArray(sortedReminders) && sortedReminders.length > 0 ? (
          sortedReminders.map((reminder: any) => (
            <StyledListItem key={reminder.id}>
              <Checkbox
                checked={reminder.alarm}
                onChange={() => handleCheckboxToggle(reminder.id)}
              />
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

      {/* Botón para mostrar/ocultar tareas completadas quemadas */}
      <Button
        onClick={() => setShowCompleted(!showCompleted)}
        style={{ marginTop: "20px" }}
      >
        {showCompleted ? "Ocultar completados" : "Mostrar completados"}
      </Button>

      {/* Mostrar tareas completadas quemadas */}
      {showCompleted && (
        <List>
          {completedTasks.map((task) => (
            <StyledListItem key={task.id}>
              <Checkbox checked={task.completed} disabled />
              <CircleIcon style={{ color: getPriorityColor(task.priorityid), marginRight: 8 }} />
              <ListItemText primary={task.description} />
            </StyledListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default Reminders;
