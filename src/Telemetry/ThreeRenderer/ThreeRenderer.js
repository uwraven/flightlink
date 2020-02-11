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
        this.renderVectorLabel = this.renderVectorLabel.bind(this);
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
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const el = entry.target;
                const w = el.clientWidth;
                const h = el.clientHeight;
                this.manager.camera.aspect = w / h;
                this.manager.camera.updateProjectionMatrix();
                this.manager.renderer.setSize(w, h);
            }
        })
        resizeObserver.observe(this.sceneRoot);
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
        controls.minDistance = 3;
        controls.maxPolarAngle = Math.PI / 2 - 0.0005;
        controls.target = new Vector3(0, 0, 1);

        this.createSceneObjects()

        let animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, cam);

            const vehicle = scene.getObjectByName("vehicle");
        
            if (this.props.renderedState) {
                const {r, v, q, w} = this.props.renderedState;

                vehicle.setRotationFromQuaternion((new THREE.Quaternion(q.x, q.y, q.z, q.w)).normalize());
                vehicle.position.set(r.x, r.y, r.z);
            }

            // vehicle.rotation.z += 0.01;

            controls.update();
        };

        animate();
    }

    createSceneObjects() {
        const bound_x = 500;
        const bound_y = 500;

        // Create a ground grid
        let groundGrid = new THREE.GridHelper(bound_x, bound_y, 0xd8d8d8, 0xdfdfdf);
        // groundGrid.up.set(0, 0, 1);
        groundGrid.rotation.x = Math.PI / 2;
        groundGrid.position.z = -0.005;
        this.manager.scene.add(groundGrid);

        // Create a ground plane to receive shadows
        let groundPlaneGeometry = new THREE.PlaneGeometry(bound_x, bound_y, 1, 1);
        let groundPlaneMaterial = new THREE.MeshLambertMaterial({
            color: 0xe8e8e8,
            metalness: 0.1,
        })
        let groundPlane = new THREE.Mesh(groundPlaneGeometry, groundPlaneMaterial);
        groundPlane.receiveShadow = true;
        // groundPlane.rotation.x = -Math.PI / 2;
        groundPlane.position.z = -0.015;
        this.manager.scene.add(groundPlane);

        let globalLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.manager.scene.add(globalLight);

        // Create a directional light
        let dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
        dirLight.target.position.set(groundPlane.position);
        dirLight.castShadow = true;
        dirLight.position.x = 30;
        dirLight.position.y = 10;
        dirLight.position.z = 100;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        this.manager.scene.add(dirLight);

        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshLambertMaterial({color: 0xff3300});
        let vehicle = new THREE.Mesh(geometry, material);
        vehicle.position.z = 1;
        vehicle.castShadow = true;
        vehicle.name = "vehicle";
        this.manager.scene.add(vehicle);

        let vehicleAxesHelper = new THREE.AxesHelper(2);
        vehicle.add(vehicleAxesHelper);

        let sceneAxesHelper = new THREE.AxesHelper(100);
        this.manager.scene.add(sceneAxesHelper);

        const cam = this.manager.camera;
        cam.position.y = -10;
        cam.position.x = 2;
        cam.position.z = 4;
        cam.lookAt(new THREE.Vector3(0, 0, 0));

    }

    render() {
        return(
            <div ref={ref => this.sceneRoot = ref} className={this.props.className}>
                { this.props.displayHUD && 
                    <div className={styles.panelLeft}>
                        <p>Position</p>
                        {this.renderVectorLabel(this.props.renderedState.r, ["x", "y", "z"])}
                        <p>Velocity</p>
                        {this.renderVectorLabel(this.props.renderedState.v, ["x", "y", "z"])}
                        <p>Attitude</p>
                        {this.renderVectorLabel(this.props.renderedState.q, ["w", "x", "y", "z"])}
                        <p>Angular</p>
                        {this.renderVectorLabel(this.props.renderedState.r, ["x", "y", "z"])}
                    </div>
                }
                {/* <div className={styles.panelRight}>
                    <h1>Other</h1>
                </div> */}
            </div>
        )
    }

    renderVectorLabel(vector, labels) {
        return(
            <div className={styles.vectorLabel}>
                { Object.values(vector).map((value, i) => {
                    return(
                        <div className={styles.vectorLabelRow}>
                            <span>{labels[i]}</span>
                            <span>{value.toFixed(2)}</span>
                        </div>
                    );
                })}
            </div>
        )
    }


}

export default ThreeRenderer;