import React, { Component } from 'react';
import * as THREE from 'three';

class ThreeRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        var scene = new THREE.Scene();
        var cam = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.root.clientWidth, this.root.clientHeight);
        this.root.appendChild(renderer.domElement);
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({color: 0xfff});
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        renderer.render(scene, cam);
    }

    render() {
        return(
            <div ref={ref => this.root = ref} style={{width: '300px', height: '300px'}}>
                
            </div>
        )
    }
}

export default ThreeRenderer;