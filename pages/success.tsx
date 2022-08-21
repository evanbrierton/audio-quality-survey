import { CssBaseline, Typography } from '@material-ui/core';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

const Success = () => (
  <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
    <CssBaseline />
    <Paper
      variant="outlined"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    >
      <Typography variant="h3" component="h1" align="center">
        Success
      </Typography>
      <Typography variant="subtitle1">
        Response recorded successfully, thanks for participating. You can now
        close this window.
      </Typography>
    </Paper>
  </Container>
);

export default Success;
