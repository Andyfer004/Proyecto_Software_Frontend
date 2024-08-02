import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid,
  Popover,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

// Define the task interface
interface Task {
  id: number;
  taskName: string;
  description: string;
  priorityId: number | string;
  statusId: number | string;
  dueDate: string;
}

const Calendar: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [taskName, setTaskName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priorityId, setPriorityId] = useState<number | string>('');
  const [statusId, setStatusId] = useState<number | string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]); // Estado para almacenar las tareas
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newPriorityName, setNewPriorityName] = useState<string>('');
  const [priorities, setPriorities] = useState([
    { id: 1, name: 'Low' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'High' },
  ]);

  const statuses = [
    { id: 1, name: 'To Do' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Completed' },
  ];

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setSelectedTaskId(null); // Clear selected task for new entry
    setTaskName('');
    setDescription('');
    setPriorityId('');
    setStatusId('');
    setOpenDialog(true);
  };

  const handleEventClick = (clickInfo: any) => {
    const clickedTask = tasks.find((task) => task.id === parseInt(clickInfo.event.id, 10));

    if (clickedTask) {
      setSelectedTaskId(clickedTask.id);
      setTaskName(clickedTask.taskName);
      setDescription(clickedTask.description);
      setPriorityId(clickedTask.priorityId);
      setStatusId(clickedTask.statusId);
      setSelectedDate(clickedTask.dueDate);
      setOpenDialog(true);
    }
  };

  const handleSaveTask = () => {
    if (selectedTaskId !== null) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === selectedTaskId
          ? { ...task, taskName, description, priorityId, statusId, dueDate: selectedDate }
          : task
      ));
    } else {
      // Add new task
      const newTask: Task = {
        id: tasks.length + 1, // Simple way to generate an ID, use better approach in production
        taskName,
        description,
        priorityId,
        statusId,
        dueDate: selectedDate,
      };
      setTasks([...tasks, newTask]);
    }
    
    // Reset fields and close dialog
    setTaskName('');
    setDescription('');
    setPriorityId('');
    setStatusId('');
    setSelectedTaskId(null);
    setOpenDialog(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setNewPriorityName(''); // Reset new priority name
  };

  const handleAddPriority = () => {
    if (newPriorityName.trim()) {
      const newPriority = {
        id: priorities.length + 1,
        name: newPriorityName,
      };
      setPriorities([...priorities, newPriority]);
      handleClosePopover();
    }
  };

  // Transform tasks into events for FullCalendar
  const calendarEvents = tasks.map((task) => ({
    id: task.id.toString(),
    title: task.taskName,
    start: task.dueDate,
    description: task.description,
    extendedProps: {
      statusId: task.statusId, // Pass statusId for class name logic
    },
  }));

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={calendarEvents}
        eventClassNames={(arg) => {
          if (arg.event.extendedProps.statusId === 3) {
            return 'completed-event';
          }
          return '';
        }}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedTaskId !== null ? 'Edit Task' : 'Create Task'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Task Name"
                type="text"
                fullWidth
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priorityId}
                  onChange={(e) => setPriorityId(e.target.value as number)}
                  label="Priority"
                >
                  {priorities.map((priority) => (
                    <MenuItem key={priority.id} value={priority.id}>
                      {priority.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton onClick={handleOpenPopover}>
                <AddCircleIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusId}
                  onChange={(e) => setStatusId(e.target.value as number)}
                  label="Status"
                >
                  {statuses.map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton>
                <AddCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <DialogTitle>Add New Priority</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Priority Name"
            type="text"
            fullWidth
            value={newPriorityName}
            onChange={(e) => setNewPriorityName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopover} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPriority} color="primary">
            Add
          </Button>
        </DialogActions>
      </Popover>
    </>
  );
};

export default Calendar;
