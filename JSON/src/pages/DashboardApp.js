import Page from '../components/Page';
import { makeStyles } from '@material-ui/styles';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Form, FormikProvider, useFormik } from 'formik';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography, Card, CardContent } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

toast.configure();
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  demo: {
    background: '#999',
    [theme.breakpoints.up('sm')]: {
      background: '#000',
    },
  },
  demo2: {
    textAlign: "right",
  },
  Btn: {
    borderRadius: "4px",
    padding: "10px 20px",
    fontWeight: "600",
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      padding: "10px 8px",
      fontSize: 12,
    },
  },
  BottomBorder: {
    marginTop: "20px",
    width: "50%",
    [theme.breakpoints.up('xs')]: {
      width: "100%"
    },
  },
  borderprofile: {
    border: '1px solid #d3d3d3',
    borderRadius: "7px",
    padding: "22px",
    marginBottom: "24px",
    [theme.breakpoints.down('sm')]: {
      padding: "16px",
    },
  },
  headingmanage: {
    fontSize: "24px",
    color: "#000",
    [theme.breakpoints.down('sm')]: {
      fontSize: "16px",
      marginTop: 16,
      color: "#000",
    },
  },
  selectControl: {
    minWidth: 300,
    marginBottom: 20,
  },
  peraonce: {
    fontSize: "14px",
    fontWeight: "400",
    marginBottom: "8px",
    color: "#999",
  },
  borrowedList: {
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  borrowedTitle: {
    marginBottom: 10,
    fontWeight: 600,
  },
  fineDisplay: {
    textAlign: 'right',
    fontWeight: 600,
    color: '#d32f2f',
    fontSize: '18px',
    marginBottom: 16,
  }
}));

export default function DashboardApp(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const id = useLocation();

  const [userList, setUserList] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [fineAmount, setFineAmount] = useState(0);

  useEffect(() => {
    getBooks();
    getBorrowedBooks();
    getFineAmount();
  }, []);

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const getBorrowedBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/library/books/borrowed/${localStorage.getItem('id')}`);
      setBorrowedBooks(response.data);
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
    }
  };

  const getFineAmount = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/library/fines/${localStorage.getItem('id')}`);
      setFineAmount(response.data);
    } catch (error) {
      console.error('Error fetching fine amount:', error);
    }
  };

  const borrowBook = async () => {
    try {
      const studentId = localStorage.getItem('id');
      const response = await axios.post(`http://localhost:8081/api/library/books/borrow?studentId=${studentId}&bookId=${selectedBookId}`);
      toast.success("Book borrowed successfully!");
      getBorrowedBooks();
    } catch (error) {
      toast.error("Failed to borrow book.");
      console.error("Borrow Error:", error);
    }
  };

  const addUser = () => {
    navigate('/dashboard/statistical', { replace: true, state: id.state });
  };

  const handleUserClick = (id) => {
    navigate('/dashboard/TestPage', { replace: true, state: id });
  };

  const handleBookChange = (event) => {
    setSelectedBookId(event.target.value);
  };

  return (
    <Page title="Library Dashboard | StudentPortal" style={{
      background: "#f5f7fb",
      padding: "20px 30px",
      borderRadius: "8px"
    }}>
      {/* Header */}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Grid item>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
            Library Borrowing Portal
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.fineDisplay}>
            Outstanding Fine: ₹{fineAmount}
          </Typography>
        </Grid>
      </Grid>
    
      {/* Book Selector */}
      <Card variant="outlined" sx={{ mb: 4, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Borrow a Book
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <InputLabel id="select-book-label">Select Book</InputLabel>
              <Select
                labelId="select-book-label"
                id="select-book"
                value={selectedBookId}
                onChange={handleBookChange}
                input={<OutlinedInput label="Select Book" />}
              >
                {books.map((book) => (
                  <MenuItem key={book.id} value={book.id}>
                    {book.title} - {book.author} | {book.quantity} Left
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={!selectedBookId}
              onClick={borrowBook}
              sx={{ height: "56px", textTransform: "none", fontWeight: 600 }}
            >
              Borrow Book
            </Button>
          </Grid>
        </Grid>
      </Card>
    
      {/* Borrowed Books Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Borrowed Books
      </Typography>
      {borrowedBooks.length === 0 ? (
        <Typography variant="body2">No books borrowed.</Typography>
      ) : (
        <Grid container spacing={2} className={classes.borrowedList}>
          {borrowedBooks.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" sx={{ height: "100%", boxShadow: 1 }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Borrow ID: {book.id}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Borrowed:</strong> {book.borrowedDate}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Due:</strong> {book.dueDate}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Student ID:</strong> {book.studentId}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Book ID:</strong> {book.bookId}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    
      {/* Providers Section */}
      <Typography variant="h5" sx={{ fontWeight: 600, mt: 5, mb: 2 }}>
        Linked Providers
      </Typography>
      <Grid container spacing={2}>
        {userList?.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { boxShadow: 4 },
              }}
              onClick={() => handleUserClick(user.id)}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {user.provicerName}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>ID:</strong> {user.id}
              </Typography>
              <Typography variant="body2">
                <strong>Total Consumption:</strong> {user.totalConsumption}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
