import { addMatsuoRenderer } from "./MatsuoRenderer";

export default function Home() {
    addMatsuoRenderer();
    return (
        <>
            {/* <canvas></canvas> */}
            <p>Hello.</p>
            <a href='/mint'>Go to the mint page</a>
            <br /><br />
        </>
    );
}