import * as THREE from "three";

const w = window.innerHeight;
const h = window.innerWidth;
//renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);
// camera
// const aspect = 2;  // the canvas default
const camera = new THREE.PerspectiveCamera(75, 3, 0.1, 5);

camera.position.z = 2;

//scene
const scene = new THREE.Scene();
//geometry
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
//material
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
//mesh
const cube = new THREE.Mesh(geometry, material);
//adding mesh to scene
// scene.add(cube);
//render the scene by calling the renderer's render function and passing it the scene and the camera
// renderer.render(scene, camera);
const wireMat = new THREE.MeshPhongMaterial({
  color: 0x000000,
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geometry, wireMat);
cube.add(wireMesh);
// wireMesh.scale.setScalar(1.0001);

//setting up directional light
const color = 0x7d6b73;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

//function for animation
// function animate(time) {
//   time *= 0.001;
//   cube.rotation.x = time;
//   cube.rotation.y = time;

//   renderer.render(scene, camera);
//   requestAnimationFrame(animate);
// }
// requestAnimationFrame(animate);
// a function that creates a new material with the specified color
function makeCubeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({
    color: color,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = x;
  return cube;
}

const cubes = [
  makeCubeInstance(geometry, 0x44aa88, 0),
  makeCubeInstance(geometry, 0x8844aa, -2),
  makeCubeInstance(geometry, 0xaa8844, 2),
];

function animateCubes(time) {
  time *= 0.001;
  cubes.forEach((cube, ndx) => {
    //ndx=index?
    const speed = 1 + ndx * 0.1;
    const rotation = speed * time;
    cube.rotation.x = rotation;
    cube.rotation.y = rotation;
  });
  renderer.render(scene, camera);
  requestAnimationFrame(animateCubes);
}
requestAnimationFrame(animateCubes);
