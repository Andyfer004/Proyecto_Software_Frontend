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
  CircularProgress,
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
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
  const { data: reminders, loading, error, createReminder, modifyReminder } = useReminders();
  const [newReminder, setNewReminder] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleCheckboxToggle = (id: number) => {
    const reminderToUpdate = reminders.find((reminder) => reminder.id === id);
    if (reminderToUpdate) {
      // Usamos la propiedad 'alarm' para marcar o desmarcar como hecho
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
        profile_id: 1, // Debes ajustar el ID del perfil según corresponda
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
        {reminders.map((reminder) => (
          <StyledListItem key={reminder.id}>
            <Checkbox
              checked={reminder.alarm} // Usamos 'alarm' para marcar como hecho
              onChange={() => handleCheckboxToggle(reminder.id)}
            />
            <ListItemText primary={reminder.description} />
            {/* Si quieres mostrar algún tooltip basado en alguna condición, puedes añadirlo aquí */}
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
      <Button onClick={handleAddReminder} disabled={!newReminder.trim()}>
        Guardar nuevo recordatorio
      </Button>
    </>
  );
};

export default Reminders;
