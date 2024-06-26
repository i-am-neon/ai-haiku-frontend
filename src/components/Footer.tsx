import IconButton from '@mui/material/IconButton';
import { ReactComponent as DiscordIcon } from '../assets/discord.svg';
import { ReactComponent as TwitterIcon } from '../assets/twitter.svg';

export default function Footer() {
    return (
        <div style={{ textAlign: 'left', position: 'absolute', bottom: '0.25rem', width: '100%', height: '2rem' }}>
            <a href='/terms' style={{ paddingLeft: '1rem', paddingRight: '1rem'}}>Terms</a>
            <a href='https://etherscan.io/token/0x60129872C5e9decAfa95f77fA6983182aA1a5E88' target="_blank" rel="noreferrer" style={{ paddingLeft: '1rem', paddingRight: '1rem'}}>Contract</a>
            <a href='https://opensea.io/collection/ai-haiku' target="_blank" rel="noreferrer" style={{ paddingLeft: '1rem', paddingRight: '1rem'}}>OpenSea</a>
            <IconButton href='https://twitter.com/aihaikuNFTs' target='_blank' aria-label="Twitter" color={'inherit'}>
                <TwitterIcon fill="black" style={{ height: '4vh', maxHeight: '20px' }} />
            </IconButton>
            <IconButton href="https://discord.gg/PAJjTrkkMy" target='_blank' rel="noreferrer" aria-label="Discord" color={'inherit'}>
                <DiscordIcon fill="black" style={{ height: '4vh', maxHeight: '20px' }} />
            </IconButton>
        </div>
    );
}
