import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import logoRedTrimmed from '../assets/logo-red-trimmed.png';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <a href="/">
              <img
                src={logoRedTrimmed}
                style={{ width: '30vh' }}
                alt="AI Haiku logo: the word 'Haiku' in japanese calligraphy with the 'AI' in red and the rest of the letters in black."
              />
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
