/**
 * Three.js 3D Hero Background
 * Kingdom Grill — مشاوي المملكة
 * Interactive 3D scene with particles, gold geometry, and Arabian pattern elements
 */

let scene, camera, renderer;
let particles, torusKnot, floatingOrbs = [];
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let time = 0;

function initThree() {
  const container = document.getElementById('three-container');
  if (!container) return;

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 12;
  camera.position.y = 1;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xc9a84c, 1.5);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xc9a84c, 1, 20);
  pointLight.position.set(-3, 2, 4);
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0xff6b35, 0.5, 15);
  pointLight2.position.set(4, -2, 6);
  scene.add(pointLight2);

  // Main Centerpiece — Golden Torus Knot
  const knotGeometry = new THREE.TorusKnotGeometry(2, 0.6, 128, 16);
  const knotMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xc9a84c,
    metalness: 0.7,
    roughness: 0.2,
    emissive: 0xc9a84c,
    emissiveIntensity: 0.05,
    wireframe: false,
    transparent: true,
    opacity: 0.9,
  });
  torusKnot = new THREE.Mesh(knotGeometry, knotMaterial);
  torusKnot.position.y = 0.5;
  scene.add(torusKnot);

  // Inner glow ring
  const ringGeo = new THREE.TorusGeometry(2.5, 0.03, 64, 64);
  const ringMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8d48b,
    emissive: 0xc9a84c,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.6,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.5;
  scene.add(ring);

  // Outer decorative ring
  const outerRingGeo = new THREE.TorusGeometry(3.5, 0.02, 64, 64);
  const outerRingMat = new THREE.MeshPhysicalMaterial({
    color: 0xc9a84c,
    transparent: true,
    opacity: 0.3,
    emissive: 0xc9a84c,
    emissiveIntensity: 0.1,
  });
  const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
  outerRing.rotation.x = Math.PI / 3;
  outerRing.rotation.z = 0.3;
  outerRing.position.y = 0.5;
  scene.add(outerRing);

  const outerRing2 = outerRing.clone();
  outerRing2.scale.set(1.4, 1.4, 1.4);
  outerRing2.material = outerRingMat.clone();
  outerRing2.material.opacity = 0.15;
  outerRing2.rotation.x = -0.5;
  scene.add(outerRing2);

  // Floating Orbs
  const orbColors = [0xc9a84c, 0xe8d48b, 0xff6b35, 0xa8872e, 0xffffff];
  for (let i = 0; i < 15; i++) {
    const size = 0.04 + Math.random() * 0.12;
    const orbGeo = new THREE.SphereGeometry(size, 16, 16);
    const orbMat = new THREE.MeshPhysicalMaterial({
      color: orbColors[Math.floor(Math.random() * orbColors.length)],
      emissive: 0xc9a84c,
      emissiveIntensity: 0.1 + Math.random() * 0.3,
      transparent: true,
      opacity: 0.3 + Math.random() * 0.5,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    const radius = 3 + Math.random() * 4;
    const angle = Math.random() * Math.PI * 2;
    const height = (Math.random() - 0.5) * 6;
    orb.position.set(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    );
    orb.userData = {
      radius,
      angle,
      speed: 0.1 + Math.random() * 0.3,
      height,
      offset: Math.random() * Math.PI * 2,
    };
    scene.add(orb);
    floatingOrbs.push(orb);
  }

  // Particle System — Starfield
  const particleCount = 2000;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = 15 + Math.random() * 30;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    const colorVal = 0.6 + Math.random() * 0.4;
    const goldMix = Math.random();
    if (goldMix > 0.7) {
      colors[i3] = 0.8 + Math.random() * 0.2;
      colors[i3 + 1] = 0.6 + Math.random() * 0.3;
      colors[i3 + 2] = 0.2 + Math.random() * 0.2;
    } else {
      colors[i3] = colorVal;
      colors[i3 + 1] = colorVal * 0.9;
      colors[i3 + 2] = colorVal;
    }
    sizes[i] = 0.5 + Math.random() * 2;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const particleMat = new THREE.PointsMaterial({
    size: 0.08,
    transparent: true,
    opacity: 0.6,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Mouse tracking
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - windowHalfX) / windowHalfX;
    mouseY = (e.clientY - windowHalfY) / windowHalfY;
  });

  window.addEventListener('resize', onWindowResize);

  animate();
}

function onWindowResize() {
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

  if (torusKnot) {
    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.01;

    // Mouse parallax
    torusKnot.rotation.x += (mouseY * 0.1 - torusKnot.rotation.x) * 0.02;
    torusKnot.rotation.y += (mouseX * 0.2 - torusKnot.rotation.y) * 0.02;

    // Subtle floating
    torusKnot.position.y = 0.5 + Math.sin(time * 0.5) * 0.15;
  }

  // Rotate floating orbs
  floatingOrbs.forEach((orb) => {
    const data = orb.userData;
    data.angle += data.speed * 0.01;
    orb.position.x = Math.cos(data.angle + time) * data.radius;
    orb.position.z = Math.sin(data.angle + time) * data.radius;
    orb.position.y = data.height + Math.sin(time * data.speed + data.offset) * 0.3;
  });

  // Rotate particles slowly
  if (particles) {
    particles.rotation.y += 0.0002;
    particles.rotation.x += 0.0001;
  }

  // Camera sway
  camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
  camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.02;
  camera.lookAt(0, 0.5, 0);

  renderer.render(scene, camera);
}

// Start
document.addEventListener('DOMContentLoaded', initThree);
