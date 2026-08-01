/**
 * Hero visual: a single slow-rotating wireframe geometry (no particles,
 * no post-processing) — kept deliberately minimal per the perf/motion
 * trade-off. Skipped in favor of the static CSS mesh-gradient fallback
 * (already painted in markup) whenever:
 *   - prefers-reduced-motion is set
 *   - the device looks like a mid-range/low-end mobile (perf budget guard)
 *   - WebGL context creation fails
 * Three.js is dynamically imported so its cost is paid only when the
 * scene actually runs.
 */

function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function looksLikeMidRangeMobile() {
  const narrow = window.innerWidth < 768;
  const lowCores = (navigator.hardwareConcurrency || 8) <= 4;
  const saveData = navigator.connection?.saveData === true;
  return (narrow && lowCores) || saveData;
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export async function initHeroScene() {
  const canvas = document.querySelector('[data-hero-canvas]');
  const fallback = document.querySelector('[data-hero-fallback]');
  if (!canvas) return;

  if (isReducedMotion() || looksLikeMidRangeMobile() || !supportsWebGL()) {
    fallback?.classList.add('is-visible');
    return;
  }

  const THREE = await import('three');

  let renderer, scene, camera, mesh, frameId;
  let disposed = false;

  function build() {
    const hero = canvas.closest('.hero');
    const { clientWidth: w, clientHeight: h } = hero;

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 7);

    const geometry = new THREE.IcosahedronGeometry(2.1, 1);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0xc6a15b,
      transparent: true,
      opacity: 0.45,
    });
    mesh = new THREE.LineSegments(edges, material);
    mesh.position.set(1.6, 0, 0);
    scene.add(mesh);
  }

  function onResize() {
    const hero = canvas.closest('.hero');
    const { clientWidth: w, clientHeight: h } = hero;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function animate() {
    if (disposed) return;
    mesh.rotation.y += 0.0012;
    mesh.rotation.x += 0.0006;
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  }

  function dispose() {
    disposed = true;
    if (frameId) cancelAnimationFrame(frameId);
    mesh?.geometry?.dispose();
    mesh?.material?.dispose();
    renderer?.dispose();
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibility);
  }

  function onVisibility() {
    if (document.hidden) {
      if (frameId) cancelAnimationFrame(frameId);
    } else if (!disposed) {
      animate();
    }
  }

  build();
  animate();
  canvas.classList.add('is-ready');
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('beforeunload', dispose);
}
