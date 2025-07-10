import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@material-ui/core';
import { styled} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
 
// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(2.5),
    marginRight:22,
    marginBottom:12,
    background:'#fff',
     
  })
);

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});


// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func
};

function NavItem({ item, active }) {
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    fontWeight: 'fontWeightMedium',
    '&:before': { display: 'block' },
    "background": "#31a4f11f !important",
  "color": "#15336b",
  "borderLeft": "5px solid #31a4f1",
    borderRadius:'0 0 0 0',
    marginRight:0,
  };


  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium'
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle)
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle)
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main'
                        })
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle)
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array
};


export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 345,
    },

  
    
  }));
  const classes = useStyles();
  // const [roleName, setRoleName] = useState('student');
  let roleName = 1;
  let service = 0;
  if(localStorage.getItem("userInfo"))
  {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); 
    if(userInfo[0]?.idMTType === "2"){
      roleName = 2;
    }
    if(userInfo[0]?.idMTType === "3"){
      roleName=3; 
    }
    if(userInfo[0]?.idMTType === "4"){
      roleName=4;
    }
    if(userInfo[0]?.Service){
      service=userInfo[0]?.Service.toString();
    }
  } 

  return (
    <Box {...other} >
      <List disablePadding>
        {navConfig.map((item) => (
          
          <div  key={item.title}>
          {item?.services?.length>0 && item.services.includes(service) && item.type.includes(roleName) ?
          <NavItem className={classes.active} key={item.title} item={item} active={match}  />:
          item.type.includes(roleName) && item?.services?.length===0 &&
          <NavItem className={classes.active} key={item.title} item={item} active={match}  />
          }
          {/* {item.type.includes(roleName) && 
          <NavItem className={classes.active} key={item.title} item={item} active={match}  />
          } */}
          </div>
        ))}
      </List>
    </Box>
  );
}
