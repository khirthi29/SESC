import React from 'react';
import Page from '../components/Page';
import { makeStyles } from '@material-ui/styles';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  Box, TextField, Typography, Grid, FormControl, Paper
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';

toast.configure();

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #f0f4ff, #e0eaff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  card: {
    maxWidth: 800,
    padding: theme.spacing(4),
    borderRadius: 12,
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 700,
    color: '#15336b',
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  bggreen: {
    background: '#15336b',
    color: '#fff',
    borderRadius: 8,
    padding: '10px 24px',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#102e5c',
    },
  },
}));

export default function Register() {
  const classes = useStyles();
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password too short').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      username: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (data) => {
      await registerUser(data);
    },
  });

  const registerUser = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/students',
        {
          name: data.name,
          email: data.email,
          username: data.username,
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('User registered successfully');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      toast.error('Registration failed');
    }
  };

  const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

  return (
    <Page title="Register | Student Portal">
      <div className={classes.root}>
        <Paper className={classes.card}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Typography className={classes.heading}>Create Your Account</Typography>
              <Typography className={classes.subText}>
                Please fill in the details below to register.
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    {...getFieldProps('username')}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...getFieldProps('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
              </Grid>

              <Box mt={4} textAlign="center">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  className={classes.bggreen}
                >
                  Register
                </LoadingButton>
              </Box>
            </Form>
          </FormikProvider>
        </Paper>
      </div>
    </Page>
  );
}
