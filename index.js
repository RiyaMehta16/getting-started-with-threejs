import * as THREE from "three";
//3 things three.js needs for a scene:
//-renderer, camera and a scene object

const width = window.innerWidth;
const height = window.innerHeight;
//SETTING UP RENDERER=================================

const renderer = new THREE.WebGLRenderer({ antialias: true });
//antialias: Aliasing refers to the jagged, stair-stepped edges that appear in digital images, especially on diagonal lines. Anti-aliasing is the technique used to reduce or eliminate these jagged edges, creating smoother, more natural-looking graphics.
renderer.setSize(width, height);
//also want to append to Dom, DOM being our HTML Page
document.body.appendChild(renderer.domElement); //it is essentially a canvas element, we can do it in HTML too by setting up a canvas element inside the HTML, and use that when we set up the renderer,
// but this way is better because threejs will handle it

//SETTING UP CAMERA=================================
//PerspectiveCamera:This projection mode is designed to mimic the way the human eye sees. It is the most common projection mode used for rendering a 3D scene.
//has 4 parameters:
//-fov=field of view
//-aspect=aspect ratio
//-near= Camera frustum near plane
//far= Camera frustum far plane.
const fov = 75; //75 degrees if we make it 5, only 5 degrees of portion can be seen and view would be very narrow, if it is 90 degrees, view would be very broad
const aspect = width / height;

const near = 0.1; //render will start rendering closer to camera, anything less than 0.1 will make the element invisible

const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

//now to scooch the camera a bit back, we will use position to see what is at the center of the scene

camera.position.z = 2;

const scene = new THREE.Scene();

//above is the core of the 3d animation

// ADDONS TO THREEJS LIBRARY
import { OrbitControls } from "jsm/controls/OrbitControls.js";
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03; //like after playing with the dragging it slowing stops, this won't work until you add it to your animation=>controls.update()

//Threejs has some primitives: geometrical shapes prebuilt in it , let's use those:
//IcosahedronGeometry(size, detail)=>detail as in facets/faces in a sphere like those 3d animation reels you see of cloth falling on a sphere with x no. of faces
const geo = new THREE.IcosahedronGeometry(1.0, 2);
//we want to put material basic on that geometry(again prebuilt, just to give color), it doesnot interact with light but MeshStandardMaterial does!:
// const mat = new THREE.MeshBasicMaterial({
//   color: 0xccff,
// });

const mat = new THREE.MeshStandardMaterial({
  //initially everything becomes invisible because there are no lights for that we used "hemiLights"
  color: 0xffffff,
  flatShading: true, //allows you to see all the facets
});
//mesh is container for both geometry and material
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

//Adding new Geometry=======================
//geometry
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
//mesh
const wireMesh = new THREE.Mesh(geo, wireMat);
//adding to the scene to see it
// scene.add(wireMesh);

//to make it less flickery, scaled it up
wireMesh.scale.setScalar(1.0001);

//adding it to mesh as a child element
mesh.add(wireMesh);

//Adding light===============================
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

// renderer.render(scene, camera);

//let's wrap the above render call in a function so that we can call it again and again, then as we update the scene, we'll see some animation
function animate(t = 0) {
  //it works through the api :requestAnimationFrame(name_of_function)
  requestAnimationFrame(animate); //to change the scale of the object
  mesh.rotation.y = t * 0.0001; //time=every ten seconds one rotation but (only the 3d object moves, the lines remain stationary)=> to resolve this, we added a child element to the FIRST MESH, using mesh.add(wireMesh) than adding the child to the WHOLE SCENE
  //   mesh.scale.setScalar(Math.cos(t * 0.001));
  renderer.render(scene, camera);
  //don't forget to call it the first time though!

  controls.update();
}

animate(); //now it is being called every second
