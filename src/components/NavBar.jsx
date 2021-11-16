import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as DiscordIcon } from '../assets/discord.svg';
import { ReactComponent as TwitterIcon } from '../assets/twitter.svg';
import logo from '../assets/logo.png';
import logoRed from '../assets/logo-red.png';
import { colors } from '../styles';
import { height } from '@mui/system';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <a href="/">
              <img
                src={logoRed}
                style={{ width: '30vh' }}
                alt="AI Haiku logo: the word 'Haiku' in japanese calligraphy with the 'AI' in red and the rest of the letters in black."
              />
            </a>
          </Typography>
          {/* <IconButton href='https://twitter.com/HashStacheNFTs' target='_blank' aria-label="Twitter" color={'inherit'}>
            <TwitterIcon fill={colors.crimsonGlory} style={{ height: '4vh', maxHeight: '30px' }} />
          </IconButton>
          <IconButton href="https://discord.gg/QWH3MBkrQs" target='_blank' aria-label="Discord" color={'inherit'}>
            <DiscordIcon fill={colors.crimsonGlory} style={{ height: '4vh', maxHeight: '30px' }} />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
