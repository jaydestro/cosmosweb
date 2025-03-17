import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import speakersData from "./speakers/speakers.json"; // Import speakers data
import styles from "./agenda.module.css";

interface Session {
  title: string;
  abstract: string;
  duration: string;
  time: string;
  ondemand_only: boolean;
  youtube_url?: string;
}

interface Speaker {
  name: string;
  title: string;
  img: string;
  intro: string;
  bio: string;
  session: Session;
  x?: string;
  linkedin?: string;
}

export default function Agenda() {
  const [sortedAgenda, setSortedAgenda] = useState<{ live: { sessionTitle: string; speakers: Speaker[] }[]; ondemand: { sessionTitle: string; speakers: Speaker[] }[] }>({ live: [], ondemand: [] });

  useEffect(() => {
    const groupedSessions: { [key: string]: Speaker[] } = {};

    speakersData.forEach((speaker) => {
      const sessionTitle = speaker.session.title;
      if (!groupedSessions[sessionTitle]) {
        groupedSessions[sessionTitle] = [];
      }
      groupedSessions[sessionTitle].push(speaker);
    });

    const sortedSessions = Object.entries(groupedSessions)
      .map(([sessionTitle, speakers]) => ({ sessionTitle, speakers }))
      .sort((a, b) => {
        const timeA = a.speakers[0].session.time === "TBD" ? "23:59" : a.speakers[0].session.time;
        const timeB = b.speakers[0].session.time === "TBD" ? "23:59" : b.speakers[0].session.time;
        return timeA.localeCompare(timeB);
      });

    const liveSessions = sortedSessions.filter((s) => !s.speakers[0].session.ondemand_only);
    const onDemandSessions = sortedSessions.filter((s) => s.speakers[0].session.ondemand_only);

    setSortedAgenda({ live: liveSessions, ondemand: onDemandSessions });
  }, []);

  return (
    <Layout title="Azure Cosmos DB Conf 2025 Agenda" description="Explore the sessions for Azure Cosmos DB Conf 2025">
      <main>
        <div className="container">
          <h1 className={styles.agendaHeading}>Azure Cosmos DB Conf 2025 Agenda</h1>
          <p className={styles.agendaIntro}>
            You'll find all the <strong>live streaming</strong> and <strong>on-demand sessions</strong> here.
          </p>

          {/* Live Sessions Section */}
          {sortedAgenda.live.length > 0 && (
            <>
              <h2 className={styles.sectionHeading}>Live Sessions</h2>
              {sortedAgenda.live.map(({ sessionTitle, speakers }) => {
                const firstSpeaker = speakers[0];

                return (
                  <div key={sessionTitle} className={styles.sessionCard}>
                    <h2 className={styles.sessionTitle}>{sessionTitle}</h2>
                    <p className={styles.sessionTime}>
                      <strong>Time:</strong> {firstSpeaker.session.time} | <strong>Duration:</strong> {firstSpeaker.session.duration} min
                    </p>
                    <p className={styles.sessionDescription}>{firstSpeaker.session.abstract}</p>

                    {/* Speaker Profiles with Links */}
                    <div className={styles.speakerContainer}>
                      {speakers.map((speaker) => {
                        const speakerUrl = `/speakers/Speaker?name=${encodeURIComponent(speaker.name)}&title=${encodeURIComponent(speaker.title)}&intro=${encodeURIComponent(speaker.intro)}&bio=${encodeURIComponent(speaker.bio)}&sessionTitle=${encodeURIComponent(speaker.session.title)}&sessionAbstract=${encodeURIComponent(speaker.session.abstract)}&img=${encodeURIComponent(speaker.img)}${speaker.x ? `&x=${encodeURIComponent(speaker.x)}` : ''}${speaker.linkedin ? `&linkedin=${encodeURIComponent(speaker.linkedin)}` : ''}`;

                        return (
                          <div key={speaker.name} className={styles.speakerProfile}>
                            <Link to={speakerUrl}>
                              <img src={speaker.img} alt={speaker.name} className={styles.speakerImage} />
                            </Link>
                            <p className={styles.speakerName}>{speaker.title}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* YouTube Link (Only if available) */}
                    {firstSpeaker.session.youtube_url && firstSpeaker.session.youtube_url.trim() !== "" && (
                      <a href={firstSpeaker.session.youtube_url} target="_blank" rel="noopener noreferrer" className={styles.youtubeLink}>
                        Watch on YouTube
                      </a>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* On-Demand Sessions Section */}
          {sortedAgenda.ondemand.length > 0 && (
            <>
              <h2 className={styles.sectionHeading}>On-Demand Sessions</h2>
              {sortedAgenda.ondemand.map(({ sessionTitle, speakers }) => {
                const firstSpeaker = speakers[0];

                return (
                  <div key={sessionTitle} className={styles.sessionCard}>
                    <h2 className={styles.sessionTitle}>{sessionTitle}</h2>
                    <p className={styles.sessionTime}>
                      <strong>On-Demand</strong> | <strong>Duration:</strong> {firstSpeaker.session.duration} min
                    </p>
                    <p className={styles.sessionDescription}>{firstSpeaker.session.abstract}</p>

                    {/* Speaker Profiles with Links */}
                    <div className={styles.speakerContainer}>
                      {speakers.map((speaker) => {
                        const speakerUrl = `/speakers/Speaker?name=${encodeURIComponent(speaker.name)}&title=${encodeURIComponent(speaker.title)}&intro=${encodeURIComponent(speaker.intro)}&bio=${encodeURIComponent(speaker.bio)}&sessionTitle=${encodeURIComponent(speaker.session.title)}&sessionAbstract=${encodeURIComponent(speaker.session.abstract)}&img=${encodeURIComponent(speaker.img)}${speaker.x ? `&x=${encodeURIComponent(speaker.x)}` : ''}${speaker.linkedin ? `&linkedin=${encodeURIComponent(speaker.linkedin)}` : ''}`;

                        return (
                          <div key={speaker.name} className={styles.speakerProfile}>
                            <Link to={speakerUrl}>
                              <img src={speaker.img} alt={speaker.name} className={styles.speakerImage} />
                            </Link>
                            <p className={styles.speakerName}>{speaker.title}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* YouTube Link (Only if available) */}
                    {firstSpeaker.session.youtube_url && firstSpeaker.session.youtube_url.trim() !== "" && (
                      <a href={firstSpeaker.session.youtube_url} target="_blank" rel="noopener noreferrer" className={styles.youtubeLink}>
                        Watch on YouTube
                      </a>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}
