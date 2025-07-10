import {
    Box, Button, FormControl, Grid, InputLabel, MenuItem,
    OutlinedInput, Select, TextField, Typography, Card, CardContent, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper
  } from '@material-ui/core';
  import { makeStyles, styled } from '@material-ui/styles';
  import { useEffect, useState } from 'react';
  import { toast } from 'react-toastify';
  import Page from '../components/Page';
  import { useLocation, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import Dialog from '@mui/material/Dialog';
  import DialogActions from '@mui/material/DialogActions';
  import DialogContent from '@mui/material/DialogContent';
  import DialogTitle from '@mui/material/DialogTitle';
  
  toast.configure();
  
  const useStyles = makeStyles((theme) => ({
    headingmanage: {
      fontSize: "24px",
      color: "#000",
      [theme.breakpoints.down('sm')]: {
        fontSize: "16px",
        marginBottom: 16,
      },
    },
    Btn: {
      borderRadius: "4px",
      padding: "10px 20px",
      fontWeight: "600",
      marginTop: 10,
      [theme.breakpoints.down('sm')]: {
        padding: "10px 8px",
        fontSize: 12,
      },
    },
    demo2: { textAlign: "right" },
    peraonce: {
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "8px",
      color: "#999",
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
    tableContainer: {
      marginTop: 24,
    },
  }));
  
  export default function TestPage() {
    const classes = useStyles();
    const navigate = useNavigate();
    const id = useLocation();
  
    const [userList, setUserList] = useState([]);
    const [accountInfo, setAccountInfo] = useState(null);
    const [transactions, setTransactions] = useState([]);
  
    // Dialog State
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
      accountId: '',
      transactionType: '',
      amount: '',
    });
  
    useEffect(() => {
      getUserList();
      getAccountInfo();
    }, []);
  
    const getUserList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/citizen/getAllCitizenByProviderId?providerId=${id.state}`
        );
        setUserList(response.data);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };
  
    const getAccountInfo = async () => {
      try {
        const studentId = localStorage.getItem('id');
        const response = await axios.get(`http://localhost:8082/api/accounts/student/${studentId}`);
        setAccountInfo(response.data);
        setFormData(prev => ({ ...prev, accountId: response.data?.id || '' }));
        getTransactions(response.data?.id);
      } catch (error) {
        console.error('Error fetching account info:', error);
      }
    };
  
    const getTransactions = async (accountId) => {
      try {
        const res = await axios.get(`http://localhost:8082/api/transactions/account/${accountId}`);
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleCreateTransaction = async () => {
      try {
        const payload = {
          ...formData,
          amount: parseFloat(formData.amount),
          timestamp: new Date().toISOString(),
        };
        await axios.post('http://localhost:8082/api/transactions', payload);
        toast.success("Transaction created successfully!");
        setOpenDialog(false);
        getTransactions(formData.accountId);
        setFormData({ accountId: accountInfo?.id || '', transactionType: '', amount: '' });
      } catch (error) {
        console.error("Transaction creation failed", error);
        toast.error("Failed to create transaction.");
      }
    };

  
    return (<Page title="Finance Dashboard | StudentPortal" style={{
        background: "#f7f9fc",
        padding: "20px 30px",
        borderRadius: "8px"
      }}>
        {/* Header and Account Info */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
              Account Overview
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenDialog(true)}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              + New Transaction
            </Button>
          </Grid>
        </Grid>
      
        {accountInfo && (
          <Card sx={{
            mb: 4,
            borderLeft: "6px solid #1976d2",
            boxShadow: 2,
            background: "#e3f2fd",
          }}>
            <CardContent>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                Account Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><b>Account ID:</b> {accountInfo.id}</Typography>
                  <Typography variant="body1"><b>Type:</b> {accountInfo.accountType}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><b>Holder:</b> {accountInfo.accountHolderName}</Typography>
                  <Typography variant="body1"><b>Balance:</b> ₹{accountInfo.balance.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      
        {/* Transactions Table */}
        <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>Transaction History</Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>ID</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Amount (₹)</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>No transactions available.</TableCell>
                </TableRow>
              ) : (
                transactions.map((tx, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{tx.id}</TableCell>
                    <TableCell>{tx.transactionType}</TableCell>
                    <TableCell>₹{tx.amount.toFixed(2)}</TableCell>
                    <TableCell>{new Date(tx.timestamp).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      
        {/* Transaction Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 600 }}>New Transaction</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Account ID"
              name="accountId"
              value={formData.accountId}
              onChange={handleInputChange}
              margin="dense"
              disabled
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="type-label">Transaction Type</InputLabel>
              <Select
                labelId="type-label"
                name="transactionType"
                value={formData.transactionType}
                onChange={handleInputChange}
                input={<OutlinedInput label="Transaction Type" />}
              >
                <MenuItem value="CREDIT">CREDIT</MenuItem>
                <MenuItem value="DEBIT">DEBIT</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleInputChange}
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
            <Button onClick={handleCreateTransaction} variant="contained" color="primary">Submit</Button>
          </DialogActions>
        </Dialog>
      </Page>
      );
  }
  