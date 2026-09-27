import Image from "next/image";
import { paperVisuals, type PaperVisualImage } from "@/src/data/paper-visuals";
import { withBasePath } from "@/src/lib/site-config";

function PreviewImage({ image }: { image: PaperVisualImage }) {
  if (image.crop) {
    const crop = image.crop;
    return (
      <span
        className="paper-preview-crop"
        style={{ aspectRatio: `${crop.width} / ${crop.height}` }}
      >
        <Image
          src={withBasePath(image.src)}
          width={image.width}
          height={image.height}
          alt=""
          sizes="(max-width: 759px) 100vw, 360px"
          style={{
            position: "absolute",
            width: `${(image.width / crop.width) * 100}%`,
            maxWidth: "none",
            height: "auto",
            left: `${(-crop.x / crop.width) * 100}%`,
            top: `${(-crop.y / crop.height) * 100}%`,
          }}
        />
      </span>
    );
  }

  return (
    <Image
      src={withBasePath(image.src)}
      alt=""
      fill
      sizes="(max-width: 759px) 100vw, 360px"
    />
  );
}

export function PaperPreview({ slug }: { slug: string }) {
  const visual = paperVisuals[slug];
  if (!visual) return null;

  return (
    <span
      className={`paper-preview paper-preview-${slug}`}
      role="img"
      aria-label={visual.alt}
    >
      <span className="paper-preview-scene" aria-hidden="true">
        <span className="paper-preview-before">
          <PreviewImage image={visual.before} />
        </span>
        {visual.after && (
          <>
            <span className="paper-preview-after">
              <PreviewImage image={visual.after} />
            </span>
            <span className="paper-preview-rule" />
          </>
        )}
        <span className="paper-preview-labels">
          <span>{visual.labels[0]}</span>
          <span>{visual.labels[1]}</span>
        </span>
      </span>
    </span>
  );
}
