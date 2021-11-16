import React from 'react';
import * as THREE from 'three'
import { render, events } from '@react-three/fiber'
import Matsuo from './Matsuo'

export default class Canvas extends React.Component {
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
            <canvas style={{ width: '25vh', height: '25vh' }} />
        );
    }
}
