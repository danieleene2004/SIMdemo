import * as THREE from 'three';

//! IMPORT HELPER ENTITIES
//! SETUP
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//@ts-ignore
const renderer = new THREE.WebGLRenderer({canvas: artifactCanvas});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//@ts-ignore
camera.position.z = 10;

enum BuildingType {
	SolarPanel = 0,
	House = 1,
}
interface Vector3D {
	x: number;
	y: number;
	z: number;
}
interface Building {
	type: BuildingType;
	position: Vector3D;
	size: Vector3D;
}
function buildEntity(building: Building) {
	
	const geometry = new THREE.BoxGeometry(building.position.x, building.position.y, building.position.z);
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
}
//! ANIMATION LOOP
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();