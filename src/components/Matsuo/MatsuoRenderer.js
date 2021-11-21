import React from 'react';
import Fade from '@mui/material/Fade';
import * as THREE from 'three'
import { render, events } from '@react-three/fiber'
import Matsuo from './Matsuo'
import exampleHaiku from '../../assets/exampleHaiku.png'

const EXAMPLE_HAIKU_ALT_TEXT = `An example haiku. The background image is rough japanese paper. In the top right corner is Japanese characters. The center holds the text, "Shadows of Canyons, A flat road, a car... Sunset over Zion". The bottom left has black inky brush strokes.`

export default class Canvas extends React.Component {

    componentDidMount() {
        this.updateCanvas();
        window.addEventListener('resize', this.updateCanvas);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateCanvas);
    }

    updateCanvas() {
        render(<Matsuo />, document.querySelector('canvas'), {
            events,
            linear: true,
            camera: { fov: 30, position: [0, 0, 6] },
            gl: new THREE.WebGL1Renderer({
                canvas: document.querySelector('canvas'),
                antialias: true,
                alpha: true
            }).setClearColor(0xffffff),
            size: { width: window.innerWidth * .9, height: window.innerHeight * .4 }
        })
    }


    render() {
        return (
            <>
                <Fade in={true} transition={3000}>
                    <img
                        src={exampleHaiku}
                        style={{ height: '50vh' }}
                        alt={EXAMPLE_HAIKU_ALT_TEXT}
                        className={this.props.showExampleHaiku ? '' : 'hidden'}
                    />
                </Fade>
                <Fade in={true}>
                    <canvas className={this.props.showExampleHaiku ? 'hidden' : ''} />
                </Fade>
            </>
        )
    }
}
