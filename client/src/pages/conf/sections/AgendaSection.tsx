import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "../conf.module.css";
import agendaData from "../agenda.json";

interface AgendaSectionProps {
  confYear: string;
}

interface AgendaSpeaker {
  name: string;
  slug: string;
}

interface AgendaItem {
  time?: string;
  title: string;
  description?: string;
  speakers: AgendaSpeaker[];
  url?: string;
}

const { live: liveAgenda, onDemand: onDemandAgenda } = agendaData as {
  live: AgendaItem[];
  onDemand: AgendaItem[];
};

const renderSpeakers = (speakers: AgendaSpeaker[]) =>
  speakers.map((speaker, i) => (
    <React.Fragment key={speaker.slug}>
      {i > 0 && ", "}
      <Link to={`/conf/speakers/Speaker?slug=${encodeURIComponent(speaker.slug)}`}>
        {speaker.name}
      </Link>
    </React.Fragment>
  ));

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
            Join us live on April 28, 2026 from 9:00 AM to 2:00 PM PT. All times shown in Pacific Time. Session recordings will be available on demand after the event.
          </p>
        </div>

        <div className={styles.newsCardsColumn}>
          <div className={styles.agendaCards}>
            {liveAgenda.map((item, index) => (
              <article key={index} className={styles.agendaCard}>
                <div className={styles.agendaTime}>
                  <span>{item.time}</span>
                </div>
                <div className={styles.agendaCardContent}>
                  <h3 className={styles.agendaCardTitle}>{item.title}</h3>
                  <p className={styles.agendaCardSpeaker}>{renderSpeakers(item.speakers)}</p>
                  {item.description && (
                    <p className={styles.agendaCardDescription}>{item.description}</p>
                  )}
                </div>
                {item.url ? (
                  <a
                    className={styles.agendaCardButton}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch now
                  </a>
                ) : (
                  <span className={styles.agendaCardButton} aria-disabled="true">
                    Coming soon
                  </span>
                )}
              </article>
            ))}
          </div>

          <h3 className={styles.agendaOnDemandHeading}>Exclusive On-Demand Sessions</h3>
          <div className={styles.agendaCards}>
            {onDemandAgenda.map((item, index) => (
              <article key={`ondemand-${index}`} className={styles.agendaCard}>
                <div className={styles.agendaTime}>
                  <span>On-Demand</span>
                </div>
                <div className={styles.agendaCardContent}>
                  <h3 className={styles.agendaCardTitle}>{item.title}</h3>
                  <p className={styles.agendaCardSpeaker}>{renderSpeakers(item.speakers)}</p>
                  {item.description && (
                    <p className={styles.agendaCardDescription}>{item.description}</p>
                  )}
                </div>
                {item.url ? (
                  <a
                    className={styles.agendaCardButton}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch now
                  </a>
                ) : (
                  <span className={styles.agendaCardButton} aria-disabled="true">
                    Coming soon
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
