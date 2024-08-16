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
import { styled } from "@mui/material/styles";

type Reminder = {
  id: number;
  text: string;
  urgent: boolean;
  done: boolean;
};

const remindersList: Reminder[] = [
  { id: 1, text: "Terminar webifica", urgent: false, done: false },
  { id: 2, text: "Terminar proyecto de gráficas", urgent: true, done: false },
  { id: 3, text: "Terminar sprint", urgent: false, done: false },
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
  const [newReminder, setNewReminder] = useState("");
  const [isAdding, setIsAdding] = useState(false);

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
            <ListItemText primary={reminder.text} />
            {reminder.urgent && (
              <Tooltip title="Urgent">
                <IconButton edge="end" size="small">
                  <InfoIcon color="warning" />
                </IconButton>
              </Tooltip>
            )}
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
