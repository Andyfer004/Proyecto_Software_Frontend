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
} from '@mui/material';
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
  { name: 'Update Account', icon: RefreshIcon, route: 'update-account' },
];

const SidebarGeneral = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    // Lógica para logout
    console.log("Logout");
    handleMenuClose();
  };

  const handleUpdateAccount = () => {
    // Lógica para update account
    navigateTo("update-account");
    handleMenuClose();
  };

  const theme = useTheme();

  // Mover el uso de hooks dentro del cuerpo del componente
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

          {/* Icono de AccountCircle con menú desplegable */}
          <IconButton
            color="inherit"
            sx={{ ml: 'auto' }}  
            onClick={handleMenuClick}  
          >
            <AccountCircle fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem onClick={handleUpdateAccount}>Update Account</MenuItem>
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
    </>
  );
};

export default SidebarGeneral;
