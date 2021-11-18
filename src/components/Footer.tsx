import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as DiscordIcon } from '../assets/discord.svg';
import { ReactComponent as TwitterIcon } from '../assets/twitter.svg';
import logo from '../assets/logo.png';
import logoRed from '../assets/logo-red.png';
import logoRedTrimmed from '../assets/logo-red-trimmed.png';
import { colors } from '../styles';
import { height } from '@mui/system';

export default function Footer() {
    return (
        // <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }} sx={{ top: 'auto', bottom: 0 }}>
        //     <Toolbar>
        //         <a href='/terms'>Terms</a>
        // <IconButton href='https://twitter.com/HashStacheNFTs' target='_blank' aria-label="Twitter" color={'inherit'}>
        //     <TwitterIcon fill="black" style={{ height: '4vh', maxHeight: '20px' }} />
        // </IconButton>
        // <IconButton href="https://discord.gg/QWH3MBkrQs" target='_blank' aria-label="Discord" color={'inherit'}>
        //     <DiscordIcon fill="black" style={{ height: '4vh', maxHeight: '20px' }} />
        // </IconButton>
        //     </Toolbar>
        // </AppBar>
        <div style={{ textAlign: 'left', position: 'absolute', bottom: '0.25rem', width: '100%', height: '2rem' }}>
            <a href='/terms' style={{ paddingLeft: '1rem', paddingRight: '1rem'}}>Terms</a>
            <IconButton href='https://twitter.com/HashStacheNFTs' target='_blank' aria-label="Twitter" color={'inherit'}>
                <TwitterIcon fill="black" style={{ height: '4vh', maxHeight: '20px' }} />
            </IconButton>
            <IconButton href="https://discord.gg/QWH3MBkrQs" target='_blank' aria-label="Discord" color={'inherit'}>
                <DiscordIcon fill="black" style={{ height: '4vh', maxHeight: '20px' }} />
            </IconButton>
        </div>
    );
}
