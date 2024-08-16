import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  IconButton,
  Grid,
  Popover,
  Autocomplete,
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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [anchorElPriority, setAnchorElPriority] = useState<null | HTMLElement>(null);
  const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(null);
  const [newPriorityName, setNewPriorityName] = useState<string>('');
  const [newStatusName, setNewStatusName] = useState<string>('');
  const [priorities, setPriorities] = useState([
    { id: 1, name: 'Low' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'High' },
  ]);

  const [statuses, setStatuses] = useState([
    { id: 1, name: 'To Do' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Completed' },
  ]);

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

  // Functions for handling priority popover
  const handleOpenPopoverPriority = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElPriority(event.currentTarget);
  };

  const handleClosePopoverPriority = () => {
    setAnchorElPriority(null);
    setNewPriorityName(''); // Reset new priority name
  };

  const handleAddPriority = () => {
    if (newPriorityName.trim()) {
      const newPriority = {
        id: priorities.length + 1,
        name: newPriorityName,
      };
      setPriorities([...priorities, newPriority]);
      setPriorityId(newPriority.id); // Set the new priority as selected
      handleClosePopoverPriority();
    }
  };

  // Functions for handling status popover
  const handleOpenPopoverStatus = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElStatus(event.currentTarget);
  };

  const handleClosePopoverStatus = () => {
    setAnchorElStatus(null);
    setNewStatusName(''); // Reset new status name
  };

  const handleAddStatus = () => {
    if (newStatusName.trim()) {
      const newStatus = {
        id: statuses.length + 1,
        name: newStatusName,
      };
      setStatuses([...statuses, newStatus]);
      setStatusId(newStatus.id); // Set the new status as selected
      handleClosePopoverStatus();
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
                <Autocomplete
                  freeSolo
                  options={priorities}
                  getOptionLabel={(option) => typeof option === 'object' ? option.name : ''}
                  value={priorities.find(p => p.id === priorityId) || null}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      setNewPriorityName(newValue);
                    } else if (newValue && newValue.id) {
                      setPriorityId(newValue.id);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Priority"
                      value={newPriorityName}
                      onChange={(e) => setNewPriorityName(e.target.value)}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {params.InputProps.endAdornment}
                            <IconButton onClick={handleAddPriority}>
                              <AddCircleIcon />
                            </IconButton>
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="dense">
                <Autocomplete
                  freeSolo
                  options={statuses}
                  getOptionLabel={(option) => typeof option === 'object' ? option.name : ''}
                  value={statuses.find(s => s.id === statusId) || null}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      setNewStatusName(newValue);
                    } else if (newValue && newValue.id) {
                      setStatusId(newValue.id);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Status"
                      value={newStatusName}
                      onChange={(e) => setNewStatusName(e.target.value)}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {params.InputProps.endAdornment}
                            <IconButton onClick={handleAddStatus}>
                              <AddCircleIcon />
                            </IconButton>
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>
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

      {/* Popover for adding new priority */}
      <Popover
        open={Boolean(anchorElPriority)}
        anchorEl={anchorElPriority}
        onClose={handleClosePopoverPriority}
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
          <Button onClick={handleClosePopoverPriority} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPriority} color="primary">
            Add
          </Button>
        </DialogActions>
      </Popover>

      {/* Popover for adding new status */}
      <Popover
        open={Boolean(anchorElStatus)}
        anchorEl={anchorElStatus}
        onClose={handleClosePopoverStatus}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <DialogTitle>Add New Status</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Status Name"
            type="text"
            fullWidth
            value={newStatusName}
            onChange={(e) => setNewStatusName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopoverStatus} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddStatus} color="primary">
            Add
          </Button>
        </DialogActions>
      </Popover>
    </>
  );
};

export default Calendar;
