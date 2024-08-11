import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';



var camera, scene, renderer, geometry, material, cube;
const loader = new GLTFLoader();

// Boolean for start and restart
var initAnim = true;
var runAnim = false;
var isPlay = false;
var theta = 0;

init();
render();

function init() {

    // Buttons startButton and resetButton
    var startButton = document.getElementById( 'startButtonId' );
    var resetButton = document.getElementById( 'resetButtonId' );
   
    // Start Button
     startButton.onclick = function StartAnimation() {
   
     if (initAnim) {
       initAnim = false;
       runAnim = true;
       theta = 0;
     }
     // Start and Pause 
     if (runAnim) { 
       startButton.innerHTML = 'Pause';
       runAnim = false;
       isPlay = true;
       console.log(runAnim, isPlay)
       animate();
       } else {
             startButton.innerHTML = 'Restart';
             runAnim = true;
             isPlay = false;
       }
     }

     // Reset Button
   resetButton.onclick = function ResetParameters() {

    // Set StartButton to Start  
    startButton.innerHTML = 'Start';
 
    // Boolean for Stop Animation
    initAnim = true;
    runAnim = false;
    theta = 0;
    isPlay = false;
    console.log(initAnim, runAnim,theta, isPlay);
    render();
    }
   
 scene = new THREE.Scene();
 camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

 renderer = new THREE.WebGLRenderer({ alpha: true });
 renderer.setSize( window.innerWidth, window.innerHeight );
 document.body.appendChild( renderer.domElement );

 geometry = new THREE.BoxGeometry( 3, 3, 3 );
 const color6 = new THREE.Color( 'skyblue' );
 material = new THREE.MeshBasicMaterial( { color: color6 } );
 cube = new THREE.Mesh( geometry, material );
 scene.add( cube );

scene.add(new THREE.AmbientLight(0x404040, 1000));
/*loader.load(
	// resource URL
	'pony_cartoon/scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );
        
		//gltf.animations; // Array<THREE.AnimationClip>
		//gltf.scene; // THREE.Group
		//gltf.scenes; // Array<THREE.Group>
		//gltf.cameras; // Array<THREE.Camera>
		//gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

*/
camera.position.z = 9;
}



function animate(delta) {
	
    console.log(runAnim);

   if (!isPlay) return;
    requestAnimationFrame(animate);
    theta += 0.01;

    render();
}

function render() {
   
    cube.rotation.x = theta;
    cube.rotation.y = theta;
    renderer.render( scene, camera );

}


