import * as THREE from 'three';
import { Vector3D, Building, BuildingType } from './models';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PointLight } from 'three';

//! IMPORT HELPER ENTITIES
//! SETUP
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.rotateY(45);
//@ts-ignore
camera.position.z = 10; camera.position.y = 10;


let cursor: Vector3D = { x: 0, y: 0, z: 0 };
let grid: THREE.Mesh[][] = []

//@ts-ignore
const renderer = new THREE.WebGLRenderer({canvas: artifactCanvas});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new PointLight(0xffffff, 50);
light.position.y = 5;
scene.add(new THREE.AmbientLight(), light);
const controls = new OrbitControls(camera, renderer.domElement)
controls.maxDistance = 15;
controls.minDistance = 2;


function buildEntity(building: Building) {
	const geometry = new THREE.BoxGeometry(building.size.x * 0.9, building.size.y * 0.9, building.size.z * 0.9);
	const material = new THREE.MeshStandardMaterial( { color: 0xaa0000 } );
	const cube = new THREE.Mesh( geometry, material );
	//@ts-ignore
	cube.position.z = building.position.z
	//@ts-ignore
	cube.position.x = building.position.x
	//@ts-ignore
	cube.position.y = building.position.y
	scene.add( cube );
	return cube;
}

for (let index = -10; index < 10; index++) {
	let temp: THREE.Mesh[] = []
	for (let jndex = -10; jndex < 10; jndex++) {
		temp.push(buildEntity({
			type: BuildingType.GridTile,
			position: {x:index, y:1, z:jndex},
			size: {x:1, y:1, z:1}
		}))
	}
	console.log(temp);
	
	grid.push(temp);
	temp = [];
}

//! ANIMATION LOOP
function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
	
}

animate();