import type {
  PosterDocument,
  PosterImage,
  PosterText,
} from "@/src/lib/compad-editor";

// Original concept copy and compositions, separate from the site's career facts.
function lettering(
  id: string,
  name: string,
  text: string,
  x: number,
  y: number,
  width: number,
  size: number,
  options: Partial<PosterText> = {},
): PosterText {
  return {
    id,
    name,
    kind: "text",
    text,
    x,
    y,
    width,
    size,
    maxHeight: (id === "headline" ? 92 : 99) - y,
    scale: 100,
    rotation: 0,
    font: "sans",
    align: "left",
    italic: false,
    weight: 400,
    leading: 1.15,
    tracking: 0,
    ink: "normal",
    ...options,
  };
}

function photograph(
  id: string,
  name: string,
  src: string,
  x: number,
  y: number,
  width: number,
  aspect: number,
  fit: "contain" | "cover" = "contain",
): PosterImage {
  return {
    id,
    name,
    kind: "image",
    src: "/images/projects/" + src,
    x,
    y,
    width,
    aspect,
    fit,
    scale: 100,
    rotation: 0,
    opacity: 100,
    flipped: false,
  };
}

export type PosterDesign = {
  id: PosterDocument["design"];
  label: string;
  colours: PosterDocument["tone"][];
  poster: PosterDocument;
};

export const posterDesigns: PosterDesign[] = [
  {
    id: "bloom",
    label: "In bloom",
    colours: ["cream", "peach", "forest"],
    poster: {
      design: "bloom",
      tone: "cream",
      layers: [
        lettering("upper-title", "Opening title", "IN FULL", 6, 15, 88, 22.5, {
          weight: 650,
          leading: 0.9,
          tracking: -0.065,
        }),
        photograph(
          "flower",
          "Flower image",
          "compad-flower.webp",
          27,
          25,
          70,
          0.62,
        ),
        lettering(
          "edition",
          "Poster edition",
          "BOTANICAL STUDIES",
          7,
          5,
          65,
          2.5,
          { tracking: 0.12 },
        ),
        lettering("number", "Edition number", "01", 79, 4.5, 14, 4, {
          align: "right",
        }),
        lettering(
          "note",
          "Field note",
          "A FIELD GUIDE\nTO THE EVERYDAY",
          7,
          33,
          32,
          2.6,
          { leading: 1.5, tracking: 0.02 },
        ),
        lettering(
          "detail",
          "Specimen note",
          "Colour.\nTexture.\nLiving form.",
          7,
          51,
          29,
          4,
          { font: "serif", italic: true, leading: 1.15 },
        ),
        lettering("headline", "Poster headline", "BLOOM", 5, 74, 91, 22.5, {
          font: "serif",
          italic: true,
          tracking: -0.065,
          leading: 0.85,
          ink: "accent",
        }),
        lettering(
          "caption",
          "Poster caption",
          "THE ART OF LOOKING CLOSER",
          7,
          94,
          74,
          2.3,
          { tracking: 0.09 },
        ),
        lettering("signature", "Collection mark", "↗", 85, 91, 8, 5, {
          align: "right",
        }),
      ],
    },
  },
  {
    id: "form",
    label: "Form & space",
    colours: ["cobalt", "ink", "forest"],
    poster: {
      design: "form",
      tone: "cobalt",
      layers: [
        lettering("upper-title", "Opening title", "FORM", 5, 14, 90, 30, {
          weight: 650,
          tracking: -0.085,
          leading: 0.9,
        }),
        photograph(
          "sculpture",
          "Sculpture image",
          "compad-sculpture.webp",
          13,
          29,
          82,
          1,
        ),
        lettering(
          "edition",
          "Poster edition",
          "OBJECT / STUDIES",
          7,
          5,
          67,
          2.5,
          { tracking: 0.13 },
        ),
        lettering("number", "Edition number", "02", 78, 4.5, 15, 4, {
          align: "right",
          ink: "accent",
        }),
        lettering(
          "note",
          "Material note",
          "ONE SHEET.\nENDLESS POSSIBILITIES.",
          7,
          37,
          52,
          2.4,
          { tracking: 0.04, leading: 1.5, ink: "accent" },
        ),
        lettering("headline", "Poster headline", "& space", 7, 77, 88, 18, {
          font: "serif",
          italic: true,
          tracking: -0.025,
          leading: 0.95,
          ink: "accent",
        }),
        lettering(
          "caption",
          "Poster caption",
          "A STUDY IN BALANCE & TENSION",
          7,
          94,
          81,
          2.15,
          { tracking: 0.06 },
        ),
        lettering("signature", "Collection mark", "↗", 86, 91, 7, 5, {
          align: "right",
        }),
      ],
    },
  },
  {
    id: "city",
    label: "City in flux",
    colours: ["ink", "forest", "cobalt"],
    poster: {
      design: "city",
      tone: "ink",
      layers: [
        photograph(
          "city-photo",
          "City photograph",
          "compad-city.webp",
          7,
          13,
          86,
          0.94,
          "cover",
        ),
        lettering("edition", "Poster edition", "STREET NOTES", 7, 5, 66, 2.5, {
          tracking: 0.16,
        }),
        lettering("number", "Edition number", "03 /", 74, 4.5, 19, 4, {
          align: "right",
          ink: "accent",
        }),
        lettering(
          "note",
          "Photo note",
          "A DIFFERENT\nPOINT OF VIEW",
          11,
          18,
          51,
          2.7,
          { leading: 1.5, tracking: 0.1 },
        ),
        lettering("upper-title", "Opening title", "CITY", 9, 59, 84, 31, {
          weight: 650,
          leading: 0.88,
          tracking: -0.065,
          ink: "accent",
        }),
        lettering("headline", "Poster headline", "IN FLUX", 7, 79, 86, 17, {
          weight: 550,
          leading: 0.95,
          tracking: -0.04,
          ink: "accent",
        }),
        lettering(
          "caption",
          "Poster caption",
          "New perspectives on familiar places.",
          7,
          94,
          81,
          2.5,
        ),
        lettering("signature", "Collection mark", "↗", 86, 91, 7, 5, {
          align: "right",
          ink: "accent",
        }),
      ],
    },
  },
];
