import React, { useEffect, useState } from 'react';
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
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import './Calendar.css';
import useStatus from '../../common/Hooks/useStatus'; // Asegúrate de que la ruta sea correcta
import usePriorities from 'src/common/Hooks/usePriorities';
import useEvents from 'src/common/Hooks/useEvents';
import useTasks from 'src/common/Hooks/useTasks';

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

  const { data: tasksData, loading, error, createTask, modifyTask, removeTask } = useTasks();


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

  useEffect(() => {
    if (tasksData) {
      const mappedTasks = tasksData.map((task:any) => ({
        id: task.id,
        taskName: task.name, // Assuming 'name' holds the task name
        description: task.description,
        priorityId: 1,
        statusId: 1,
        dueDate: task.duedate,
        subtasks: [], // Assuming you manage subtasks separately
      }));
      setTasks(mappedTasks);
    }
  }, [tasksData]);



  const handleSaveTask = async () => {
    if (selectedTaskId !== null) {
      // Update existing task using modifyTask
      try {
        await modifyTask(selectedTaskId, {
          name: taskName,
          description,
          priorityid: priorityId,
          statusid: statusId,
          duedate: selectedDate,
        });
      } catch (error) {
        console.error('Error updating task:', error);
      }
    } else {
      // Create a new task using createTask
      const newTask = {
        name: taskName,
        description,
        priorityid: priorityId || 1, // Replace with the actual priority ID
        statusid: statusId || 1,     // Replace with the actual status ID
        duedate: selectedDate,
        profileid: 1,                // Replace with the actual profile ID
        timeestimatehours: 1.0       // Replace with the actual estimated hours if available
      };

      try {
        await createTask(newTask);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }

    // Reset fields and close dialog
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
      setPriorityId(newPriority.id); // Set new priority as selected
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

  const { createStatus } = useStatus(); 
  const { createPriority } = usePriorities(); 

  const handleAddStatus = async () => {
    if (newStatusName.trim()) {
      try {
        // Agregar el estado utilizando el hook y la API
        const newStatus = {
        id: statuses.length + 1,
        name: newStatusName,
      };
        await createStatus({ statusname: newStatusName });
        setStatuses([...statuses, newStatus]);
        setStatusId(newStatus.id); // Set the new status as selected
        setNewStatusName('');
      } catch (error) {
        console.error('Error al agregar el estado:', error);
      } finally {
        handleClosePopoverStatus();
      }
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

  const handleEventDrop = (info: { event: any; }) => {
    const { event } = info;
    const updatedTaskId = parseInt(event.id, 10);

    setTasks(tasks.map(task =>
      task.id === updatedTaskId
        ? { ...task, dueDate: event.startStr }
        : task
    ));
  };

  const handleEventResize = (info: { event: any; }) => {
    const { event } = info;
    const updatedTaskId = parseInt(event.id, 10);

    setTasks(tasks.map(task =>
      task.id === updatedTaskId
        ? { ...task, dueDate: event.startStr }
        : task
    ));
  };

  const handleAddNewPriority = async () =>  {
    
    if (newPriorityName.trim()) {
      try {
        // Agregar el estado utilizando el hook y la API
        const newPriority = {
        id: priorities.length + 1,
        name: newPriorityName,
      };
        await createPriority({ namepriority: newPriorityName });
        setPriorities([...priorities, newPriority]);
        setPriorityId(newPriority.id); // Set the new priority as selected
        setNewPriorityName('');
      } catch (error) {
        console.error('Error al agregar el estado:', error);
      } finally {
        handleClosePopoverStatus();
      }
    }
  };



  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true} // Habilitar arrastrar y soltar
        droppable={true} // Habilitar soltar en otro día
        events={calendarEvents}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        eventClassNames={(arg) => {
          if (arg.event.extendedProps.statusId === 3) {
            return 'completed-event';
          }
          return '';
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
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
                            <IconButton onClick={handleAddNewPriority}>
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
        setNewStatusName(''); // Limpiar si selecciona un estado existente
      }
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Status"
        value={newStatusName}  // Aseguramos que el valor sea el correcto
        onChange={(e) => setNewStatusName(e.target.value)}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {params.InputProps.endAdornment}
              <IconButton
                onClick={handleAddStatus}
              >
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
