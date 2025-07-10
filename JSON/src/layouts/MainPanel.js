import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React from "react";

export function MainPanel(props) {
  const theme = useTheme();
 
  const xtraSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const  small = useMediaQuery(theme.breakpoints.up("xs") && theme.breakpoints.down("md") );
  const  medium = useMediaQuery(theme.breakpoints.up("md") && theme.breakpoints.down("lg") );
  const  large = useMediaQuery(theme.breakpoints.up("lg") && theme.breakpoints.down("xl") );
  const xtralarge = useMediaQuery(theme.breakpoints.up("xl"));
 /*   //const small = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  //const medium = useMediaQuery(theme.breakpoints.between("sm", "md"));
  //const large = useMediaQuery(theme.breakpoints.between("md", "lg"));
  //const xtralarge = useMediaQuery(theme.breakpoints.between("lg", "xl")); */
  let panelWidth;
  if (xtraSmall) {
    panelWidth = "100%";
  } else if (small) {
    panelWidth = "65%";
  } else if (medium) {
    panelWidth = "65%";
  } else if (large || xtralarge) {
    panelWidth = "50%";
  }


  return (            
        <Box border={0} display="flex" flexDirection="row" justifyContent={props.align? props.align: "center"}/* {props.align?props.align:"center"} */ >
          <Box m={1} p={1} borderColor="grey.500" borderRadius={2} boxShadow={2} bgcolor="background.paper"           
            width={props.maxWidth && !xtraSmall? props.maxWidth: panelWidth}>
              
            {props.children}
          </Box>
        </Box>    
  )
}

export default MainPanel;
