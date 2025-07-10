import React from 'react';
import { NavLink } from 'react-router-dom';
import sidebarConfig from './SidebarConfig';
import '../../components/css/style.css';
import { ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';


export default function MainListItems() {
  
  let roleName = 1;
  let service = 0;
  if (localStorage.getItem("userInfo")) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo[0]?.idMTType === "2") {
      roleName = 2;
    }
    if (userInfo[0]?.idMTType === "3") {
      roleName = 3;
    }
    if (userInfo[0]?.idMTType === "4") {
      roleName = 4;
    }
    if (userInfo[0]?.Service) {
      service = userInfo[0]?.Service.toString();
    }
  }

  return (
    <React.Fragment>
      {sidebarConfig.map((item) => (
        <div key={item.title}>
          {item?.services?.length > 0 && item.services.includes(service) && item.type.includes(roleName) ?
            <NavLink to={item.path} >
              <ListItemButton>
                <Tooltip title={item.title}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                <ListItemText className="menuitemss" primary={item.title} />
              </ListItemButton>
            </ NavLink> :
            item.type.includes(roleName) && item?.services?.length === 0 &&
            <NavLink to={item.path} >
              <ListItemButton>
                <Tooltip title={item.title}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                <ListItemText className="menuitemss" primary={item.title} />
              </ListItemButton>
            </ NavLink>}
        </div>
      ))}
    </React.Fragment>
  );
}

