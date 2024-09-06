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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
  const { data, loading, error, createReminder, modifyReminder } = useReminders();
  const [newReminder, setNewReminder] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Asegúrate de acceder a data.reminders
  const reminders = data?.reminders || [];

  const handleCheckboxToggle = (id: number) => {
    const reminderToUpdate = reminders.find((reminder: any) => reminder.id === id);
    if (reminderToUpdate) {
      modifyReminder(id, { alarm: !reminderToUpdate.alarm });
    }
  };

  const handleAddReminder = () => {
    if (newReminder.trim()) {
      createReminder({
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
              <ListItemText primary={reminder.description} />
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
