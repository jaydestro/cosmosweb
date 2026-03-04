import React, { useEffect, useRef, useState } from "react";
import styles from "../conf.module.css";
import speakersData from "../speakers2026.json";

interface Session {
  title?: string;
  abstract?: string;
  duration?: string;
}

interface Speaker {
  slug: string;
  name: string;
  role: string;
  company?: string;
  confirmed?: boolean;
  img?: string;
  bio?: string;
  x?: string;
  linkedin?: string;
  blog?: string;
  website?: string;
  session?: Session;
}

interface SpeakersSectionProps {
  confYear: string;
}

const SpeakersSection = ({ confYear }: SpeakersSectionProps) => {
  const allSpeakers: Speaker[] = speakersData as unknown as Speaker[];
  const speakers = allSpeakers.filter((s) => s.confirmed !== false);
  const [selected, setSelected] = useState<Speaker | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // On mount, open modal if URL hash matches #speaker/<slug>
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/^#speaker\/(.+)$/);
    if (match) {
      const speaker = speakers.find((s) => s.slug === match[1]);
      if (speaker) setSelected(speaker);
    }
  }, []);

  const openSpeaker = (speaker: Speaker) => {
    setSelected(speaker);
    window.history.replaceState(null, "", `#speaker/${speaker.slug}`);
  };

  const closeSpeaker = () => {
    setSelected(null);
    window.history.replaceState(null, "", "#speakers");
  };

  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeSpeaker(); };
    document.addEventListener("keydown", onKey);
    modalRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  if (!speakers.length) return null;

  return (
    <>
      <section className={styles.speakersSection} aria-labelledby="speakers-heading">
        <div id="speakers" className={styles.sectionAnchor} />
        <div className={styles.speakersContainer}>
          <h2 id="speakers-heading" className={styles.speakersTitle}>
            Meet the {confYear} Speakers
          </h2>
          <p className={styles.speakersSub}>
            Catch live and on-demand sessions from community experts and the Azure Cosmos DB team.
          </p>
          <div className={styles.speakersCard}>
            <div className={styles.speakersGrid}>
              {speakers.map((speaker) => (
                <button
                  key={speaker.slug}
                  className={styles.speakerCard}
                  aria-label={`View ${speaker.name}`}
                  onClick={() => openSpeaker(speaker)}
                >
                  <div className={styles.speakerCardImgWrap}>
                    <img
                      src={speaker.img || "/img/speakers/placeholder.avif"}
                      alt={speaker.name}
                      className={styles.speakerCardImg}
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/img/speakers/placeholder.avif";
                      }}
                    />
                  </div>
                  <div className={styles.speakerCardBody}>
                    <span className={styles.speakerCardName}>{speaker.name}</span>
                    {(speaker.role || speaker.company) && (
                      <span className={styles.speakerCardMeta}>
                        {[speaker.role, speaker.company].filter(Boolean).join(" · ")}
                      </span>
                    )}
                    {speaker.session?.title && (
                      <span className={styles.speakerCardSession}>{speaker.session.title}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selected && (
        <div
          className={styles.speakerModal}
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} speaker details`}
          onClick={(e) => { if (e.target === e.currentTarget) closeSpeaker(); }}
        >
          <div className={styles.speakerModalCard} ref={modalRef} tabIndex={-1}>
            <button
              className={styles.speakerModalClose}
              onClick={() => closeSpeaker()}
              aria-label="Close"
            >
              ×
            </button>

            <div className={styles.speakerModalProfile}>
              <div className={styles.speakerModalImgWrap}>
                <img
                  src={selected.img || "/img/speakers/placeholder.avif"}
                  alt={selected.name}
                  className={styles.speakerModalImg}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/img/speakers/placeholder.avif";
                  }}
                />
              </div>
              <div className={styles.speakerModalInfo}>
                <h2 className={styles.speakerModalName}>{selected.name}</h2>
                {selected.role && <p className={styles.speakerModalRole}>{selected.role}</p>}
                {selected.company && <p className={styles.speakerModalCompany}>{selected.company}</p>}
                {(selected.linkedin || selected.x || selected.blog || selected.website) && (
                  <div className={styles.speakerModalSocials}>
                    {selected.linkedin && (
                      <a href={selected.linkedin.startsWith("http") ? selected.linkedin : `https://linkedin.com/in/${selected.linkedin}`}
                        target="_blank" rel="noopener noreferrer"
                        className={styles.speakerModalSocialLink} aria-label="LinkedIn">in</a>
                    )}
                    {selected.x && (
                      <a href={`https://x.com/${selected.x.replace(/^@/, "")}`}
                        target="_blank" rel="noopener noreferrer"
                        className={styles.speakerModalSocialLink} aria-label="X">𝕏</a>
                    )}
                    {selected.blog && (
                      <a href={selected.blog} target="_blank" rel="noopener noreferrer"
                        className={styles.speakerModalSocialLink} title="Blog" aria-label="Blog">✍️</a>
                    )}
                    {selected.website && (
                      <a href={selected.website} target="_blank" rel="noopener noreferrer"
                        className={styles.speakerModalSocialLink} title="Website" aria-label="Website">🌐</a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {selected.session?.title && (
              <div className={styles.speakerModalSession}>
                <p className={styles.speakerModalLabel}>Session</p>
                <h3 className={styles.speakerModalSessionTitle}>{selected.session.title}</h3>
                {selected.session.abstract && (
                  <p className={styles.speakerModalAbstract}>{selected.session.abstract}</p>
                )}
              </div>
            )}

            {selected.bio && (
              <div className={styles.speakerModalBio}>
                <p className={styles.speakerModalLabel}>About</p>
                <p className={styles.speakerModalBioText}>{selected.bio}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SpeakersSection;
