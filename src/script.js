let scene, camera, renderer, controls;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color('black');
  // 0x000000
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 140;

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(200, 0, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-200, 0, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 200, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, -200, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 0, 200);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 0, -200);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", renderer);

  let loader = new THREE.GLTFLoader();
  loader.load("scene.gltf", function (gltf) {
    car = gltf.scene.children[0];
    car.position.y = -25;
    // car.position.x=-10;
    car.scale.set(1.5, 1.5, 1.5);
    car.rotation.z = (-30 / 180) * Math.PI;
    scene.add(gltf.scene);
    animate();
  });
}

function animate() {
  car.rotation.z -= 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
