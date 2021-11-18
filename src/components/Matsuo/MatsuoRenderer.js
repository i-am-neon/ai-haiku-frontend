import React from 'react';
import Fade from '@mui/material/Fade';
import * as THREE from 'three'
import { render, events } from '@react-three/fiber'
import Matsuo from './Matsuo'
import exampleHaiku from '../../assets/exampleHaiku.png'
import { height } from '@mui/system';

export default class Canvas extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.updateCanvas();
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
            }),
            size: { width: window.innerWidth * .9, height: window.innerHeight * .4}
        })
    }


    render() {
        return (
            <>
                <Fade in={true} transition={3000}>
                    <img
                        src={exampleHaiku}
                        style={{ height: '50vh' }}
                        className={this.props.showExampleHaiku ? '' : 'hidden'}
                    />
                </Fade>
                <Fade in={true}>
                    <canvas className={this.props.showExampleHaiku ? 'hidden': ''} />
                </Fade>
            </>
        )
    }
}
