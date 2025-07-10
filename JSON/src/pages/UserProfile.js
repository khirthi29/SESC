import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    Box,
    Grid,
    Typography,
    Paper,
    Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Page from '../components/Page';
import axios from 'axios';

toast.configure();

const useStyles = makeStyles((theme) => ({
    UserDetails: {
        fontSize: 18,
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#000',
    },
    section: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }
}));

export default function UserProfile() {
    const classes = useStyles();
    const [userDetail, setUserDetail] = useState(null);
    const [accountDetail, setAccountDetail] = useState(null); // updated to hold entire response

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (!username || !token) {
            toast.error('User not logged in');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/v1/students/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const student = response.data;
            setUserDetail(student);
            localStorage.setItem('id', student.id);

            // Fetch wallet/account details using student.id
            fetchAccountDetail(student.id, token);

        } catch (error) {
            console.error('Error fetching user details:', error);
            toast.error('Failed to load profile');
        }
    };

    const fetchAccountDetail = async (studentId, token) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/students/${studentId}/balance`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAccountDetail(response.data);
        } catch (error) {
            console.error('Error fetching account details:', error);
        }
    };

    return (
        <Page
  title="My Profile | Student Portal"
  style={{
    background: '#f0f2f5',
    padding: '30px',
    minHeight: '100vh',
  }}
>
  <Grid container spacing={3}>
    <Grid item xs={12} sm={12} md={8}>
      <Paper className={classes.section}>
        <Typography className={classes.heading}>👤 Basic Information</Typography>
        {userDetail ? (
          <>
            <Typography className={classes.UserDetails}>
              <PersonOutlineRoundedIcon /> <strong>Name:</strong> {userDetail.name}
            </Typography>
            <Typography className={classes.UserDetails}>
              <MailOutlineIcon /> <strong>Email:</strong> {userDetail.email}
            </Typography>
            <Typography className={classes.UserDetails}>
              🆔 <strong>Username:</strong> {userDetail.username}
            </Typography>
            <Typography className={classes.UserDetails}>
              🧑‍🎓 <strong>Student ID:</strong> {userDetail.id}
            </Typography>
          </>
        ) : (
          <Typography>Loading profile...</Typography>
        )}
      </Paper>

      {/* Wallet Section */}
      {accountDetail && (
        <Paper className={classes.section}>
          <Typography className={classes.heading}>💳 Wallet Details</Typography>
          <Typography className={classes.UserDetails}>
            <AccountBalanceWalletIcon /> <strong>Holder:</strong> {accountDetail.accountHolderName}
          </Typography>
          <Typography className={classes.UserDetails}>
            🏦 <strong>Account Type:</strong> {accountDetail.accountType}
          </Typography>
          <Typography className={classes.UserDetails}>
            💰 <strong>Balance:</strong> ₹{accountDetail.balance}
          </Typography>
        </Paper>
      )}

      {/* Enrollments */}
      {userDetail?.enrollments?.length > 0 && (
        <Paper className={classes.section}>
          <Typography className={classes.heading}>📚 Enrolled Courses</Typography>
          <Grid container spacing={2}>
            {userDetail.enrollments.map((enroll, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper style={{ padding: 12, backgroundColor: '#f7f9fc', borderLeft: '4px solid #3f51b5' }}>
                  <Typography variant="subtitle2">
                    <strong>Course:</strong> {enroll.courseName || enroll.courseId}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong> {enroll.status || 'Active'}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Grid>
  </Grid>
</Page>

    );
}
