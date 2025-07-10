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


export default function Page404() {
  return (
    <RootStyle title="404 Page Not Found | StudentPortal">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 430, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph mb={1}>
                Sorry, page not found!
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
              Be sure to check your spelling.
            </Typography>

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/404.png"
                sx={{ height: 260, }}
                mx={2}
              />
            </motion.div>

            <Button to="/" size="large" variant="contained" component={RouterLink} style={{ borderRadius: 4, padding: '10px 20px', fontWeight: 600, marginRight: 40 }}>
              Go to Home
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
