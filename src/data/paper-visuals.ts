export type PaperVisualImage = {
  src: string;
  width: number;
  height: number;
  crop?: { x: number; y: number; width: number; height: number };
};

export type PaperVisual = {
  kind: "comparison" | "panorama";
  alt: string;
  caption: string;
  before: PaperVisualImage;
  after?: PaperVisualImage;
  labels: [string, string];
};

// These previews use published imagery. DIFF and MeD use lossless crops of the
// original figures, with MeD resampled once to its preview size (see
// docs/sources.md); the source files remain unchanged.
// An optional crop frames a source in CSS without creating a derivative.
export const paperVisuals: Record<string, PaperVisual> = {
  visualsplit: {
    kind: "comparison",
    alt: "A white egret becomes red in a VisualSplit colour-editing example",
    caption: "Colour editing · published example",
    before: {
      src: "/images/projects/visualsplit/egret-original.webp",
      width: 1024,
      height: 1024,
    },
    after: {
      src: "/images/projects/visualsplit/egret-result.webp",
      width: 1024,
      height: 1024,
    },
    labels: ["Original", "Recoloured"],
  },
  diff: {
    kind: "comparison",
    alt: "A street photograph and its reference segmentation labels from the DIFF overview figure",
    caption: "Image and reference labels · figure detail",
    before: {
      src: "/images/publications/studies/previews/diff-scene.webp",
      width: 566,
      height: 565,
    },
    after: {
      src: "/images/publications/studies/previews/diff-labels.webp",
      width: 566,
      height: 565,
    },
    labels: ["Scene", "Labels"],
  },
  x360: {
    kind: "panorama",
    alt: "A wide museum interior from the official 360+x panorama",
    caption: "Scene from the dataset",
    before: {
      src: "/images/projects/x360-panorama.webp",
      width: 2880,
      height: 1440,
    },
    labels: ["360°", "A wider view"],
  },
  med: {
    kind: "comparison",
    alt: "A noisy stairwell photograph and the published MeD denoising result",
    caption: "Denoising · published example",
    before: {
      src: "/images/publications/studies/previews/med-noisy.webp",
      width: 760,
      height: 526,
    },
    after: {
      src: "/images/publications/studies/previews/med-denoised.webp",
      width: 760,
      height: 526,
    },
    labels: ["Noisy", "Denoised"],
  },
};
