import Interaction from './Interaction';
import MatsuoRenderer from './Matsuo/MatsuoRenderer';

export default function Home() {
    return (
        <>
            <MatsuoRenderer showMatsuo={true} />
            <Interaction />
        </>
    );
    }
