import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "../conf.module.css";
import speakersData from "../../speakers/speakers.json";

interface AgendaSectionProps {
  confYear: string;
}

const parseTimeString = (timeString: string): number => {
  if (!timeString || timeString.toUpperCase().includes("TBD")) {
    return Infinity;
  }
  const noPT = timeString.replace(" PT", "").trim();
  const [timePart, ampm] = noPT.split(" ");
  if (!timePart || !ampm) return Infinity;

  const [hhStr, mmStr, ssStr] = timePart.split(":");
  let hh = Number(hhStr) || 0;
  const mm = Number(mmStr) || 0;
  const ss = Number(ssStr) || 0;

  if (ampm.toUpperCase() === "PM" && hh < 12) {
    hh += 12;
  } else if (ampm.toUpperCase() === "AM" && hh === 12) {
    hh = 0;
  }

  return hh * 3600 + mm * 60 + ss;
};

const buildSpeakerLink = (speaker: any) => {
  const baseUrl = "/speakers/Speaker/";
  const params = new URLSearchParams({
    name: speaker.name,
    title: encodeURIComponent(speaker.title || ""),
    intro: encodeURIComponent(speaker.intro || ""),
    bio: encodeURIComponent(speaker.bio || ""),
    sessionTitle: encodeURIComponent(speaker.session?.title || ""),
    sessionAbstract: encodeURIComponent(speaker.session?.abstract || ""),
    img: encodeURIComponent(speaker.img || ""),
    from: "agenda",
  });

  if (speaker.x) {
    params.set("x", encodeURIComponent(speaker.x));
  }
  if (speaker.linkedin) {
    params.set("linkedin", encodeURIComponent(speaker.linkedin));
  }

  return `${baseUrl}?${params.toString()}`;
};

const AgendaSection = ({ confYear }: AgendaSectionProps) => {
  const liveSessions = speakersData
    .filter((speaker) => speaker.session && speaker.session.ondemand_only === false)
    .sort((a, b) => parseTimeString(a.session.time) - parseTimeString(b.session.time));

  return (
    <section className={styles.agendaSection} aria-labelledby="agenda">
      <div id="agenda" className={styles.sectionAnchor} />
      <div className={styles.agendaContainer}>
        <div className={styles.agendaContent}>
          <div className={styles.agendaHeader}>
            <div className={styles.agendaIconRow}>
              <img
                className={`${styles.sectionIconImage} ${styles.agendaIconImage}`}
                src={useBaseUrl("/img/icons/icon_agenda.png")}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
            </div>

            <div className={styles.agendaHeaderContent}>
              <div className={styles.agendaTitleGroup}>
                <h2 className={styles.agendaTitle}>Event agenda</h2>
                <div className={styles.agendaDescription}>
                  Below you’ll find the live sessions for Azure Cosmos DB Conf {confYear}!
                  <br />
                  You can click the button below to see the full agenda, including on-demand
                  sessions.
                </div>
              </div>

              <Link className={styles.agendaPrimaryButton} to="/agenda">
                <span className={styles.agendaPrimaryButtonText}>View full agenda</span>
              </Link>
            </div>
          </div>

          <div className={styles.agendaCards}>
            {liveSessions.slice(0, 8).map((speaker, index) => (
              <article key={index} className={styles.agendaCard}>
                <div className={styles.agendaTime}>
                  <span>{speaker.session?.time || "TBD"}</span>
                </div>
                <div className={styles.agendaCardContent}>
                  <h3 className={styles.agendaCardTitle}>
                    {speaker.session?.title || "Session"}
                  </h3>
                  <p className={styles.agendaCardSpeaker}>
                    <Link className={styles.agendaSpeakerLink} to={buildSpeakerLink(speaker)}>
                      {speaker.name}
                    </Link>
                    {speaker.title ? ` – ${speaker.title}` : ""}
                  </p>
                </div>
                <Link className={styles.agendaCardButton} to={buildSpeakerLink(speaker)}>
                  Watch now
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
