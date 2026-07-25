/**
 * Three.js 3D Hero Background — Kingdom Grill
 * Premium Arabian dining atmosphere
 */

let scene, camera, renderer;
let particles, mainPlate, centerPiece, floatingElements = [];
let mouseX = 0, mouseY = 0;
let windowHalfX, windowHalfY;
let time = 0;

function initThree() {
  const container = document.getElementById('three-container');
  if (!container) return;

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 10;
  camera.position.y = 0.5;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // === Lights ===
  const ambient = new THREE.AmbientLight(0x1a1a2e, 0.3);
  scene.add(ambient);

  const goldLight = new THREE.DirectionalLight(0xc9a84c, 2);
  goldLight.position.set(2, 5, 5);
  scene.add(goldLight);

  const goldLight2 = new THREE.DirectionalLight(0xe8d48b, 1);
  goldLight2.position.set(-3, 2, 4);
  scene.add(goldLight2);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
  rimLight.position.set(0, -1, -5);
  scene.add(rimLight);

  const warmGlow = new THREE.PointLight(0xc9a84c, 0.8, 15);
  warmGlow.position.set(0, 0, 3);
  scene.add(warmGlow);

  // === Main Centerpiece — Elegant Plate/Lotus ===
  // Central glowing disc (plate)
  const plateGeo = new THREE.CylinderGeometry(2.8, 2.8, 0.08, 64);
  const plateMat = new THREE.MeshPhysicalMaterial({
    color: 0x1a1a2e,
    metalness: 0.3,
    roughness: 0.4,
    transparent: true,
    opacity: 0.7,
    emissive: 0xc9a84c,
    emissiveIntensity: 0.015,
    clearcoat: 0.2,
  });
  mainPlate = new THREE.Mesh(plateGeo, plateMat);
  mainPlate.position.y = -0.3;
  scene.add(mainPlate);

  // Inner gold ring on plate
  const innerRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.8, 0.02, 32, 64),
    new THREE.MeshPhysicalMaterial({
      color: 0xc9a84c,
      emissive: 0xc9a84c,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.5,
    })
  );
  innerRing.position.y = -0.26;
  innerRing.rotation.x = -Math.PI / 2;
  scene.add(innerRing);

  // Outer gold rim
  const outerRim = new THREE.Mesh(
    new THREE.TorusGeometry(2.8, 0.025, 32, 64),
    new THREE.MeshPhysicalMaterial({
      color: 0xe8d48b,
      emissive: 0xc9a84c,
      emissiveIntensity: 0.15,
      transparent: true,
      opacity: 0.35,
    })
  );
  outerRim.position.y = -0.26;
  outerRim.rotation.x = -Math.PI / 2;
  scene.add(outerRim);

  // === Central abstract flame / dome (food presentation) ===
  const domeGeo = new THREE.SphereGeometry(1.2, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.5);
  const domeMat = new THREE.MeshPhysicalMaterial({
    color: 0xc9a84c,
    metalness: 0.6,
    roughness: 0.2,
    transparent: true,
    opacity: 0.25,
    emissive: 0xc9a84c,
    emissiveIntensity: 0.1,
    wireframe: false,
  });
  centerPiece = new THREE.Mesh(domeGeo, domeMat);
  centerPiece.position.y = 0.1;
  centerPiece.scale.set(0.7, 0.5, 0.7);
  scene.add(centerPiece);

  // Small golden sphere inside (the jewel)
  const jewel = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 24, 24),
    new THREE.MeshPhysicalMaterial({
      color: 0xe8d48b,
      emissive: 0xc9a84c,
      emissiveIntensity: 1.5,
      metalness: 0.9,
      roughness: 0.1,
    })
  );
  jewel.position.y = 0.3;
  scene.add(jewel);

  // === Arabian geometric pattern — rotating thin rings ===
  const ringMat2 = new THREE.MeshPhysicalMaterial({
    color: 0xc9a84c,
    emissive: 0xc9a84c,
    emissiveIntensity: 0.08,
    transparent: true,
    opacity: 0.12,
    wireframe: false,
  });

  for (let i = 0; i < 3; i++) {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(1.5 + i * 0.5, 0.008, 16, 48),
      ringMat2.clone()
    );
    r.position.y = -0.1;
    r.rotation.x = Math.PI / 3 + i * 0.3;
    r.rotation.z = i * 0.5;
    r.userData = { speed: 0.1 + i * 0.05, axis: i };
    scene.add(r);
    floatingElements.push(r);
  }

  // === Floating warm embers / spice particles ===
  const particleCount = 800;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(particleCount * 3);
  const col = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = 2 + Math.random() * 6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i3 + 1] = (Math.random() - 0.5) * 5;
    pos[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

    const isGold = Math.random() > 0.5;
    col[i3] = isGold ? 0.7 + Math.random() * 0.3 : 0.9 + Math.random() * 0.1;
    col[i3 + 1] = isGold ? 0.5 + Math.random() * 0.3 : 0.5 + Math.random() * 0.2;
    col[i3 + 2] = isGold ? 0.1 + Math.random() * 0.2 : 0.1 + Math.random() * 0.1;

    sizes[i] = 0.3 + Math.random() * 1.2;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    size: 0.06,
    transparent: true,
    opacity: 0.5,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // === Mouse tracking ===
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - windowHalfX) / windowHalfX;
    mouseY = (e.clientY - windowHalfY) / windowHalfY;
  });

  window.addEventListener('resize', onResize);
  animate();
}

function onResize() {
  const container = document.getElementById('three-container');
  if (!container) return;
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);
  time += 0.005;

  // Main plate slow rotation
  if (mainPlate) {
    mainPlate.rotation.y += 0.002;
    mainPlate.rotation.x = Math.sin(time * 0.2) * 0.02;
  }

  // Center dome breathing
  if (centerPiece) {
    centerPiece.rotation.y += 0.005;
    centerPiece.scale.setScalar(0.5 + Math.sin(time) * 0.02);
  }

  // Floating rings
  floatingElements.forEach((el, i) => {
    el.rotation.x += 0.003 * (i + 1);
    el.rotation.y += 0.005 * (i + 1);
    el.rotation.z += 0.002 * (i + 1);
  });

  // Particles — slow swirl
  if (particles) {
    particles.rotation.y += 0.0003;
    particles.rotation.x = Math.sin(time * 0.05) * 0.01;
  }

  // Camera sway with mouse
  camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.015;
  camera.position.y += (-mouseY * 0.25 - camera.position.y) * 0.015;
  camera.lookAt(0, 0.2, 0);

  renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', initThree);
