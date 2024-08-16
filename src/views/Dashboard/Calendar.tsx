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

interface Subtask {
  id: number;
  name: string;
  description: string;
  priorityId: number | string;
  dueDate: string;
  timeEstimateHours: number | string;
  statusId: number | string;
}

interface Task {
  id: number;
  taskName: string;
  description: string;
  priorityId: number | string;
  statusId: number | string;
  dueDate: string;
  subtasks: Subtask[];
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
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
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
    setSelectedTaskId(null); 
    setTaskName('');
    setDescription('');
    setPriorityId('');
    setStatusId('');
    setSubtasks([]); 
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
      setSubtasks(clickedTask.subtasks || []);
      setOpenDialog(true);
    }
  };

  const handleSaveTask = () => {
    if (selectedTaskId !== null) {
      setTasks(tasks.map(task => 
        task.id === selectedTaskId
          ? { ...task, taskName, description, priorityId, statusId, dueDate: selectedDate, subtasks }
          : task
      ));
    } else {
      const newTask: Task = {
        id: tasks.length + 1,
        taskName,
        description,
        priorityId,
        statusId,
        dueDate: selectedDate,
        subtasks,
      };
      setTasks([...tasks, newTask]);
    }

    setTaskName('');
    setDescription('');
    setPriorityId('');
    setStatusId('');
    setSubtasks([]); 
    setSelectedTaskId(null);
    setOpenDialog(false);
  };

  const handleAddSubtask = () => {
    const newSubtask: Subtask = {
      id: subtasks.length + 1,
      name: '',
      description: '',
      priorityId: '',
      dueDate: '',
      timeEstimateHours: '',
      statusId: '',
    };
    setSubtasks([...subtasks, newSubtask]);
  };

  const handleSubtaskChange = (index: number, field: keyof Subtask, value: any) => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.map((subtask, i) =>
        i === index ? { ...subtask, [field]: value } : subtask
      )
    );
  };
  
  

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
      handleClosePopoverPriority();
    }
  };

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
      handleClosePopoverStatus();
    }
  };

  const calendarEvents = tasks.map((task) => ({
    id: task.id.toString(),
    title: task.taskName,
    start: task.dueDate,
    description: task.description,
    extendedProps: {
      statusId: task.statusId,
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
              <IconButton onClick={handleOpenPopoverPriority}>
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
              <IconButton onClick={handleOpenPopoverStatus}>
                <AddCircleIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleAddSubtask} color="primary">
                Add Subtask
              </Button>
            </Grid>
            {subtasks.map((subtask, index) => (
              <Grid container spacing={2} key={subtask.id}>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    label="Subtask Name"
                    type="text"
                    fullWidth
                    value={subtask.name}
                    onChange={(e) => handleSubtaskChange(index, 'name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    label="Subtask Description"
                    type="text"
                    fullWidth
                    multiline
                    rows={2}
                    value={subtask.description}
                    onChange={(e) => handleSubtaskChange(index, 'description', e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={subtask.priorityId}
                      onChange={(e) => handleSubtaskChange(index, 'priorityId', e.target.value)}
                      label="Priority"
                    >
                      {priorities.map((priority) => (
                        <MenuItem key={priority.id} value={priority.id}>
                          {priority.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    label="Due Date"
                    type="date"
                    fullWidth
                    value={subtask.dueDate}
                    onChange={(e) => handleSubtaskChange(index, 'dueDate', e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    label="Time Estimate (Hours)"
                    type="number"
                    fullWidth
                    value={subtask.timeEstimateHours}
                    onChange={(e) => handleSubtaskChange(index, 'timeEstimateHours', e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={subtask.statusId}
                      onChange={(e) => handleSubtaskChange(index, 'statusId', e.target.value)}
                      label="Status"
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            ))}
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
