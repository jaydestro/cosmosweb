import React from "react";
import styles from "../conf.module.css";

interface StreamSectionProps {
  confYear: string;
  streamEmbedUrl: string | null;
}

const StreamSection = ({ confYear, streamEmbedUrl }: StreamSectionProps) => (
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
            <p className={styles.streamCtaNote} data-node-id="6:230">
              Subscribe to the channel and click the 🔔 bell to get a reminder when we go live.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default StreamSection;
