"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "Europe/London";
const LOCATION = "Birmingham";

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});

type LocalTimeProps = {
  className?: string;
};

export function LocalTime({ className }: LocalTimeProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timeoutId: number;

    const update = () => {
      setNow(new Date());
      timeoutId = window.setTimeout(
        update,
        60_000 - (Date.now() % 60_000) + 50
      );
    };

    update();
    return () => window.clearTimeout(timeoutId);
  }, []);

  const displayTime = now ? timeFormatter.format(now) : null;

  return (
    <time
      id="birmingham-local-time"
      className={className}
      dateTime={now?.toISOString()}
      aria-label={
        displayTime
          ? `Current local time in ${LOCATION}: ${displayTime}`
          : `Local time in ${LOCATION}`
      }
    >
      {displayTime ? `${LOCATION} · ${displayTime} local` : `${LOCATION} · local time`}
    </time>
  );
}
