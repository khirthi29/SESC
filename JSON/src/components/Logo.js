import PropTypes from 'prop-types';
// material
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 345,
  },
  logo: {
    background: 'none', paddingBottom: 21, width: "279px", marginLeft: "-20px", justifyContent: "center",
    display: "flex",
    alignItems: "center",
    height: "70px",
    marginTop: "-8px",
    [theme.breakpoints.up('sm')]: {
      background: 'url(/static/mock-images/avatars/papper.png)',
    },
  },
  logoinnerbg: {
    textAlign: 'center', margin: '15px 61px 0px', display: 'block',

  },
  logosecond: {
    position: "absolute",
    left: "50px",
    top: "17px",
    borderBottom: "0px"
  }
}));


// ----------------------------------------------------------------------


Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  const classes = useStyles();
  const redirectToHome = () => {
    window.location.href = '/'; 
}

  return <div><Grid className={classes.logo} ><div className={classes.logoinnerbg}><Box onClick={redirectToHome} component="img" src="/static/illustrations/logo_2x.png" sx={{ width: 148, height: 38, ...sx }} className={classes.logosecond} /></div></Grid></div>

    ;
}
