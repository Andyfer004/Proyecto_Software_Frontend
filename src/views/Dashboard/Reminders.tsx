import React, { useEffect, useState } from "react";
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
import usePriorities from "src/common/Hooks/usePriorities";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: "background-color 0.3s ease, text-decoration 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));

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
  const { data, loading, error, createReminder, toggleReminderStatus, removeReminder } = useReminders();
  const { data: prioritiesData, loading: prioritiesLoading, error: prioritiesError } = usePriorities();

  const [newReminder, setNewReminder] = useState("");
  const [priorityid, setPriorityid] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const [completedReminders, setCompletedReminders] = useState<any[]>([]);
  const [incompleteReminders, setIncompleteReminders] = useState<any[]>([]);


  const priorities = prioritiesData || [];


  const handleAddReminder = async () => {
    const selectedProfileId = localStorage.getItem("selectedProfile");
    if (!newReminder.trim() || !selectedProfileId) return;

    await createReminder({
      description: newReminder,
      alarm: false,
      datereminder: new Date().toISOString().split("T")[0],
      hourreminder: new Date().toISOString().split("T")[1].substring(0, 5),
      profileid: parseInt(selectedProfileId, 10),
      priorityid,
      status: 'incomplete',
      completed:"1"
    });

    setNewReminder("");
    setPriorityid(1);
    setIsAdding(false);
  };

  const handleDeleteReminder = async (id: number) => {
    await removeReminder(id);
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    console.log(`Handle Toggle Status: Reminder ID ${id}, Current Status: ${currentStatus}`);
    await toggleReminderStatus(id, currentStatus);
  };
  console.log(data);
  
  useEffect(() => {
    // Actualiza las listas cuando `data` cambie
    const completed:any[] = data.filter((reminder) => reminder.completed === "0");
    const incomplete:any[] = data.filter((reminder) => reminder.completed === "1");

    setCompletedReminders(completed);
    setIncompleteReminders(incomplete);

    console.log("reminders incomplete:",incompleteReminders)
  }, [data]); // `data` como dependencia para actualizar cuando cambie


  // Calcula el progreso en base a los recordatorios completados
  const progress = data.length > 0 ? (completedReminders.length / data.length) * 100 : 0;

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box className='mt-4'>
      <Typography variant="h6">Reminders</Typography>
      <FormControl fullWidth variant="outlined" margin="dense">
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select labelId="sort-label" value="today" label="Sort By">
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="alphabetical">Alphabetical</MenuItem>
        </Select>
      </FormControl>

      {/* Barra de progreso de recordatorios completados */}
      <Box display="flex" flexDirection="column" alignItems="center" mt={3} mb={3}>
        <CircularProgress variant="determinate" value={progress} size={100} />
        <Typography variant="caption" component="div" color="textSecondary" mt={1}>
          {`${Math.round(progress)}% completado`}
        </Typography>
      </Box>

      <List>
        {incompleteReminders.map((reminder) => (
          <StyledListItem key={reminder.id}>
            <Checkbox
              checked={reminder.status === 'complete'}
              onChange={() => handleToggleStatus(reminder.id, reminder.status)}
            />
            <CircleIcon style={{ color: getPriorityColor(reminder.priorityid), marginRight: 8 }} />
            <ListItemText primary={reminder.description} />
            <Tooltip title="Eliminar">
              <IconButton edge="end" size="small" onClick={() => handleDeleteReminder(reminder.id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </StyledListItem>
        ))}
      </List>

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
                  {priorities.map((priority) => (
                    <MenuItem key={priority.id} value={priority.id}>
                      {priority.namepriority}
                    </MenuItem>
                  ))}
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

      {completedReminders.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Reminders Completados</Typography>
          <List>
            {completedReminders.map((reminder) => (
              <StyledListItem key={reminder.id}>
                <Checkbox checked disabled />
                <CircleIcon style={{ color: getPriorityColor(reminder.priorityid), marginRight: 8 }} />
                <ListItemText primary={reminder.description} />
                <Tooltip title="Eliminar">
                  <IconButton edge="end" size="small" onClick={() => handleDeleteReminder(reminder.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              </StyledListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Reminders;