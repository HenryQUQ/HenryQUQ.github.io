"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BringToFront,
  FlipHorizontal2,
  Italic,
  SendToBack,
} from "lucide-react";
import type {
  PosterDocument,
  PosterImage,
  PosterLayer,
  PosterText,
} from "@/src/lib/compad-editor";

type InspectorProps = {
  layer: PosterLayer | null;
  tone: PosterDocument["tone"];
  colours: PosterDocument["tone"][];
  atFront: boolean;
  atBack: boolean;
  onChange: (
    change: (layer: PosterLayer) => PosterLayer,
    group?: string,
  ) => void;
  onTone: (tone: PosterDocument["tone"]) => void;
  onOrder: (direction: "front" | "back") => void;
  onEndGroup: () => void;
};

export function CompadInspector({
  layer,
  tone,
  colours,
  atFront,
  atBack,
  onChange,
  onTone,
  onOrder,
  onEndGroup,
}: InspectorProps) {
  function updateText(patch: Partial<PosterText>, group?: string) {
    onChange(
      (current) =>
        current.kind === "text" ? { ...current, ...patch } : current,
      group,
    );
  }
  function updateImage(patch: Partial<PosterImage>, group?: string) {
    onChange(
      (current) =>
        current.kind === "image" ? { ...current, ...patch } : current,
      group,
    );
  }

  return (
    <div className="compad-tools" data-selection={layer?.kind ?? "paper"}>
      <div className="compad-property-main" key={layer?.id ?? "paper"}>
        {layer?.kind === "text" ? (
          <>
            <label className="compad-property-title" htmlFor="compad-words">
              Make it say something.
            </label>
            <textarea
              id="compad-words"
              aria-label={layer.name}
              maxLength={64}
              rows={2}
              value={layer.text}
              onBlur={onEndGroup}
              onChange={(event) =>
                updateText(
                  {
                    text: event.target.value
                      .replace(/\n{2,}/g, "\n")
                      .split("\n")
                      .slice(0, 3)
                      .join("\n"),
                  },
                  layer.id + ":words",
                )
              }
            />
            <div className="compad-type-row">
              <div
                className="compad-fonts"
                role="group"
                aria-label="Poster typeface"
              >
                <button
                  type="button"
                  className="compad-serif-choice"
                  aria-label="Use serif type"
                  aria-pressed={layer.font === "serif"}
                  onClick={() => updateText({ font: "serif" })}
                >
                  Aa
                </button>
                <button
                  type="button"
                  aria-label="Use sans serif type"
                  aria-pressed={layer.font === "sans"}
                  onClick={() => updateText({ font: "sans" })}
                >
                  Aa
                </button>
              </div>
              <button
                type="button"
                className="compad-icon-control"
                aria-label="Italic lettering"
                aria-pressed={layer.italic}
                onClick={() => updateText({ italic: !layer.italic })}
              >
                <Italic size={16} aria-hidden="true" />
              </button>
            </div>
            <label className="compad-range-label" htmlFor="compad-type-size">
              Size <output>{layer.scale}%</output>
            </label>
            <input
              id="compad-type-size"
              aria-label="Lettering size"
              type="range"
              min="70"
              max="115"
              value={layer.scale}
              onBlur={onEndGroup}
              onPointerUp={onEndGroup}
              onChange={(event) =>
                updateText(
                  { scale: Number(event.target.value) },
                  layer.id + ":size",
                )
              }
            />
            <div
              className="compad-alignment"
              role="group"
              aria-label="Lettering alignment"
            >
              {(
                [
                  ["left", AlignLeft],
                  ["center", AlignCenter],
                  ["right", AlignRight],
                ] as const
              ).map(([align, Icon]) => (
                <button
                  key={align}
                  type="button"
                  className="compad-icon-control"
                  aria-label={"Align " + align}
                  aria-pressed={layer.align === align}
                  onClick={() => updateText({ align })}
                >
                  <Icon size={16} aria-hidden="true" />
                </button>
              ))}
            </div>
          </>
        ) : layer?.kind === "image" ? (
          <>
            <p className="compad-property-title">Find its place.</p>
            <label className="compad-range-label" htmlFor="compad-image-size">
              Size <output>{layer.scale}%</output>
            </label>
            <input
              id="compad-image-size"
              aria-label={layer.name + " size"}
              type="range"
              min="60"
              max="120"
              value={layer.scale}
              onBlur={onEndGroup}
              onPointerUp={onEndGroup}
              onChange={(event) =>
                updateImage(
                  { scale: Number(event.target.value) },
                  layer.id + ":size",
                )
              }
            />
            <label className="compad-range-label" htmlFor="compad-angle">
              Angle <output>{layer.rotation}°</output>
            </label>
            <input
              id="compad-angle"
              aria-label={layer.name + " rotation"}
              type="range"
              min="-35"
              max="35"
              value={layer.rotation}
              onBlur={onEndGroup}
              onPointerUp={onEndGroup}
              onChange={(event) =>
                updateImage(
                  { rotation: Number(event.target.value) },
                  layer.id + ":rotation",
                )
              }
            />
            <label className="compad-range-label" htmlFor="compad-opacity">
              Opacity <output>{layer.opacity}%</output>
            </label>
            <input
              id="compad-opacity"
              aria-label={layer.name + " opacity"}
              type="range"
              min="25"
              max="100"
              value={layer.opacity}
              onBlur={onEndGroup}
              onPointerUp={onEndGroup}
              onChange={(event) =>
                updateImage(
                  { opacity: Number(event.target.value) },
                  layer.id + ":opacity",
                )
              }
            />
            <button
              type="button"
              className="compad-flip"
              aria-pressed={layer.flipped}
              aria-label={"Flip " + layer.name.toLowerCase() + " horizontally"}
              onClick={() => updateImage({ flipped: !layer.flipped })}
            >
              <FlipHorizontal2 size={16} aria-hidden="true" /> Flip
            </button>
          </>
        ) : (
          <div className="compad-empty-selection">
            <p className="compad-property-title">Start with the paper.</p>
            <p>Pick a colour, or click something on the poster to change it.</p>
          </div>
        )}
      </div>
      <div className="compad-property-secondary">
        {layer && (
          <div className="compad-order" role="group" aria-label="Layer order">
            <button
              type="button"
              className="compad-icon-control"
              disabled={atFront}
              aria-label="Bring layer forward"
              title="Bring forward"
              onClick={() => onOrder("front")}
            >
              <BringToFront size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="compad-icon-control"
              disabled={atBack}
              aria-label="Send layer backward"
              title="Send backward"
              onClick={() => onOrder("back")}
            >
              <SendToBack size={16} aria-hidden="true" />
            </button>
            <span>Arrange</span>
          </div>
        )}
        <div className="compad-paper-options">
          <span>Paper</span>
          <div
            className="compad-colours"
            role="group"
            aria-label="Poster paper colour"
          >
            {colours.map((colour) => (
              <button
                key={colour}
                type="button"
                className={"compad-swatch swatch-" + colour}
                aria-label={"Use " + colour + " paper"}
                aria-pressed={tone === colour}
                onClick={() => onTone(colour)}
              >
                <span />
              </button>
            ))}
          </div>
        </div>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {layer ? layer.name + " selected" : "Poster paper selected"}
      </span>
    </div>
  );
}
