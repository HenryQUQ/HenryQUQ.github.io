export type Position = { x: number; y: number };
type LayerBase = Position & {
  id: string;
  name: string;
  width: number;
  scale: number;
  rotation: number;
};
export type PosterText = LayerBase & {
  kind: "text";
  text: string;
  font: "serif" | "sans";
  align: "left" | "center" | "right";
  italic: boolean;
  size: number;
  maxHeight: number;
  weight: number;
  leading: number;
  tracking: number;
  ink: "normal" | "accent";
};
export type PosterImage = LayerBase & {
  kind: "image";
  opacity: number;
  flipped: boolean;
  src: string;
  aspect: number;
  fit: "contain" | "cover";
};
export type PosterLayer = PosterText | PosterImage;
export type PosterDocument = {
  design: "bloom" | "form" | "city";
  tone: "cream" | "peach" | "forest" | "cobalt" | "ink";
  layers: PosterLayer[];
};

export type PosterHistory = {
  present: PosterDocument;
  past: PosterDocument[];
  future: PosterDocument[];
  group?: string;
};
export type HistoryAction =
  | {
      type: "edit";
      change: (poster: PosterDocument) => PosterDocument;
      group?: string;
    }
  | { type: "undo" }
  | { type: "redo" }
  | { type: "end-group" };

export function posterHistory(
  state: PosterHistory,
  action: HistoryAction,
): PosterHistory {
  if (action.type === "end-group") return { ...state, group: undefined };
  if (action.type === "undo") {
    if (!state.past.length) return state;
    return {
      present: state.past[state.past.length - 1],
      past: state.past.slice(0, -1),
      future: [state.present, ...state.future],
    };
  }
  if (action.type === "redo") {
    if (!state.future.length) return state;
    return {
      present: state.future[0],
      past: [...state.past, state.present],
      future: state.future.slice(1),
    };
  }
  const present = action.change(state.present);
  if (JSON.stringify(state.present) === JSON.stringify(present)) return state;
  return {
    present,
    past:
      action.group && action.group === state.group
        ? state.past
        : [...state.past, state.present].slice(-30),
    future: [],
    group: action.group,
  };
}

export function movePosterLayer(
  layer: PosterLayer,
  position: Position,
): PosterLayer {
  return {
    ...layer,
    x: Math.max(
      layer.kind === "image" ? -20 : 2,
      Math.min(layer.kind === "image" ? 65 : 100 - layer.width - 2, position.x),
    ),
    y: Math.max(
      layer.kind === "image" ? -15 : 2,
      Math.min(layer.kind === "image" ? 70 : 94, position.y),
    ),
  };
}
