import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box, Button, Grid, Typography, MenuItem, Select, FormControl, InputLabel, Paper, Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Page from '../components/Page';
import { toast } from 'react-toastify';

toast.configure();

const useStyles = makeStyles(() => ({
    section: {
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    formControl: {
        minWidth: 240,
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
    },
    enrollmentList: {
        marginTop: 20,
    },
    courseItem: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    section: {
        padding: 24,
        marginBottom: 24,
        backgroundColor: '#fff',
        borderRadius: 10,
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      },
      heading: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 12,
      },
      formControl: {
        minWidth: 250,
      },
      button: {
        padding: '12px 20px',
        fontWeight: 600,
        fontSize: 14,
      },
      enrollmentList: {
        marginTop: 12,
      },
}));

export default function CourseEnrollment() {
    const classes = useStyles();
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [enrollments, setEnrollments] = useState([]);

    const studentId = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchCourses();
        fetchEnrollments();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/courses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            toast.error('Unable to load courses');
        }
    };

    const fetchEnrollments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/enrollment/${studentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            debugger;
            setEnrollments(response.data);
        } catch (error) {
            console.error('Failed to fetch enrollments:', error);
            toast.error('Unable to load your enrollments');
        }
    };

    const handleEnroll = async () => {
        if (!selectedCourseId || !studentId) {
            toast.error('Please select a course');
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/api/v1/enrollment/${studentId}/course/${selectedCourseId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success('Enrolled successfully');
            setSelectedCourseId('');
            fetchEnrollments(); // Refresh list
        } catch (error) {
            console.error('Enrollment failed:', error);
            toast.error('Enrollment failed');
        }
    };

    return (
        <Page title="Course Enrollment | Student Portal" style={{ padding: 30, backgroundColor: "#f9fafa", minHeight: "100vh" }}>
        {/* Enroll Section */}
        <Paper className={classes.section}>
          <Typography className={classes.heading} color="primary">
            Enroll in a Course
          </Typography>
          <Divider sx={{ mb: 2 }} />
      
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel id="select-course-label">Select Course</InputLabel>
                <Select
                  labelId="select-course-label"
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  label="Select Course"
                >
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}
                onClick={handleEnroll}
                disabled={!selectedCourseId}
              >
                Enroll Now
              </Button>
            </Grid>
          </Grid>
        </Paper>
      
        {/* Enrollment History */}
        <Paper className={classes.section}>
          <Typography className={classes.heading} color="primary">
            Your Enrollments
          </Typography>
          <Divider sx={{ mb: 2 }} />
      
          {enrollments.length === 0 ? (
            <Typography variant="body2">You haven’t enrolled in any course yet.</Typography>
          ) : (
            <Grid container spacing={2} className={classes.enrollmentList}>
              {enrollments.map((enroll, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={1} style={{ padding: 16, borderLeft: "5px solid #1976d2" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {enroll.courseName || enroll.courseId}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Enrollment ID:</strong> {enroll.id || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Status:</strong> {enroll.status || 'Active'}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Page>
      
    );
}
