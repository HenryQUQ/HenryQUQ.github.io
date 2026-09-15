import Image from "next/image";
import { withBasePath } from "@/src/lib/site-config";

export function NexusVisual() {
  return (
    <div
      className="work-illustration illustration-nexus"
      role="img"
      aria-label="Nexus, with real Campaigns and content scheduling interface previews from My Signage Portal"
    >
      <div className="nexus-composition" aria-hidden="true">
        <Image
          className="nexus-logo"
          src={withBasePath("/images/projects/nexus-logo.svg")}
          alt=""
          width={400}
          height={138}
        />
        <span className="nexus-wordmark">Nexus</span>
        <div className="nexus-schedule">
          <Image
            src={withBasePath("/images/projects/nexus-schedule.webp")}
            width={640}
            height={517}
            sizes="(max-width: 760px) 40vw, 22vw"
            alt=""
          />
        </div>
        <div className="nexus-campaigns">
          <Image
            src={withBasePath("/images/projects/nexus-campaigns.webp")}
            width={640}
            height={369}
            sizes="(max-width: 760px) 85vw, 44vw"
            alt=""
          />
        </div>
        <span className="illustration-caption">From the Nexus portal</span>
      </div>
    </div>
  );
}
