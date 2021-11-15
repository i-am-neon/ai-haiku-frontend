import { addMatsuoRenderer } from "./MatsuoRenderer";
import Canvas from './Canvas';
export default function Home() {
    // addMatsuoRenderer();
    return (
        <>
            {/* <canvas></canvas> */}
            <Canvas />
            <p>Hello.</p>
            <a href='/mint'>Go to the mint page</a>
            <br /><br />
        </>
    );
}