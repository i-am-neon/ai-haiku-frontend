import { ShunsuCarousel, OguraCarousel, UnryuCarousel, GoldAndSilverCarousel } from "./Carousel";

export default function Paper() {
    return (
        <>
            <h3>Shunsu</h3>
            <ShunsuCarousel />
            <h3>Ogura</h3>
            <OguraCarousel />
            <h3>Unryu</h3>
            <UnryuCarousel />
            <h3>Gold and Silver</h3>
            <GoldAndSilverCarousel />
        </>
    )
}