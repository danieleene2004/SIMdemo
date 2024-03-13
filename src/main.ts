import * as THREE from 'three';
import { Vector3D, Building, BuildingType } from './models';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PointLight } from 'three';
import * as THREEx from "threex-domevents"

//! SETUP
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.rotateY(45);
//@ts-ignore
camera.position.z = 10; camera.position.y = 10;

let cursor: Vector3D = { x: 1, y: 0, z: 1 };
let grid: THREE.Mesh[][] = [];
let select: boolean = false;
let selection: THREE.Mesh[][] = [];

//@ts-ignore
const renderer = new THREE.WebGLRenderer({canvas: artifactCanvas});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new PointLight(0xffffff, 100);
light.position.y = 10;
camera.add(light);
scene.add(new THREE.AmbientLight(), light);

const controls = new OrbitControls(camera, renderer.domElement)
controls.maxDistance = 15;
controls.minDistance = 2;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.rotateSpeed = 0.3; 
controls.maxTargetRadius = 20;

function buildEntity(building: Building) {
	const geometry = new THREE.BoxGeometry(building.size.x * 0.95, building.size.y * 0.95, building.size.z * 0.95);
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
			size: {x:1, y:0.2, z:1}
		}))
	}
	
	grid.push(temp);
	temp = [];
}

function cursorPosition() {
	grid.forEach(element => {
		element.forEach(cube => {
			cube.material = new THREE.MeshStandardMaterial( { color: 0xaa0000 } );
		});
	});
	grid[cursor.x][cursor.z].material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
}


function movement() {
	const speed = 1;
	camera.position.z += ((keys.backwards ? 1 : 0) - (keys.forward ? 1 : 0)) * speed;
	camera.position.x += ((keys.left ? 1 : 0) - (keys.right ? 1 : 0)) * speed;
}
const keys = {
	forward: false,
	backwards: false,
	left: false,
	right: false,
}
let collected: THREE.Mesh[][] = [];
grid.forEach(e => e.forEach(a => collected.push(a)));

/*var domEvents = new THREEx.domEvents(camera, renderer.domElement)
collected.forEach(mesh => {
	domEvents.addEventListener(mesh, 'click', function(event){
		console.log('you clicked on mesh', mesh)
	}, false);
})*/



//! ANIMATION LOOP
function animate() {
	requestAnimationFrame( animate );

	cursorPosition();
	movement();
	controls.update();
	renderer.render( scene, camera );
}

animate();

