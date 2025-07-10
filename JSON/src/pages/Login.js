import { Card, Container, Link, Stack, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { MHidden } from '../components/@material-extend';
import Page from '../components/Page';
import { LoginForm } from '../components/authentication/login';
import AuthLayout from '../layouts/AuthLayout';


const useStyles = makeStyles((theme) => ({
  customPaper: {
    position: 'relative',

    '&::before': {
      "top": "0",
      "left": "40px",
      "width": "170px",
      "height": "70px",
      "content": "\"\"",
      "zIndex": "999999",
      "position": "absolute",
      /* "background": "#15336b" */
      "background": "#ffffff"
    },
  },
  
}));
const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));


export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('userInfo')) {
      navigate('/dashboard/app', { replace: true });
    }
  }, []);
  const classes = useStyles();
  return (
    <RootStyle title="Login | StudentPortal" style={{
      "boxShadow": "none",
    }}>
      <AuthLayout>
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
        </Link>
      </AuthLayout>

      <MHidden width="mdDown" >
      <div className={classes.customPaper}></div>
        <SectionStyle style={{
          /* "background": "#15336b", */
          "background": "#ffffff",
          "boxShadow": "none",
          "boxShadow": "none",
          "borderRadius": "0",
          "width": "48%",
          "margin": "0",
          "maxWidth": "100%",
          /* "borderRight":"1px solid lightgrey" */
        }}>

          <img alt="register" src="/static/illustrations/manageContent.png" style={{
            "width": "500px",
            "height":"500px",
            "margin": "auto",
            "marginTop": "0",
            "marginBottom": "0",
          }} />
        </SectionStyle>
      </MHidden>
      <Divider orientation="vertical" flexItem></Divider>
      <Container maxWidth="xs">
        <ContentStyle style={{ paddingTop: 50, }}>
          <Stack sx={{ mb: 5 }} style={{ marginBottom: 20, display: 'none' }}>
         
            <Typography variant="h5" gutterBottom >
              Login with registered Email
            </Typography>
          </Stack>
          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
