import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    loaderBoxwarpper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: '#cccccc3d',
        left:0,
        top:0,
      },
      loaderBox: {
        position: 'absolute',
        left:'50%',
        top:'50%',
        zIndex:'9999'
      },
}));
Loader.propTypes = {
    isLoader: PropTypes.bool
  };
export default function Loader(isLoader) {
    const classes = useStyles();
  return (
      <>
    {isLoader.isLoader?
    <div className={classes.loaderBoxwarpper}>
    <div className={classes.loaderBox}>
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    </div>
    </div>
    :
    ""
}
    </>
  );
}
