import React, { useState } from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import TuneIcon from '@mui/icons-material/Tune';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import AddCircle from '@mui/icons-material/AddCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigation as useNativeNavigation } from '@react-navigation/native';
import { useNavigate as useWebNavigate } from 'react-router-dom';
import { Platform } from 'react-native';
import LoginIcon from '@mui/icons-material/Login';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Badge from '@mui/material/Badge';
import ServiceToken from './ServiceToken';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const drawerWidth = 240;

const drawerItems = [
  { name: 'Login', icon: LoginIcon, route: 'login' },
  { name: 'Home', icon: HomeIcon, route: '' },
  { name: 'Notes', icon: EventNoteIcon, route: 'notes' },
  { name: 'Add', icon: AddCircle, route: 'add-profile' },
  { name: 'Preferences', icon: TuneIcon, route: 'preferences' }

];

const SidebarGeneral = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setDialogOpen(true); // Abre el diálogo de confirmación
  };

  const confirmLogout = () => {
    ServiceToken.clearToken(); // Elimina el token guardado, si es necesario
    localStorage.clear();
    // Redirigir al usuario a la vista de login
    navigateTo('login'); // Esto redirige a la ruta de login
    setDialogOpen(false);
    handleMenuClose();
  };

  const cancelLogout = () => {
    setDialogOpen(false); // Cierra el diálogo sin hacer logout
  };

  const handleUpdateAccount = () => {
    navigateTo("update-account");
    handleMenuClose();
  };

  const theme = useTheme();
  const webNavigation = Platform.OS === 'web' ? useWebNavigate() : null;
  const nativeNavigation = Platform.OS !== 'web' ? useNativeNavigation() : null;

  const navigateTo = (route: string) => {
    if (Platform.OS === 'web' && webNavigation) {
      webNavigation(`/${route.toLowerCase()}`);
    } else if (nativeNavigation) {
      nativeNavigation.navigate(route as never);
    }
  };

  

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Navigation
          </Typography>

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <Badge
              badgeContent={34}
              max={999}
              color="error"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{ mr: 2 }}
            >
              <WhatshotIcon sx={{ color: "orange", fontSize: 40 }} />
            </Badge>
            <IconButton color="inherit" onClick={handleMenuClick}>
              <AccountCircle fontSize="large" />
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" >Logout</Typography>
            </MenuItem>
            <MenuItem onClick={handleUpdateAccount}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Update Account
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => navigateTo(item.route)}>
                <ListItemIcon>
                  {React.createElement(item.icon)}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Diálogo de confirmación de logout */}
      <Dialog open={dialogOpen} onClose={cancelLogout}>
  <DialogContent 
    sx={{ 
      textAlign: 'center', 
      padding: '2rem', 
      border: '1px solid #ccc', // Borde alrededor de la card
      borderRadius: '8px', // Bordes redondeados
      marginTop: '-1rem', // Mover la card más arriba
    }}
  >
    {/* Ícono de logout */}
    <ExitToAppIcon sx={{ fontSize: '3rem', color: 'rgb(34, 139, 34)', marginBottom: '1rem' }} />
    
    {/* Título */}
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(33, 33, 33)', marginBottom: '1rem' }}>
      Logout
    </Typography>

    {/* Mensaje */}
    <DialogContentText sx={{ fontSize: '1rem', color: 'rgb(85, 85, 85)', marginBottom: '1.5rem' }}>
      Are you sure you want to logout?
    </DialogContentText>
  </DialogContent>

  {/* Botones de acción */}
  <DialogActions sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    <Button 
      onClick={confirmLogout} 
      variant="contained" 
      sx={{ 
        backgroundColor: 'rgb(34, 139, 34)', // Verde
        color: 'white',
        borderRadius: '8px', 
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: 'rgb(46, 160, 46)', // Verde más oscuro al hover
        }
      }}
      fullWidth
    >
      Yes, Logout
    </Button>
    <Button 
      onClick={cancelLogout} 
      variant="outlined"
      sx={{ 
        borderColor: 'rgb(34, 139, 34)', 
        color: 'rgb(34, 139, 34)', 
        borderRadius: '8px', 
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: 'rgba(34, 139, 34, 0.1)', // Verde translúcido al hover
        }
      }}
      fullWidth
    >
      Cancel
    </Button>
  </DialogActions>
</Dialog>


    </>
  );
};

export default SidebarGeneral;
