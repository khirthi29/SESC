import clockFill from '@iconify/icons-eva/clock-fill';
import { Icon } from '@iconify/react';
import { makeStyles } from '@material-ui/styles';
import { noCase } from 'change-case';
import { formatDistanceToNow, set, sub } from 'date-fns';
import faker from 'faker';
import PropTypes from 'prop-types';
import { useRef, useState,useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Avatar, Box, Divider, Grid, IconButton, ListItemAvatar,
  ListItemButton, ListItemText, Typography
} from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
// utils
import { mockImgAvatar } from '../../utils/mockImages';
// components
import MenuPopover from '../../components/MenuPopover';
import Scrollbar from '../../components/Scrollbar';


  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 345,
    },
    dropdownsec:{
      padding:'10px',cursor:'pointer',borderBottom:'1px solid #f3f3f3',
      [theme.breakpoints.up('sm')]: {
        padding:'20px',
      },
    }
   
  }));

// ----------------------------------------------------------------------
const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true
  },
  {
    id: faker.datatype.uuid(),
    title: faker.name.findName(),
    description: 'answered to your comment on the Minimal',
    avatar: mockImgAvatar(2),
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatar: null,
    type: 'mail',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false
  },
  {
    id: faker.datatype.uuid(),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false
  }
];

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_package.svg" />,
      title
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_shipping.svg" />,
      title
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_mail.svg" />,
      title
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />,
      title
    };
  }
  return {
    avatar: <img alt={notification.title} src={notification.avatar} />,
    title
  };
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      to="#"
      disableGutters
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
            {formatDistanceToNow(new Date(notification.createdAt))}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

export default function NotificationsPopover() {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("userInfo")));
}, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("searchHistory");
   // navigate('/login', { replace: true });
    window.location.href = '/'; 
  }
  
  const handleFAQ = () => {    
    // navigate('/support', { replace: true });
  }
  
  const handleHelp = () => {    
  //  navigate('/dashboard/helpvideos', { replace: true });
    handleClose();
  }

  return (
    <>
      <Box component="div" sx={{ display: 'inline' }} style={{color:"#000"}}>
      <i class="bi bi-person-circle" style={{ "fontSize": "25px",
  "position": "relative",
  "top": "5px",
  "right": "5px",
  "color": "#15336b"}}></i>
   {/* {userDetails[0]?.FirstName} {userDetails[0]?.LastName}  */}
      <IconButton
        ref={anchorRef}
        size='medium'
        color={open ? 'primary' : 'info'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        
        <i class="bi bi-three-dots-vertical" style={{fontSize: "21px",}}></i>

        
      </IconButton>
      </Box>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 200 }}
      >
      

        <Divider />

        <Scrollbar sx={{ height: { xs: 'auto', sm: 'auto' } }}>
     
    
       <div className={classes.dropdownsec}>
        <Grid container item spacing={2}   onClick={handleLogout}>
          <Grid item xs={2} sm={2} md={2} style={{paddingLeft:12,}}>
            <Typography variant="span" component="span" > <i class="bi bi-box-arrow-left"></i>
            </Typography>
          </Grid>
          <Grid item xs={10} sm={10} md={10}>
            <Typography variant="p" component="p"  style={{fontSize:14,}}>
              Signout
            </Typography>
          </Grid>

        </Grid>
        </div>
        </Scrollbar>

        <Divider />

       
      </MenuPopover>
    </>
  );
}
