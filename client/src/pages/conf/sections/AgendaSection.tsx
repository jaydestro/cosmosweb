import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "../conf.module.css";

interface AgendaSectionProps {
  confYear: string;
}

const placeholderAgenda = [
  { time: "9:00 AM", title: "Opening keynote", speaker: "Speakers to be announced" },
  { time: "TBA", title: "Session 1", speaker: "Speakers to be announced" },
];

const placeholderOnDemand = [
  { title: "On-demand session 1", speaker: "Speakers to be announced" },
  { title: "On-demand session 2", speaker: "Speakers to be announced" },
];

const AgendaSection = ({ confYear }: AgendaSectionProps) => {
  return (
    <section className={styles.newsSection} aria-labelledby="agenda-heading">
      <div id="agenda" className={styles.sectionAnchor} />
      <div className={styles.newsInner}>
        <div className={styles.newsTitleColumn}>
          <img
            className={`${styles.sectionIconImage} ${styles.newsIconImage}`}
            src={useBaseUrl("/img/icons/icon_agenda.png")}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <h2 id="agenda-heading" className={styles.newsTitle}>
            Event agenda
          </h2>
          <p className={styles.newsDescription}>
            The full agenda for Azure Cosmos DB Conf {confYear} is coming soon. Check back for session times and speaker details.
          </p>
        </div>

        <div className={styles.newsCardsColumn}>
          <div className={styles.agendaCards}>
            {placeholderAgenda.map((item, index) => (
              <article key={index} className={styles.agendaCard}>
                <div className={styles.agendaTime}>
                  <span>{item.time}</span>
                </div>
                <div className={styles.agendaCardContent}>
                  <h3 className={styles.agendaCardTitle}>{item.title}</h3>
                  <p className={styles.agendaCardSpeaker}>{item.speaker}</p>
                </div>
                <span className={styles.agendaCardButton} aria-disabled="true">
                  Watch now
                </span>
              </article>
            ))}
          </div>

          <h3 className={styles.agendaOnDemandHeading}>Exclusive On-Demand Sessions</h3>
          <div className={styles.agendaCards}>
            {placeholderOnDemand.map((item, index) => (
              <article key={`ondemand-${index}`} className={styles.agendaCard}>
                <div className={styles.agendaTime}>
                  <span>On-Demand</span>
                </div>
                <div className={styles.agendaCardContent}>
                  <h3 className={styles.agendaCardTitle}>{item.title}</h3>
                  <p className={styles.agendaCardSpeaker}>{item.speaker}</p>
                </div>
                <span className={styles.agendaCardButton} aria-disabled="true">
                  Watch now
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
