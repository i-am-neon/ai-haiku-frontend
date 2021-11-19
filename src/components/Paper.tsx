import { ShunsuCarousel, OguraCarousel, UnryuCarousel, GoldAndSilverCarousel } from "./Carousel";

export default function Paper() {
    return (
        <>
            <h1>Paper</h1>
            <p>
                Your AI Haiku NFT will live on both digital and physical paper.
                The paper is represented digitally as a metadata property and resides
                as the background of the image of your haiku. AI Haiku owners (called "Poets")
                will have the privelage of receiving their haiku printed on handmade paper from
                Japan; shipped anywhere in the world for free.
            </p>
            <p>
                <i>
                    For each poet that does not opt in to receive a physical copy, the cost of
                    creating the physical copy will be donated to a charity voted on by the community.
                </i>
            </p>
            <p>
                Below are the four types of paper that will hold your haiku. The paper will be chosen
                at random based on rarity when the haiku is minted.
            </p>

            <hr />

            <h2>Shunsu</h2>
            <p>
                <i>40% of Haikus</i>
            </p>
            <p>
                Material: Kozo (Mullberry) and Alpha Cellulose
                <br />
                Weight: 87gsm
                <br />
                pH: 6 to 7
            </p>
            <p>
                An extremely elegant paper with dense fiber inclusions, Shunshu exemplifies the Japanese aesthetic.
            </p>
            <ShunsuCarousel />

            <hr />

            <h2>Ogura</h2>
            <p>
                <i>30% of Haikus</i>
            </p>
            <p>
                Material: Hemp
                <br />
                Weight: 70gsm
                <br />
                pH: 7 to 8
            </p>
            <p>
                Ogura's dense and eco-friendly hemp fibers are very expressive indeed.
                One side has more texture while the reverse side remains smooth.
            </p>

            <OguraCarousel />

            <hr />

            <h2>Unryu</h2>
            <p>
                <i>20% of Haikus</i>
            </p>
            <p>
                Material: Kozo (Mullberry) and Alpha Cellulose
                <br />
                Weight: 200gsm
                <br />
                pH: 8 to 9
            </p>
            <p>
                This extra thick paper is engulfed with dramatic Kozo inclusions and
                will undoubtedly attract attention to your haiku.
            </p>
            <UnryuCarousel />

            <hr />

            <h2>Gold and Silver</h2>
            <p>
                <i>10% of Haikus</i>
            </p>
            <p>
                Material: Kozo (Mullberry) with gold and silver
                <br />
                Weight: 70gsm
                <br />
                pH: 6 to 7
            </p>
            <p>
                Thin, smooth paper with the understated elegance of real gold and silver inclusions.
            </p>
            <GoldAndSilverCarousel />
        </>
    )
}