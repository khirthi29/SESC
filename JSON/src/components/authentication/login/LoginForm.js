import { Button, Checkbox, Grid, Link, Stack, TextField, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { AuthApi } from '../../../service';
import "../../css/style.css";


toast.configure()

const useStyles = makeStyles((theme) => ({
  textrighte: {
    textAlign: 'right',
  },
  bggreen: {
    background: '#15336b',
  },
  getotpbg: {
    color: '#15336b',
    padding: "28px 10px !important", position: "absolute", right: "0px", borderRadius: "0px 8px 8px 0px", fontWeight: "600", fontSize: "14px"
  },
  footer: {
    position: "relative",
    textAlign: "center",
    textDecoration: "none",
    width: "100%",
    padding: "9px",
    borderRadius: "0",
    borderTop: '1px solid #dbdbdb',
    marginTop: 120,

  },
  copyright: {
    fontSize: 12,
  },
  imgpen: {
    "transform": "rotate(295deg)",
    "position": "absolute",
    "width": "80px",
    "left": "-0px",
    "top": "-40px",
    "transition": "all 0.6s ease-in-out",
    opacity: 0,
    animation: '$myKeyframe 15s infinite',

  },
  '@keyframes myKeyframe': {
    '0%': {
      "transform": "translate(0px, -26px)",

    },
    '50%': {
      "transform": "translate(0px, 26px)",

    },
    '100%': {
      "transform": "translate(0px, -26px)",

    },
  },
  imgpen2: {
    "transform": "rotate(295deg)",
    "position": "absolute",
    "width": "80px",
    "right": "-0px",
    "top": "70px",
    "transition": "all 0.6s ease-in-out",
    animation: '$myKeyframe2 10s infinite',

    opacity: 0,

  },
  '@keyframes myKeyframe2': {
    '0%': {
      "transform": "translate(0px, 26px)",

    },
    '50%': {
      "transform": "translate(0px, -26px)",

    },
    '100%': {
      "transform": "translate(0px, 26px)",

    },
  },
  imgpen3: {
    "transform": "rotate(295deg)",
    "position": "absolute",
    "width": "80px",
    "right": "-0px",
    "top": "231px",
    "transition": "all 0.6s ease-in-out",
    animation: '$myKeyframe3 12s infinite',

    opacity: 0,

  },
  '@keyframes myKeyframe3': {
    '0%': {
      "transform": "translate(0px, 16px)",

    },
    '50%': {
      "transform": "translate(0px, -16px)",

    },
    '100%': {
      "transform": "translate(0px, 16px)",

    },
  },
  imgpen4: {
    "transform": "rotate(295deg)",
    "position": "absolute",
    "width": "80px",
    "left": "-0px",
    "top": "380px",
    "transition": "all 0.6s ease-in-out",
    animation: '$myKeyframe4 11s infinite',

    opacity: 0,

  },
  '@keyframes myKeyframe4': {
    '0%': {
      "transform": "translate(0px, -20px)",

    },
    '50%': {
      "transform": "translate(0px, 10px)",

    },
    '100%': {
      "transform": "translate(0px, -20px)",

    },
  },
  imgpen5: {
    "transform": "rotate(295deg)",
    "position": "absolute",
    "width": "80px",
    "left": "-0px",
    "top": "180px",
    "transition": "all 0.6s ease-in-out",
    animation: '$myKeyframe5 13s infinite',

    opacity: 0,

  },
  '@keyframes myKeyframe5': {
    '0%': {
      "transform": "translate(0px, -20px)",

    },
    '50%': {
      "transform": "translate(0px, 10px)",

    },
    '100%': {
      "transform": "translate(0px, -20px)",

    },
  },
  imgpen6: {
    "transform": "rotate(295deg)",
    "position": "absolute",
    "width": "80px",
    "right": "-0px",
    "top": "450px",
    "transition": "all 0.6s ease-in-out",
    animation: '$myKeyframe6 10s infinite',

    opacity: 0,

  },
  '@keyframes myKeyframe6': {
    '0%': {
      "transform": "translate(0px, -15px)",

    },
    '50%': {
      "transform": "translate(0px, 15px)",

    },
    '100%': {
      "transform": "translate(0px, -15px)",

    },
  },
  hovermain: {
    "padding": "46px 34px",
    "position": "relative",
    "background": "rgb(255, 255, 255)",

    "borderRadius": "4px",
    '&:hover $imgpen': {
      "left": "-90px",
      "transform": "translate(27px, 7px)",
      opacity: 1,

    },
    '&:hover $imgpen2': {
      "right": "-30px",
      "transform": "translate(27px, 7px)",
      opacity: 1,

    },
    '&:hover $imgpen3': {
      "right": "-100px",
      "transform": "translate(27px, 7px)",
      opacity: 1,

    },
    '&:hover $imgpen4': {
      "left": "-110px",
      "opacity": "1",
      "transform": "translate(27px, 7px)"

    },
    '&:hover $imgpen5': {
      "left": "-180px",
      "opacity": "1",
      "transform": "rotate(45deg)"
    },
    '&:hover $imgpen6': {
      "right": "-60px",
      "opacity": "1",
      "transform": "rotate(45deg)"

    },
  },
  logoimage:{
    [theme.breakpoints.down('sm')]: {
     display:"none",

    },
  }
}));

export default function LoginForm() {
  const navigate = useNavigate();

  const [showLoder, setShowLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showValidation, setshowValidation] = useState(false);
  const [showValidationText, setShowValidationText] = useState("");
  const [showOtpValidation, setshowOtpValidation] = useState(false);
  const [showOtpValidationText, setShowOtpValidationText] = useState("");
  const [showCaptchaValidation, setShowCaptchaValidation] = useState(false);
  const [showCaptchValidationText, setShowCaptchValidationText] = useState("");
  const [count, setCount] = useState(30);
  const [timer, setTimer] = useState(30);
  const [termandCondition, setTermAnsCondition] = useState(true);
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    loadCaptchaEnginge(4, 'white', 'black', 'numbers');
  }, []);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    otp: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
      captcha: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (data) => {
      signIn();
    }
  });

  const doSubmit = () => {
    if (formik.values.email === "") {
      setshowValidation(true);
      setShowValidationText('Email is required');
    }
    if (formik.values.captcha === "") {
      setShowCaptchaValidation(true);
      setShowCaptchValidationText('Captcha is required');
      return false;
    }
    if (validateCaptcha(formik.values.captcha) === true) {
      generateOTP();
      loadCaptchaEnginge(4, 'white', 'black', 'numbers');
    } else {
      setShowCaptchaValidation(true);
      setShowCaptchValidationText('Captcha Does Not Match');
    }
  }


  const generateOTP = () => {
    setshowValidation(false);
    setShowValidationText("");
    setshowOtpValidation(false);
    setShowOtpValidationText("");
    setShowCaptchaValidation(false);
    setShowCaptchValidationText("");
    if (formik.values.email === "") {
      setshowValidation(true);
      setShowValidationText('Email is required');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      setshowValidation(true);
      setShowValidationText('Invalid email');
    }
    else {
      const data = {
        "UserEmail": formik.values.email
      };
      setShowLoader(true);
      AuthApi.generateOTP(data).then(resp => {
        setShowLoader(false);
        // eslint-disable-next-line no-debugger
        // debugger;
        if (resp.data) {
          if (resp.data.status === 200) {
            formik.setFieldValue('otp', resp.data.data)
            setCount(29);
            handleClick();
            formik.setFieldValue('captcha', "");
          }
          else {
            setshowValidation(true);
            setShowValidationText(resp.data.message);
          }
        }
        else {
          setshowValidation(true);
          setShowValidationText("user not found");
        }
      });
    }
  }

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleClick = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      setCount(29);

    }

    const newIntervalId = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    setIntervalId(newIntervalId);
  };

  const signIn = () => {
    debugger;

    const data = {
      "username": formik.values.email,
      "password": formik.values.otp
    };
    setShowLoader(true);
    setshowOtpValidation(false);
    setShowOtpValidationText("");
    debugger;

    try {
      AuthApi.signIn(data).then(
        (resp) => {
          debugger;
          setShowLoader(false);
          if (resp.status === 200) {
            console.log("signIn", resp);
              formik.resetForm();
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("username", resp.data.username);
                navigate('/dashboard/userprofile', { replace: true });
            
          }
          else {
            formik.setSubmitting(false);
            setshowOtpValidation(true);
            setShowOtpValidationText("Invalid OTP");
          }
        },
        (error) => {
          setShowLoader(false);
          formik.setSubmitting(false);
          toast.warning('Invalid Password', { position: toast.POSITION.TOP_RIGHT });
        }
      );
    }
    catch (error) {
      setShowLoader(false);
      console.log("Catch")
    }
  }

  const classes = useStyles();
  return (
    <FormikProvider value={formik} >
      <div className={classes.hovermain}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
        <Link href="/" color="inherit"><img alt="register" src="/static/illustrations/logo_2x.png" className={classes.logoimage} style={{    "width": "170px",
        "height":"100px",
              "margin-bottom": "29px",}}/></Link> 
             
          <Typography variant="h5" gutterBottom style={{
            "fontSize": "24px",
            "fontWeight": "600",
            "marginBottom": "8px",

          }}>
            Login to Your Account
          </Typography>
          {/* <Typography variant="h5" gutterBottom style={{   "fontSize": "14px",
                "fontWeight": "500",
                "marginBottom": "21px", "color":"#999" }}>
                Welcome back! Select Method to log in
              </Typography> */}
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="text"
              label="Username"
              {...getFieldProps('email')}
              error={(Boolean(touched.email && errors.email)) || showValidation}
              helperText={(touched.email && errors.email) || showValidationText}
            />
            <Grid container>
              <Grid item xs={4} md={3}>
                <Typography style={{ alignItems: 'center', height: 54, fontSize: "20px", textAlign: 'center' }}><LoadCanvasTemplate reloadColor="#15336b" reloadText="Refresh" /> </Typography>
              </Grid>
              <Grid item xs={12} md={9} style={{ position: 'relative' }}>
                <TextField
                  id="outlined-basic"
                  label="Enter Captcha"
                  variant="outlined"
                  style={{ borderRadius: '8px 0 0 8px', width: "100%" }}
                  {...getFieldProps('captcha')}
                  error={(Boolean(touched.captcha && errors.captcha)) || showCaptchaValidation}
                  helperText={(touched.captcha && errors.captcha) || showCaptchValidationText}
                />
              </Grid>

            </Grid>
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'text'}
              label="Enter Password"
              {...getFieldProps('otp')}
              error={(Boolean(touched.otp && errors.otp)) || showOtpValidation}
              helperText={(touched.otp && errors.otp) || showOtpValidationText}
            />
          </Stack>
          <br />
          <Typography variant="span" component="span" className={classes.schoolheading2} style={{ fontSize: 11, }}>
            <Checkbox defaultChecked style={{ width: 13, marginRight: 4, }} onChange={e => {
              setTermAnsCondition(e.target.checked);
            }} /> I agree with
            <Link to="/termsandconditions" component={RouterLink}
              style={{ marginTop: "0", textAlign: "left", fontSize: 11, marginLeft: 4, marginRight: 4 }}
            >
              T&C
            </Link>
            and
            <Link to="/privacypolicy" component={RouterLink}
              style={{ marginTop: "0", textAlign: "left", fontSize: 11, marginLeft: 4, }}
            >
              Privacy Policy
            </Link>
          </Typography>
          <LoadingButton
            spacing={3}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            className={classes.bggreen}
            disabled={!termandCondition}
          >
            Login
          </LoadingButton>
        </Form>
        {/* <Loader isLoader={showLoder} showHide={setShowLoader} /> */}
      </div>
    </FormikProvider>
  );
}
