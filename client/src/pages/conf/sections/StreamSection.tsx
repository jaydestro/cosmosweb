import React, { useEffect, useState } from "react";
import styles from "../conf.module.css";

interface StreamSectionProps {
  confYear: string;
  streamEmbedUrl: string | null;
  /** When true, hide the countdown + subscribe notice (stream is live). */
  live?: boolean;
}

// Azure Cosmos DB Conf 2026: April 28, 2026 · 9:00 AM PDT (UTC−7)
const EVENT_START = new Date("2026-04-28T09:00:00-07:00").getTime();

interface Countdown {
  done: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const computeCountdown = (): Countdown => {
  const now = Date.now();
  const diff = EVENT_START - now;
  if (diff <= 0) {
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { done: false, days, hours, minutes, seconds };
};

const pad = (value: number) => value.toString().padStart(2, "0");

const StreamSection = ({ confYear, streamEmbedUrl, live = false }: StreamSectionProps) => {
  // Start with a stable value for SSR; update on the client after mount.
  const [countdown, setCountdown] = useState<Countdown>(() => computeCountdown());

  useEffect(() => {
    setCountdown(computeCountdown());
    const id = window.setInterval(() => {
      setCountdown(computeCountdown());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className={styles.streamSection} data-node-id="6:234">
      <div id="stream" className={styles.sectionAnchor} />
      <div className={styles.streamOuter}>
        <div className={styles.streamInner}>
          <div className={styles.streamCard}>
            <h2 className={styles.streamTitle} data-node-id="6:226">
              Watch the Azure Cosmos DB Conf {confYear} Stream
            </h2>

            <div className={styles.streamVideoFrame} data-node-id="6:225">
              {streamEmbedUrl ? (
                <iframe
                  className={styles.streamVideo}
                  src={streamEmbedUrl}
                  title={`Azure Cosmos DB Conf ${confYear} stream`}
                  frameBorder={0}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className={styles.streamVideoPlaceholder} aria-hidden="true" />
              )}
            </div>

            <div className={styles.streamCta} data-node-id="6:233">
              {/* Evaluation button hidden for now — will be re-enabled closer to the live show. */}
              {/*
              <button
                type="button"
                className={styles.streamCtaButton}
                data-node-id="6:232"
                disabled
                aria-disabled="true"
                title="Available during the live show"
              >
                <span data-node-id="6:228">Evaluation available on 4/28/2026</span>
              </button>
              */}
              {!live && (
                <p className={styles.streamCtaNote} data-node-id="6:230">
                  Subscribe to the channel and click the 🔔 bell to get a reminder when we go live.
                </p>
              )}

              {!live && (
                countdown.done ? (
                  <p className={styles.streamCountdownLive} aria-live="polite">
                    🔴 We&apos;re live!
                  </p>
                ) : (
                  <div
                    className={styles.streamCountdown}
                    role="timer"
                    aria-live="off"
                    aria-label={`Time until Azure Cosmos DB Conf ${confYear} goes live`}
                  >
                    <span className={styles.streamCountdownLabel}>Live in</span>
                    <div className={styles.streamCountdownGrid}>
                      <div className={styles.streamCountdownUnit}>
                        <span className={styles.streamCountdownValue}>{pad(countdown.days)}</span>
                        <span className={styles.streamCountdownName}>days</span>
                      </div>
                      <div className={styles.streamCountdownUnit}>
                        <span className={styles.streamCountdownValue}>{pad(countdown.hours)}</span>
                        <span className={styles.streamCountdownName}>hrs</span>
                      </div>
                      <div className={styles.streamCountdownUnit}>
                        <span className={styles.streamCountdownValue}>{pad(countdown.minutes)}</span>
                        <span className={styles.streamCountdownName}>min</span>
                      </div>
                      <div className={styles.streamCountdownUnit}>
                        <span className={styles.streamCountdownValue}>{pad(countdown.seconds)}</span>
                        <span className={styles.streamCountdownName}>sec</span>
                      </div>
                    </div>
                  </div>
                )
              )}

              <a
                className={styles.streamCtaButton}
                href="https://aka.ms/CosmosConf2026Survey"
                target="_blank"
                rel="noopener noreferrer"
              >
                Azure Cosmos DB Conference 2026 Post-Event Survey
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StreamSection;
