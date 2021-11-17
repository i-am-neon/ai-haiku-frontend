import React from 'react';
import Fade from '@mui/material/Fade';
import * as THREE from 'three'
import { render, events } from '@react-three/fiber'
import Matsuo from './Matsuo'

function CanvasElement(props) {
    if (props.showMatsuo) {
        return (
            <Fade in={true} >
                <canvas style={{ width: '25vh', height: '25vh' }} />
            </Fade>
        );
    } else {
        return(
            <Fade in={true} transition={3000}>
                <p>HI THERE</p>
            </Fade>
        )
    }
}

export default class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showMatsuo: props.showMatsuo }
    }

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        render(<Matsuo />, document.querySelector('canvas'), {
            events,
            linear: true,
            camera: { fov: 30, position: [0, 0, 6] },
            // https://barradeau.com/blog/?p=621
            // This examples needs WebGL1 (?)
            gl: new THREE.WebGL1Renderer({
                canvas: document.querySelector('canvas'),
                antialias: true,
                alpha: true
            })
        })
    }

    render() {
        return (
            <div>
                <CanvasElement showMatsuo={this.state.showMatsuo} />
                <p><a onClick={() => this.setState({ showMatsuo: !this.state.showMatsuo })}>
                    SHIT
                </a></p>
            </div>
            // <Fade in={true} >
            //     <canvas style={{ width: '25vh', height: '25vh' }} />
            // </Fade>
        );
    }
}
