
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AmbientLight } from 'three';
import { PointLight } from 'three';



const scene = new THREE.Scene();

 
const camera = new THREE.PerspectiveCamera(75, (window.innerWidth/2)/window.innerHeight , 0.1 , 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg1'),
  alpha:true
});

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false
controls.enableDamping = true;   //damping 
controls.dampingFactor = 0.25;

renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize((window.innerWidth/2),window.innerHeight);

camera.position.setZ(4);


const l1 = new AmbientLight(0xffffff,4)
l1.position.setZ(100)
const helper = new THREE.PointLightHelper(l1)
scene.add(l1,helper)


// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const loader = new GLTFLoader()
loader.load('scene.gltf',(gltf)=>{
  const shoe = gltf.scene.children[0]
  shoe.scale.set(0.1,0.1,0.1)
  scene.rotateY(4)
  scene.add(gltf.scene)

})

renderer.render(scene,camera)

const tick = () =>{

  window.requestAnimationFrame(tick)

  

  controls.update()
  

  renderer.render(scene,camera)
}
tick()

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}