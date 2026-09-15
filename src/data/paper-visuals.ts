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

// These previews use published imagery. Crop coordinates only frame the original
// source in CSS; the source files and the full figures remain unchanged.
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
      src: "/images/publications/studies/diff-pipeline.jpg",
      width: 8181,
      height: 3300,
      crop: { x: 62, y: 1293, width: 566, height: 565 },
    },
    after: {
      src: "/images/publications/studies/diff-pipeline.jpg",
      width: 8181,
      height: 3300,
      crop: { x: 62, y: 275, width: 566, height: 565 },
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
      src: "/images/publications/studies/med-noisy.jpg",
      width: 3680,
      height: 2456,
      crop: { x: 1660, y: 510, width: 1040, height: 720 },
    },
    after: {
      src: "/images/publications/studies/med-denoised.jpg",
      width: 3680,
      height: 2456,
      crop: { x: 1660, y: 510, width: 1040, height: 720 },
    },
    labels: ["Noisy", "Denoised"],
  },
};
