import IconButton from '@mui/material/IconButton';
import { ReactComponent as DiscordIcon } from '../assets/discord.svg';
import { ReactComponent as TwitterIcon } from '../assets/twitter.svg';

export default function Footer() {
    return (
        <div style={{ textAlign: 'left', position: 'absolute', bottom: '0.25rem', width: '100%', height: '2rem' }}>
            <a href='/terms' style={{ paddingLeft: '1rem', paddingRight: '1rem'}}>Terms</a>
            <IconButton href='https://twitter.com/' target='_blank' aria-label="Twitter" color={'inherit'}>
                <TwitterIcon fill="black" style={{ height: '4vh', maxHeight: '20px' }} />
            </IconButton>
            <IconButton href="https://discord.gg/" target='_blank' aria-label="Discord" color={'inherit'}>
                <DiscordIcon fill="black" style={{ height: '4vh', maxHeight: '20px' }} />
            </IconButton>
        </div>
    );
}
