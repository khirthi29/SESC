import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Stack } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import { List, Typography, Divider, IconButton, Toolbar, Grid, Box, CssBaseline } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MainListItems from './ListItems';
import '../../components/css/style.css';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';
import { makeStyles } from '@material-ui/styles';

let drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('xs')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 345,
  },
  emailphone: {
    color: '#646464',
    fontWeight: 500,
  },
  bordertell: {
    borderBottom: '1px solid rgba(145, 158, 171, 0.24)',
    height: '70px !important',
    justifyContent: 'center',
    alignItems: 'right',
    display: 'flex',
    background: 'url(/static/mock-images/avatars/papper.png)',
    backgroundColor: '#fff',
  },
}));

const defaultTheme = createTheme();

export default function SideNavBar() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      console.log('This is a mobile screen.');
      setOpen(false);
    }
  }, [pathname]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }} >
        <CssBaseline />
        <AppBar position="absolute" open={open} style={{ background: "#fff", boxShadow: "none", borderBottom: "1px solid rgba(0, 0, 0, 0.12)", color: "#000", fontFamily: "Montserrat, sans-serif", }}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              className="arrowmain"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <img src="/static/illustrations/favicon.png " className="desktopshow" />
              <i className="bi bi-chevron-right desktopshow"></i>
              <i class="bi bi-list mobileshow" ></i>

            </IconButton>
            <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }} >
              <AccountPopover />
              <div className="rightalign">
                <Box>
                  <NotificationsPopover />
                </Box>
              </div>
            </Stack>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Typography variant="h1" component="h2" style={{ "fontSize": "41px", "fontWeight": "800", color: "#f60" }}>
              <img src="/static/illustrations/logo_2x.png" className="lgoo" />
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
          </List>
        </Drawer>
        <Grid container spacing={3}>

        </Grid>
      </Box>
    </ThemeProvider>
  );
}