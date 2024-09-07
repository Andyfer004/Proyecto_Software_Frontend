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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import useReminders from "src/common/Hooks/useReminders";

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
  const [editingId, setEditingId] = useState<number | null>(null); // Estado para saber cuál está en modo edición
  const [editedText, setEditedText] = useState(""); // Estado para almacenar el texto editado

  // Asegúrate de acceder a data.reminders
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
        datereminder: new Date().toISOString().split("T")[0], // Ajustar según el formato necesario
        hourreminder: new Date().toISOString().split("T")[1].substring(0, 5),
        profileid: 1, // Ajusta el ID del perfil según corresponda
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
      setEditingId(id); // Activar modo de edición
      setEditedText(reminderToEdit.description); // Setear el texto actual para poder editarlo
    }
  };

  const handleUpdateReminder = async (id: number) => {
    try {
      if (editedText.trim() === "") return; // Validación para no guardar texto vacío
      await modifyReminder(id, { description: editedText }); // Llamada a la API para actualizar
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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <Typography variant="h6">Reminders</Typography>
      <List>
        {Array.isArray(reminders) && reminders.length > 0 ? (
          reminders.map((reminder: any) => (
            <StyledListItem key={reminder.id}>
              <Checkbox
                checked={reminder.alarm} // Usamos 'alarm' para marcar como hecho
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
                  primary={reminder.description}
                  onClick={() => handleEditReminder(reminder.id)} // Al hacer clic, entrar en modo edición
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
