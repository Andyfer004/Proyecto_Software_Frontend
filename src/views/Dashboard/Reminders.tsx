import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { updateReminder } from "../../api/remindersApi"; // Importamos la función de la API para actualizar

type Reminder = {
  id: number;
  text: string;
  urgent: boolean;
  done: boolean;
};

const remindersList: Reminder[] = [
  { id: 1, text: "Terminar webifica", urgent: false, done: false },
  { id: 2, text: "Terminar proyecto de gráficas", urgent: true, done: false },
  { id: 3, text: "Ir al gringo", urgent: false, done: false },
];

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>(remindersList);
  const [editingId, setEditingId] = useState<number | null>(null); // Estado para saber cuál está en modo edición
  const [newReminder, setNewReminder] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editedText, setEditedText] = useState(""); // Estado para almacenar el texto editado

  const handleCheckboxToggle = (id: number) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id ? { ...reminder, done: !reminder.done } : reminder
      )
    );
  };

  const handleAddReminder = () => {
    if (newReminder.trim()) {
      setReminders([
        ...reminders,
        { id: reminders.length + 1, text: newReminder, urgent: false, done: false },
      ]);
      setNewReminder("");
      setIsAdding(false);
    }
  };

  const handleDeleteReminder = (id: number) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  };

  const handleEditReminder = (id: number) => {
    const reminderToEdit = reminders.find((reminder) => reminder.id === id);
    if (reminderToEdit) {
      setEditingId(id); // Activar modo de edición
      setEditedText(reminderToEdit.text); // Seteamos el texto actual para poder editarlo
    }
  };

  const handleUpdateReminder = async (id: number) => {
    try {
      if (editedText.trim() === "") return; // Validación para no guardar texto vacío
      await updateReminder(id, { description: editedText }); // Llamada a la API para actualizar
      setReminders((prev) =>
        prev.map((reminder) =>
          reminder.id === id ? { ...reminder, text: editedText } : reminder
        )
      );
      setEditingId(null); // Salir del modo de edición después de actualizar
    } catch (error) {
      console.error("Error al actualizar el recordatorio:", error);
      setEditingId(null); // Salir del modo de edición aunque ocurra un error
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Previene que se envíe un formulario o algún comportamiento por defecto
      handleUpdateReminder(id);
    }
  };

  return (
    <>
      <Typography variant="h6">Reminders</Typography>
      <List>
        {reminders.map((reminder) => (
          <StyledListItem key={reminder.id}>
            <Checkbox
              checked={reminder.done}
              onChange={() => handleCheckboxToggle(reminder.id)}
            />
            {editingId === reminder.id ? (
              <TextField
                fullWidth
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={() => handleUpdateReminder(reminder.id)} // Guardar al perder foco
                onKeyDown={(e) => handleKeyDown(e, reminder.id)} // Guardar al presionar Enter
                autoFocus
              />
            ) : (
              <ListItemText
                primary={reminder.text}
                onClick={() => handleEditReminder(reminder.id)} // Al hacer clic, entrar en modo edición
              />
            )}
            {reminder.urgent && (
              <Tooltip title="Urgent">
                <IconButton edge="end" size="small">
                  <InfoIcon color="warning" />
                </IconButton>
              </Tooltip>
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
        ))}
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
    </>
  );
};

export default Reminders;