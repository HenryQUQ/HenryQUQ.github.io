const asset = (name: string) => `/images/projects/visualsplit/${name}.webp`;

export type VisualSplitImage = {
  src: string;
  alt: string;
};

export type VisualSplitExample = {
  id: "colour" | "light" | "rebuild";
  label: string;
  title: string;
  description: string;
  original: VisualSplitImage;
  result: VisualSplitImage;
  resultLabel: string;
  ingredients: (VisualSplitImage & { label: string })[];
  ingredientNote: string;
};

// Published examples, kept separate from the interactive presentation.
// Exact original asset paths and encoding details are recorded in docs/sources.md.
export const visualSplitExamples: VisualSplitExample[] = [
  {
    id: "colour",
    label: "Colour",
    title: "A white bird, in red.",
    description:
      "Paint a new colour into the map. The bird’s outline and the scene’s light help guide the new picture. Look closely at what changes, and what stays familiar.",
    original: {
      src: asset("egret-original"),
      alt: "Original photograph of a white egret standing on sunlit rocks",
    },
    result: {
      src: asset("egret-result"),
      alt: "Published VisualSplit colour-editing result: the egret is red against the rocks",
    },
    resultLabel: "Recoloured",
    ingredients: [
      {
        label: "Original map",
        src: asset("egret-colour-before"),
        alt: "Original colour map of the egret and rocks",
      },
      {
        label: "Edited map",
        src: asset("egret-colour-after"),
        alt: "Edited colour map with the egret region painted red",
      },
    ],
    ingredientNote: "The change starts here, in the colour map.",
  },
  {
    id: "light",
    label: "Light",
    title: "Let the light change.",
    description:
      "A darker valley, or a brighter one. Changing the balance of light gives the scene a different mood, while the same outlines and colour map guide each result.",
    original: {
      src: asset("valley-original"),
      alt: "Original research image of a river winding through a wooded mountain valley",
    },
    result: {
      src: asset("valley-bright"),
      alt: "Published VisualSplit result with brighter light across the mountain valley",
    },
    resultLabel: "Brighter",
    ingredients: [],
    ingredientNote: "From shadows to highlights: the balance of light.",
  },
  {
    id: "rebuild",
    label: "Rebuild",
    title: "Three parts. One picture.",
    description:
      "An outline, patches of colour, and a record of light and dark. Can those simple ingredients bring a picture back? This is what the model reconstructs from them.",
    original: {
      src: asset("dog-original"),
      alt: "Original photograph of a black and white dog beside a pink flying disc on grass",
    },
    result: {
      src: asset("dog-result"),
      alt: "Published VisualSplit reconstruction of the dog and flying disc from three visual descriptors",
    },
    resultLabel: "Rebuilt",
    ingredients: [
      {
        label: "Shape",
        src: asset("dog-edges"),
        alt: "Edge map tracing the dog, grass and flying disc",
      },
      {
        label: "Colour",
        src: asset("dog-colour"),
        alt: "Colour map separating the dog, green grass and pink flying disc into regions",
      },
      {
        label: "Light",
        src: asset("dog-light"),
        alt: "Brightness histogram recording the balance of dark and light pixels in the dog photograph",
      },
    ],
    ingredientNote:
      "The published reconstruction, including its softer details.",
  },
];

export const visualSplitLighting = [
  {
    id: "dark",
    label: "Darker",
    image: {
      src: asset("valley-dark"),
      alt: "Published VisualSplit result with darker light across the mountain valley",
    },
    histogram: asset("valley-histogram-dark"),
  },
  {
    id: "balanced",
    label: "Balanced",
    image: {
      src: asset("valley-balanced"),
      alt: "Published VisualSplit result with balanced light across the mountain valley",
    },
    histogram: asset("valley-histogram-balanced"),
  },
  {
    id: "bright",
    label: "Brighter",
    image: {
      src: asset("valley-bright"),
      alt: "Published VisualSplit result with brighter light across the mountain valley",
    },
    histogram: asset("valley-histogram-bright"),
  },
];
