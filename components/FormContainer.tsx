import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import sm from '@mui/system';
import Form from './Form';

const theme = createTheme();

const FormContainer = () => {
  const renderForm = () => (
    <Container component="main" maxWidth="sm" sx={{ mb: 4, p: 0 }}>
      <CssBaseline />
      <Paper elevation={0}>
        <Typography component="h1" variant="h2" align="center">
          Audio Quality Survey
        </Typography>
        <Form />
      </Paper>
    </Container>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {renderForm()}
    </ThemeProvider>
  );
};

export default FormContainer;
