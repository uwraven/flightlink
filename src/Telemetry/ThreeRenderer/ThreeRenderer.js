import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import styles from './ThreeRenderer.module.scss';
import { Vector3 } from 'three';

class ThreeRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.initializeScene = this.initializeScene.bind(this);
        this.createSceneObjects = this.createSceneObjects.bind(this);
    }

    componentDidMount() {
        THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
        this.manager = {
            scene: new THREE.Scene(),
            camera: new THREE.PerspectiveCamera(45, 1, 0.01, 500),
            renderer: new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
            }),
        }
        this.sceneRoot.appendChild(this.manager.renderer.domElement);
        this.manager.controls = new OrbitControls(this.manager.camera, this.manager.renderer.domElement);
        this.initializeScene();
    }

    initializeScene() {
        const cam = this.manager.camera;
        const scene = this.manager.scene;
        const renderer = this.manager.renderer;
        const controls = this.manager.controls;
        
        const w = this.sceneRoot.clientWidth;
        const h = this.sceneRoot.clientHeight;
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(2.0);
        renderer.shadowMapEnabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.shadowMap.needsUpdate = true;
        renderer.render(scene, cam);
        controls.maxDistance = 50;
        controls.maxPolarAngle = Math.PI / 2 - 0.02;
        controls.target = new Vector3(0, 0, 1);

        this.createSceneObjects()

        this.onResize = () => {
            const w = this.sceneRoot.clientWidth;
            const h = this.sceneRoot.clientHeight;
            cam.aspect = w / h;
            cam.updateProjectionMatrix();
            renderer.setSize(w, h);
        }

        this.onResize = this.onResize.bind(this);
        window.addEventListener('resize', this.onResize);

        var animate = () => {
            requestAnimationFrame(animate);
            // vehicle.rotation.x += 0.001;
            // vehicle.rotation.z += 0.001;
            renderer.render(scene, cam);

            const vehicle = scene.getObjectByName("vehicle");
            vehicle.rotation.z += 0.01;
            // if (vehicle) controls.target = vehicle.position;

            controls.update();
        };

        animate();
    }

    createSceneObjects() {
        const bound_x = 400;
        const bound_y = 400;

        // Create a ground grid
        var groundGrid = new THREE.GridHelper(bound_x, bound_y, 0xd8d8d8, 0xdfdfdf);
        // groundGrid.up.set(0, 0, 1);
        groundGrid.rotation.x = Math.PI / 2;
        groundGrid.position.z = -0.001;
        this.manager.scene.add(groundGrid);

        // Create a ground plane to receive shadows
        var groundPlaneGeometry = new THREE.PlaneGeometry(bound_x, bound_y, 1, 1);
        var groundPlaneMaterial = new THREE.MeshLambertMaterial({
            color: 0xe8e8e8,
            metalness: 0.1,
        })
        var groundPlane = new THREE.Mesh(groundPlaneGeometry, groundPlaneMaterial);
        groundPlane.receiveShadow = true;
        // groundPlane.rotation.x = -Math.PI / 2;
        groundPlane.position.z = -0.002;
        this.manager.scene.add(groundPlane);

        var globalLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.manager.scene.add(globalLight);

        // Create a directional light
        var dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
        dirLight.target.position.set(groundPlane.position);
        dirLight.castShadow = true;
        dirLight.position.x = 0;
        dirLight.position.y = 0;
        dirLight.position.z = 100;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        this.manager.scene.add(dirLight);

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshLambertMaterial({color: 0xff3300});
        var vehicle = new THREE.Mesh(geometry, material);
        vehicle.position.z = 1;
        vehicle.castShadow = true;
        vehicle.name = "vehicle";
        this.manager.scene.add(vehicle);

        var vehicleAxesHelper = new THREE.AxesHelper(2);
        vehicle.add(vehicleAxesHelper);

        var sceneAxesHelper = new THREE.AxesHelper(100);
        this.manager.scene.add(sceneAxesHelper);

        const cam = this.manager.camera;
        cam.position.y = -2;
        cam.position.x = -10;
        cam.position.z = 4;
        cam.lookAt(new THREE.Vector3(0, 0, 0));

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    render() {
        return(
            <div ref={ref => this.sceneRoot = ref} className={this.props.className}>
                {/* <div className={styles.panelLeft}>
                    <h1>Label</h1>
                </div>
                <div className={styles.panelRight}>
                    <h1>Other</h1>
                </div> */}
            </div>
        )
    }
}

export default ThreeRenderer;