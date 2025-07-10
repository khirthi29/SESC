import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, Box, MenuItem, Avatar, IconButton,Tooltip, } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
// components
import MenuPopover from '../../components/MenuPopover';
//

// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  bgheader:{
    background:'#000',
  }
  
}));
const MENU_OPTIONS = [
  // {
  //   label: 'Home',
  //   icon: homeFill,
  //   linkTo: '/'
  // },
  // {
  //   label: 'Profile',
  //   icon: personFill,
  //   linkTo: '#'
  // },
  // {
  //   label: 'Settings',
  //   icon: settings2Fill,
  //   linkTo: '#'
  // }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout =() =>{
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate('/login', { replace: true });
  }

  return (
    <>
 

      <MenuPopover className={classes.bgheader}
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        {/* <Box sx={{ my: 1.5, px: 2.5 }}> */}
          {/* <Typography variant="subtitle1" noWrap>
            {account.displayName}
          </Typography> */}
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap> */}
            {/* {account.email} */}
            {/* @&nbsp;{userMobile} */}
          {/* </Typography> */}
        {/* </Box> */}

        {/* <Divider sx={{ my: 1 }} /> */}

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
