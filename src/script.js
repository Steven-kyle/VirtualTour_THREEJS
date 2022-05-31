import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// groups
const Group0 = new THREE.Group();
const Group1 = new THREE.Group();
const Group2 = new THREE.Group();
const Group3 = new THREE.Group();


const button1 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 50, 50),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
button1.position.x = 30;
button1.position.z = 20;

Group0.add(button1);

const button2 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 50, 50),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
button2.position.x = -30;
button2.position.z = -20;

Group0.add(button2);

// const buttonBack = new THREE.Mesh(
//   new THREE.SphereBufferGeometry(1, 50, 50),
//   new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// );
// buttonBack.position.x = -30;
// buttonBack.position.z = -20;

// Group1.add(buttonBack);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();


function EnvironmentTexture(num) {
  let foldernum = num;
  let texturefolder = ["room1", "room2"];
  let texturePath = "/environmentTextures/" + texturefolder[foldernum] + "/";
  const textureLoader = new THREE.TextureLoader();
  const pX = textureLoader.load(`${texturePath}px.png`);
  const nX = textureLoader.load(`${texturePath}nx.png`);
  const pY = textureLoader.load(`${texturePath}py.png`);
  const nY = textureLoader.load(`${texturePath}ny.png`);
  const pZ = textureLoader.load(`${texturePath}pz.png`);
  const nZ = textureLoader.load(`${texturePath}nz.png`);

  const envMaterials = [
    new THREE.MeshBasicMaterial({ map: pX, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: nX, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: pY, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: nY, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: pZ, side: THREE.DoubleSide }),
    new THREE.MeshBasicMaterial({ map: nZ, side: THREE.DoubleSide }),
  ];

  return envMaterials;
}

// function
function Room1s() {
  scene.remove(Group0);

  const envMaterials = EnvironmentTexture(1);



  const envCube = new THREE.Mesh(
    new THREE.BoxGeometry(100, 100, 100),
    new THREE.MeshFaceMaterial(envMaterials)
  );
  Group1.add(envCube);
  scene.add(Group1);

  const arrow = new THREE.ArrowHelper(
    raycaster.ray.direction,
    camera.getGlobalPosition,
    100,
    Math.random() * 0xffffff
  );
  scene.add(arrow);
}


window.addEventListener("click", (event) => {
  if (currentIntersect) {
    // console.log("button is Clicked");

    if (currentIntersect.object == button1) {
      console.log("button1");
    } else if (currentIntersect.object == button2) {
      Room1s();
    } else if (currentIntersect.object == buttonBack) {
      console.log("button back is pressed");
    }
  }
});


window.addEventListener("touchend", (event) => {
  if (currentIntersect) {
    // console.log("button is Clicked");

    if (currentIntersect.object == button1) {
      console.log("button1 Touched!");
    } else if (currentIntersect.object == button2) {
      console.log("button2 is pressed");
      Room1s();
    } else if (currentIntersect.object == buttonBack) {
      console.log("button back is pressed");
      console.log(currentIntersect.Object);
    }
  }
});


const envMaterials = EnvironmentTexture(0);


const envCube = new THREE.Mesh(
  new THREE.BoxGeometry(100, 100, 100),
  new THREE.MeshFaceMaterial(envMaterials)
);
Group0.add(envCube);
scene.add(Group0);



const gridHelper = new THREE.GridHelper();

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 0.1);
scene.add(camera);


const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

let labelRenderer = new CSS2DRenderer();
labelRenderer.setSize( window.innerWidth, window.innerHeight );
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.querySelector( "body" ).appendChild( labelRenderer.domElement );


                const text = document.createElement( 'div' );
                text.style.color = 'white'
                text.textContent = " hooooooooowapsdfjasfg";
                const label = new CSS2DObject( text );
						
                        scene.add(label)


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener("mousemove", onPointerMove);

function Touch(e) {
  

  pointer.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
  console.log(pointer.x, pointer.y);
  // console.log(clientX, clientY);
}
window.addEventListener("touchstart", Touch);


const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.rotateSpeed = 0.5;
controls.enableZoom = true;
controls.zoomRotateSpeed = 0.1;
console.log(controls);
/**
 * ==================================================
 */



const clock = new THREE.Clock();
let currentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  arrow.setDirection(raycaster.ray.direction.normalize()); // raycaster HELper update direction

  raycaster.setFromCamera(pointer, camera); // CAST A RAY

  const objectsToTest = [button1, button2]; //objects to intersect

  const intersects = raycaster.intersectObjects(objectsToTest); // set raycaster what to intersect

  // set object color before and after intersect
  for (const object of objectsToTest) {
    object.material.color.set("#0000ff");
  }

  // intersection of object to Raycaster
  for (const intersect of intersects) {
    intersect.object.material.color.set("#ff0000");
  }

  if (intersects.length) {
    if (currentIntersect === null) {
      console.log("mouse enter");
      canvas.style.cursor = "pointer";
      console.log(intersects);
    }
    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      console.log("mouse Leave");
      canvas.style.cursor = "default";
    }
    currentIntersect = null;
  }
  console.log(camera.fov);
  // Update controls
  controls.update();
  // update();
  // Render
  renderer.render(scene, camera);
  labelRenderer.render( scene, camera );

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
