const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight , .1, 100000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const canvasSize = Math.min(Math.min(window.innerWidth, 500), 800);
renderer.domElement.width = canvasSize;
renderer.domElement.height = canvasSize;
const skyColor = 0x87CEEB; 
scene.background = new THREE.Color(skyColor);

function createGrassField() {
  const grassGeometry = new THREE.PlaneGeometry(100, -1);
  const grassMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });

  for (let i = 0; i < 20; i++) {
    const grassBlade = new THREE.Mesh(grassGeometry, grassMaterial);
    grassBlade.position.set(-10, -1-i, 1);
    scene.add(grassBlade);
  }
}


function createTree() {
  const trunkGeometry = new THREE.BoxGeometry(0.5, 4.5, 0.5);
  const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.set(2, -1, 3);
  scene.add(trunk);

  const leavesGeometry = new THREE.SphereGeometry(1, 8, 8);
  const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
  leaves.position.set(2, 0.5, 3);
  scene.add(leaves);
}


function createMountains() {
  const mountainColors = [0xAAA0AA, 0x888808, 0x600606];


  const mountain1 = createMountain(1, mountainColors);
  const mountain2 = createMountain(1, mountainColors);
  mountain1.position.set(-5, -1, -5);
  mountain2.position.set(3, -1, -5);


  const mountain3 = createMountain(1, mountainColors);
  mountain3.position.set(-1, 5, -10);

  scene.add(mountain1, mountain2, mountain3);
}

function createMountain(scale, colors) {
  const mountainGeometry = new THREE.ConeGeometry(6 * scale, 15 * scale, 89, 10);
  const mountainMaterial = new THREE.MeshBasicMaterial({ color: colors[Math.floor(Math.random() * colors.length)] });
  const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
  return mountain;
}


function createSky() {
  const skyGeometry = new THREE.BoxGeometry(1000, 100, 100000);
  const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x87CEEB, side: THREE.BackSide });
  const sky = new THREE.Mesh(skyGeometry, skyMaterial);
  scene.add(sky);

  const sunGeometry = new THREE.SphereGeometry(2, 16, 16);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.set(10, 8, -10);
  scene.add(sun);
}


function createBirds() {
  const birdGeometry = new THREE.BoxGeometry(.2, .2, .3);
  const birdMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const birds = [];

  for (let i = 0; i < 5; i++) {
    const bird = new THREE.Mesh(birdGeometry, birdMaterial);
    bird.position.set(Math.random() * 10 - 5, Math.random() * 2 + 2, Math.random() * 10 - 5);
    birds.push(bird);
    scene.add(bird);
  }

  return birds;
}




function createGrass() {
  const grassField = new THREE.Group();

  const numBladesX = 50;
  const numBladesZ = 2;

  const spacingX = 1.5;
  const spacingZ = 1.5;

  for (let i = 0; i < numBladesX; i++) {
    for (let j = 0; j < numBladesZ; j++) {
      const grassBlade = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, -1.3, 0.1),
        new THREE.MeshBasicMaterial({ color: 0x00FF00 })
      );

      grassBlade.position.x = i * spacingX - (numBladesX * spacingX) / 2;
      grassBlade.position.z = j * spacingZ - (numBladesZ * spacingZ) / 2;

      grassField.add(grassBlade);
    }
  }

  scene.add(grassField);
}


const mouse = { x: 0, y: 0 };

function handleMouseMove(event) {
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  mouse.x = (event.clientX - windowHalfX) / windowHalfX;
  mouse.y = (event.clientY - windowHalfY) / windowHalfY;

  camera.position.x = mouse.x * 1;
  camera.position.y = -mouse.y * 1;
  camera.lookAt(scene.position);
}


document.addEventListener('mousemove', handleMouseMove);



function animate() {
 requestAnimationFrame(animate);

 
  birds.forEach((bird) => {
    bird.position.x += 0.01;
    if (bird.position.x > 15) bird.position.x = -15;
   updateBirdWingFlap(bird);

    
  });

  renderer.render(scene, camera);
}
function updateBirdWingFlap(bird) {
 const wingAmplitude = .2; 
  const wingSpeed = 0.02;

  bird.rotation.z = Math.sin(Date.now() * wingSpeed) * wingAmplitude;
}
function createCloud() {
  const cloud = new THREE.Group();

  const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

  for (let i = 0; i < 3; i++) {
    const cloudPart = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), cloudMaterial);
    cloudPart.position.set(Math.random() * 10 - 5, Math.random() * 2 + 4, Math.random() * 10 - 5);
    cloud.add(cloudPart);
  }

  scene.add(cloud);
}


createSky();
createGrassField();
createMountains();
createGrass();
createTree();
createCloud();


const birds = createBirds(); 


camera.position.z = 10;
camera.position.x=1;
	


animate();
