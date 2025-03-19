import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import speakersData from "./speakers/speakers.json";
import styles from "./agenda.module.css";
import ReactMarkdown from "react-markdown";

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
  const [sortedAgenda, setSortedAgenda] = useState<{
    live: { sessionTitle: string; speakers: Speaker[] }[];
    tbd: { sessionTitle: string; speakers: Speaker[] }[];
    ondemand: { sessionTitle: string; speakers: Speaker[] }[];
  }>({ live: [], tbd: [], ondemand: [] });

  const [modalAbstract, setModalAbstract] = useState<string | null>(null);

  useEffect(() => {
    const groupedSessions: { [key: string]: Speaker[] } = {};

    // Group speakers by session title
    speakersData.forEach((speaker) => {
      if (!groupedSessions[speaker.session.title]) {
        groupedSessions[speaker.session.title] = [];
      }
      groupedSessions[speaker.session.title].push(speaker);
    });

    // Convert grouped sessions to array & sort them by time
    const sortedSessions = Object.entries(groupedSessions)
      .map(([sessionTitle, speakers]) => ({
        sessionTitle,
        speakers,
      }))
      .sort((a, b) => {
        const timeA = a.speakers[0].session.time === "TBD" ? "23:59" : a.speakers[0].session.time;
        const timeB = b.speakers[0].session.time === "TBD" ? "23:59" : b.speakers[0].session.time;
        return timeA.localeCompare(timeB);
      });

    setSortedAgenda({
      live: sortedSessions.filter(
        (s) => !s.speakers[0].session.ondemand_only && s.speakers[0].session.time !== "TBD"
      ),
      tbd: sortedSessions.filter(
        (s) => !s.speakers[0].session.ondemand_only && s.speakers[0].session.time === "TBD"
      ),
      ondemand: sortedSessions.filter((s) => s.speakers[0].session.ondemand_only),
    });
  }, []);

  return (
    <Layout title="Azure Cosmos DB Conf 2025 Agenda" description="Explore the sessions for Azure Cosmos DB Conf 2025">
      <main>
        <div className="container">
          {/* Ensure the heading stays consistent in both light & dark mode */}
          <h1 className={styles.agendaHeading}>Azure Cosmos DB Conf 2025 Agenda</h1>
          <p className={styles.agendaIntro}>
            You'll find all the <strong>live streaming</strong> and <strong>on-demand sessions</strong> here.
          </p>

          {["live", "tbd", "ondemand"].map((category) =>
            sortedAgenda[category as keyof typeof sortedAgenda].length > 0 ? (
              <section key={category}>
                <h2 className={styles.sectionHeading}>
                  {category === "live"
                    ? "Live Sessions"
                    : category === "tbd"
                    ? "Agenda Times Coming Soon"
                    : "On-Demand Sessions"}
                </h2>
                {sortedAgenda[category as keyof typeof sortedAgenda].map(({ sessionTitle, speakers }) => (
                  <SessionCard
                    key={sessionTitle}
                    sessionTitle={sessionTitle}
                    speakers={speakers}
                    isOnDemand={category === "ondemand"}
                    setModalAbstract={setModalAbstract}
                  />
                ))}
              </section>
            ) : null
          )}
        </div>

        {/* Modal for session abstracts */}
        {modalAbstract && <Modal abstract={modalAbstract} onClose={() => setModalAbstract(null)} />}
      </main>
    </Layout>
  );
}

/* Function to truncate the abstract without cutting words */
function truncateAbstract(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;

  let truncatedText = text.substring(0, maxLength);
  let lastSpaceIndex = truncatedText.lastIndexOf(" ");

  if (lastSpaceIndex !== -1) {
    truncatedText = truncatedText.substring(0, lastSpaceIndex); // Trim to last full word
  }

  return `${truncatedText}...`;
}

function SessionCard({
  sessionTitle,
  speakers,
  isOnDemand = false,
  setModalAbstract,
}: {
  sessionTitle: string;
  speakers: Speaker[];
  isOnDemand?: boolean;
  setModalAbstract: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return (
    <div className={styles.sessionCard}>
      <h2 className={styles.sessionTitle}>{sessionTitle}</h2>
      <p className={styles.sessionTime}>
        {isOnDemand ? <strong>On-Demand</strong> : <strong>Time:</strong>} {speakers[0].session.time} |{" "}
        <strong>Duration:</strong> {speakers[0].session.duration} min
      </p>

      <div className={styles.sessionAbstract}>
        <ReactMarkdown>{truncateAbstract(speakers[0].session.abstract, 200)}</ReactMarkdown>
        {/* ✅ Centered "Read More" button */}
        <div className={styles.readMoreContainer}>
          <button className={styles.readMoreButton} onClick={() => setModalAbstract(speakers[0].session.abstract)}>
            Read More
          </button>
        </div>
      </div>

      <div className={styles.speakerContainer}>
        {speakers.map((speaker) => {
          const speakerUrl = `/speakers/Speaker?name=${encodeURIComponent(speaker.name)}&title=${encodeURIComponent(
            speaker.title
          )}&intro=${encodeURIComponent(speaker.intro)}&bio=${encodeURIComponent(speaker.bio)}&sessionTitle=${encodeURIComponent(
            speaker.session.title
          )}&sessionAbstract=${encodeURIComponent(speaker.session.abstract)}&img=${encodeURIComponent(speaker.img)}${
            speaker.x ? `&x=${encodeURIComponent(speaker.x)}` : ""
          }${speaker.linkedin ? `&linkedin=${encodeURIComponent(speaker.linkedin)}` : ""}&from=agenda`;

          return (
            <div key={speaker.name} className={styles.speakerProfile}>
              <a href={speakerUrl}>
                <img src={speaker.img} alt={speaker.name} className={styles.speakerImage} />
              </a>
              <p className={styles.speakerName}>
                <a href={speakerUrl}>{speaker.title}</a>
              </p>
            </div>
          );
        })}
      </div>

      {speakers[0].session.youtube_url && (
        <a href={speakers[0].session.youtube_url} target="_blank" rel="noopener noreferrer" className={styles.youtubeLink}>
          Watch on YouTube
        </a>
      )}
    </div>
  );
}

const Modal = ({ abstract, onClose }: { abstract: string; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    return () => {
      document.body.style.overflow = "auto"; // Restore scrolling when modal is closed
    };
  }, []);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          ×
        </button>
        <h2>Session Abstract</h2>
        <ReactMarkdown>{abstract}</ReactMarkdown>
      </div>
    </div>
  );
};
