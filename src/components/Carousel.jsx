import { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// Shunsu
import shunsu_0 from '../assets/paper/0_shunsu/0.jpg';
import shunsu_1 from '../assets/paper/0_shunsu/1.jpg';
import shunsu_2 from '../assets/paper/0_shunsu/2.jpg';

// Ogura
import ogura_0 from '../assets/paper/1_ogura/0.jpg';
import ogura_1 from '../assets/paper/1_ogura/1.jpg';
import ogura_2 from '../assets/paper/1_ogura/2.jpg';

// Unryu
import unryu_0 from '../assets/paper/2_unryu/0.jpg';
import unryu_1 from '../assets/paper/2_unryu/1.jpg';
import unryu_2 from '../assets/paper/2_unryu/2.jpg';

// Gold and Silver
import gold_silver_0 from '../assets/paper/3_gold_and_silver/0.jpg';
import gold_silver_1 from '../assets/paper/3_gold_and_silver/1.jpg';

export class ShunsuCarousel extends Component {
    render() {
        return (
            <div style={{ width: '80vw', marginLeft: '10vw' }}>
                <Carousel
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={true}
                    useKeyboardArrows={false}
                    swipeable={false}
                    emulateTouch={false}
                >
                    <div>
                        <img src={shunsu_0} />
                    </div>
                    <div>
                        <img src={shunsu_1} />
                    </div>
                    <div>
                        <img src={shunsu_2} />
                    </div>
                </Carousel>
            </div>
        );
    }
};

export class OguraCarousel extends Component {
    render() {
        return (
            <div style={{ width: '80vw', marginLeft: '10vw' }}>
                <Carousel
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={true}
                    useKeyboardArrows={false}
                    swipeable={false}
                    emulateTouch={false}
                >
                    <div>
                        <img src={ogura_0} />
                    </div>
                    <div>
                        <img src={ogura_1} />
                    </div>
                    <div>
                        <img src={ogura_2} />
                    </div>
                </Carousel>
            </div>
        );
    }
};

export class UnryuCarousel extends Component {
    render() {
        return (
            <div style={{ width: '80vw', marginLeft: '10vw' }}>
                <Carousel
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={true}
                    useKeyboardArrows={false}
                    swipeable={false}
                    emulateTouch={false}
                >
                    <div>
                        <img src={unryu_0} />
                    </div>
                    <div>
                        <img src={unryu_1} />
                    </div>
                    <div>
                        <img src={unryu_2} />
                    </div>
                </Carousel>
            </div>
        );
    }
};

export class GoldAndSilverCarousel extends Component {
    render() {
        return (
            <div style={{ width: '80vw', marginLeft: '10vw' }}>
                <Carousel
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={true}
                    useKeyboardArrows={false}
                    swipeable={false}
                    emulateTouch={false}
                >
                    <div>
                        <img src={gold_silver_0} />
                    </div>
                    <div>
                        <img src={gold_silver_1} />
                    </div>
                </Carousel>
            </div>
        );
    }
};
