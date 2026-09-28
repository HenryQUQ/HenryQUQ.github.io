import {
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
} from "three";

export type PanoramaView = {
  yaw: number;
  pitch: number;
};

export async function createPanoramaRenderer(
  canvas: HTMLCanvasElement,
  source: string,
) {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  let texture;
  try {
    texture = await new TextureLoader().loadAsync(source);
  } catch (error) {
    renderer.dispose();
    throw error;
  }
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());

  const scene = new Scene();
  // A reversed sphere surrounds the camera, so the photograph fills the view.
  const geometry = new SphereGeometry(1, 80, 56);
  geometry.scale(-1, 1, 1);
  const material = new MeshBasicMaterial({ map: texture });
  scene.add(new Mesh(geometry, material));
  const camera = new PerspectiveCamera(74, 1, 0.01, 10);
  let view: PanoramaView = { yaw: 0, pitch: 0 };
  let disposed = false;

  function render() {
    if (disposed || !canvas.clientWidth || !canvas.clientHeight) return;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    // Wide frames keep a ~100° horizontal view instead of stretching the edges.
    camera.fov = Math.min(
      74,
      MathUtils.radToDeg(
        2 * Math.atan(Math.tan(MathUtils.degToRad(50)) / camera.aspect),
      ),
    );
    camera.updateProjectionMatrix();
    const phi = MathUtils.degToRad(90 - view.pitch);
    const theta = MathUtils.degToRad(view.yaw + 90);
    camera.lookAt(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta),
    );
    renderer.render(scene, camera);
  }

  const resize = new ResizeObserver(() => {
    if (disposed) return;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    render();
  });
  resize.observe(canvas);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  return {
    update(next: PanoramaView) {
      view = next;
      render();
    },
    dispose() {
      disposed = true;
      resize.disconnect();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    },
  };
}

export type PanoramaRenderer = Awaited<
  ReturnType<typeof createPanoramaRenderer>
>;
