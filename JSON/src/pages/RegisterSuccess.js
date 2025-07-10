import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Box, Button, Typography, Container } from '@material-ui/core';
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));


export default function RegisterSuccess() {
  return (
    <RootStyle title="Register | StudentPortal">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography sx={{ color: 'text.secondary', fontSize: "18px" }}>
             You have successfully submitted your account for registration. 
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: "18px" }}>
            Your account is under review.
            </Typography>
            </motion.div>
            <Button to="/" size="small" variant="contained" component={RouterLink} style={{ borderRadius: 4, padding: '8px 16px', fontWeight: 600, marginTop: 10 }}>
              Go to Home
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
