import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import styles from "./conf.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import newsData from "./news.json";
import faqsData from "./faqs.json";
import speakersData from "../speakers/speakers.json"; // <--- NEW IMPORT
import { Helmet } from "react-helmet";

const ConfPage = () => {
  const { siteConfig } = useDocusaurusContext();

  const lightImageUrl = useBaseUrl("/img/bg-header-white.jpg");
  const darkImageUrl = useBaseUrl("/img/bg-header-dark.jpg");
  const lightBgImage = useBaseUrl("/img/BG-light-1.png");
  const darkBgImage = useBaseUrl("/img/BG-dark-1.png");

  const [headerImage, setHeaderImage] = useState(lightImageUrl);
  const [commonBgImage, setCommonBgImage] = useState(lightBgImage);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showAllNews, setShowAllNews] = useState(false);

  // ====== THEME MUTATION OBSERVER ======
  useEffect(() => {
    const updateTheme = () => {
      const newTheme = document.documentElement.getAttribute("data-theme");
      setHeaderImage(newTheme === "dark" ? darkImageUrl : lightImageUrl);
      setCommonBgImage(newTheme === "dark" ? darkBgImage : lightBgImage);
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [lightImageUrl, darkImageUrl, lightBgImage, darkBgImage]);

  // ====== FAQ TOGGLE ======
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // ====== AGENDA HELPER FUNCTIONS ======
  // Parse time strings like "09:05:00 AM PT" into a sortable numeric value.
  // "TBD" -> Infinity (so those end up last).
  const parseTimeString = (timeString: string): number => {
    if (!timeString || timeString.toUpperCase().includes("TBD")) {
      return Infinity;
    }
    // Remove trailing " PT" if present
    const noPT = timeString.replace(" PT", "").trim(); // e.g. "09:05:00 AM"
    const [timePart, ampm] = noPT.split(" ");
    if (!timePart || !ampm) return Infinity;

    const [hhStr, mmStr, ssStr] = timePart.split(":");
    let hh = Number(hhStr) || 0;
    const mm = Number(mmStr) || 0;
    const ss = Number(ssStr) || 0;

    // Convert 12-hour to 24-hour
    if (ampm.toUpperCase() === "PM" && hh < 12) {
      hh += 12;
    } else if (ampm.toUpperCase() === "AM" && hh === 12) {
      hh = 0;
    }

    // Return total seconds from midnight
    return hh * 3600 + mm * 60 + ss;
  };

  // Get only sessions where ondemand_only = false
  let liveSessions = speakersData.filter(
    (speaker) => speaker.session && speaker.session.ondemand_only === false
  );

  // Sort them by session time
  liveSessions.sort(
    (a, b) => parseTimeString(a.session.time) - parseTimeString(b.session.time)
  );

  // Helper to build the dynamic speaker page link with query params
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

    // Add x and linkedin if they exist
    if (speaker.x) {
      params.set("x", encodeURIComponent(speaker.x));
    }
    if (speaker.linkedin) {
      params.set("linkedin", encodeURIComponent(speaker.linkedin));
    }

    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <Layout
      title="Azure Cosmos DB Conf 2025"
      description="Join us for the biggest Azure Cosmos DB event of the year!"
    >
      <Helmet>
        {/* Open Graph Meta Tags for LinkedIn and Facebook */}
        <meta property="og:title" content="Azure Cosmos DB Conf 2025" />
        <meta
          property="og:description"
          content="Join us for the biggest Azure Cosmos DB event of the year!"
        />
        <meta
          property="og:url"
          content="https://developer.azurecosmosdb.com/conf"
        />
        <meta
          property="og:image"
          content="https://developer.azurecosmosdb.com/img/Cosmos_Conf_Main_Thumbnail.jpg?v=3"
        />
        <meta property="og:image:alt" content="Azure Cosmos DB Conf 2025" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter-specific Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Azure Cosmos DB Conf 2025" />
        <meta
          name="twitter:description"
          content="Join us for the biggest Azure Cosmos DB event of the year!"
        />
        <meta
          name="twitter:image"
          content="https://developer.azurecosmosdb.com/img/Cosmos_Conf_Main_Thumbnail.jpg?v=3"
        />
      </Helmet>

      <div
        className={styles.pageWrapper}
        style={{ backgroundImage: `url(${commonBgImage})` }}
      >
        <div
          className={styles.header}
          style={{ backgroundImage: `url(${headerImage})` }}
        >
          <div className={styles.headerText}>
            <div className={styles.headerContent}>
              {/* ====== Logo & Title Aligned Horizontally ====== */}
              <div className={styles.titleWrapper}>
                <img
                  src={useBaseUrl("/img/logo.svg")}
                  alt="Conf Logo"
                  className={styles.logo}
                />
                <h1 className={styles.eventTitle}>
                  <span className={styles.azureCosmos}>Azure Cosmos DB Conf</span>
                  <span className={styles.conf}>2025</span>
                </h1>
              </div>
              <p className={styles.date}>April 15 - 9:00 AM - 12:00 PM PT</p>
            </div>
          </div>
        </div>

{/* ====== NEWS SECTION ====== */}
<div id="news" className={styles.newsSection}>
  <div className={styles.newsGrid} style={{ display: "flex", width: "100%" }}>
    {/* Left Column (News) - 40% */}
    <div
      className={styles.newsList}
      style={{
        width: "40%",
        minWidth: "200px",
        marginRight: "2rem",
      }}
    >
      {/* Centered Heading Above News Items */}
      <h2 className={styles.sectionHeading} style={{ textAlign: "center" }}>
        Latest News
      </h2>

      {/* News Items */}
      {newsData
        .slice(0, showAllNews ? newsData.length : 3)
        .map((newsItem, index) => (
          <div key={index} className={styles.newsItem}>
            <h3>{newsItem.title}</h3>
            <p className={styles.newsDate}>{newsItem.date}</p>
            <p dangerouslySetInnerHTML={{ __html: newsItem.content }} />
          </div>
        ))}
      {newsData.length > 3 && (
        <button
          onClick={() => setShowAllNews(!showAllNews)}
          className={styles.showMoreButton}
        >
          {showAllNews ? "Show Less" : "Show More"}
        </button>
      )}
    </div>

    {/* Right Column (Video) - 60% */}
    <div
      className={styles.newsVideo}
      style={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center content horizontally
      }}
    >
      <div
        className={`${styles.newsItem} ${styles.noLeftBorder}`}
        style={{
          width: "100%",
          maxWidth: "800px",
          textAlign: "center",
        }}
      >
        <h3>Watch the Azure Cosmos DB Conf 2025 Stream</h3>

        {/* 16:9 Letterbox Video */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%", // 16:9 aspect ratio
            marginBottom: "2rem",   // extra spacing below video
            height: 0,
          }}
        >
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src="https://www.youtube.com/embed/qXSur9LIfok"
            title="Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* ====== EVALUATION FORM BUTTON ====== */}
        <div style={{ marginBottom: "1rem" }}>
          <a
            href="https://aka.ms/EvalCosmosConf2025"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.agendaButton} /* Same style as "View Full Agenda" */
          >
            Fill out our evaluation form (available during the show)
          </a>
        </div>
      </div>
    </div>
  </div>
</div>



        {/* ====== Divider Before Agenda Section ====== */}
        <div className={styles.divider}></div>

{/* ====== AGENDA SECTION ====== */}
<div id="agenda" className={`${styles.section} ${styles.agendaSection}`}>
  <div className={styles.textContent}>
    <h2>Event Agenda</h2>
    <p>
      Below you’ll find the live sessions for Azure Cosmos DB Conf 2025!
      <br />
      <br />
      You can click the button below to see the full agenda, including on-demand sessions.
    </p>
    <div className={styles.agendaButtonContainer}>
      <Link to="/agenda" className={styles.agendaButton}>
        View Full Agenda
      </Link>
    </div>

    {/* ====== GROUP SESSIONS ====== */}
    {/* 1. Build groupedSessions by session title */}
    {(() => {
      const groupedByTitle: Record<string, {
        title: string;
        time: string;
        speakers: any[];
      }> = {};

      liveSessions.forEach((speaker) => {
        const { session } = speaker;
        const { title, time } = session;

        if (!groupedByTitle[title]) {
          groupedByTitle[title] = {
            title,
            time,
            speakers: [],
          };
        }
        groupedByTitle[title].speakers.push(speaker);
      });

      // Convert to array for sorting
      const groupedSessions = Object.values(groupedByTitle);

      // Sort by session time
      groupedSessions.sort((a, b) => parseTimeString(a.time) - parseTimeString(b.time));

      return (
        <div className={styles.agendaList}>
          {groupedSessions.map((group, index) => {
            const { title, time, speakers } = group;
            return (
              <div key={index} className={styles.agendaItem}>
                {/* Time */}
                <div className={styles.agendaTime}>
                  {time === "TBD" ? "TBD" : time}
                </div>

                {/* Session Title */}
                <div className={styles.agendaTitle}>{title}</div>

                {/* Combined Speakers */}
                <div className={styles.agendaSpeaker}>
                  {speakers.map((spkr, sIndex) => (
                    <React.Fragment key={sIndex}>
                      <Link to={buildSpeakerLink(spkr)}>
                        {spkr.title} – {spkr.intro}
                      </Link>
                      {/* Separator if multiple speakers */}
                      {sIndex < speakers.length - 1 && <span> | </span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    })()}
  </div>
</div>


        {/* ====== Divider Before About Section ====== */}
        <div className={styles.divider}></div>

        {/* ====== ABOUT SECTION ====== */}
        <div id="about" className={styles.section}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImage}>
              <img
                src={useBaseUrl("/img/work-outside.png")}
                alt="People working outside with a laptop"
              />
            </div>

            <div className={styles.textContent}>
              <h2>About the Conference</h2>
              <p>
                Join us for our <strong>5th annual Azure Cosmos DB Conf</strong>, a{" "}
                <strong>free virtual developer event</strong> co-hosted by Microsoft and the
                Azure Cosmos DB community.
                <br />
                <br />
                Tune in to learn why <strong>Azure Cosmos DB</strong> is the leading database
                for the era of <strong>AI and modern app development</strong>. Dive into a
                dynamic mix of sessions from <strong>Microsoft</strong> and community experts,
                showcasing their innovative projects and breakthroughs.
                <br />
                <br />
                Join our engaging <strong>3-hour live show</strong> on{" "}
                <strong>April 15, 2025</strong>, and explore additional sessions{" "}
                <strong>on-demand</strong>.
                <br />
                <br />
                <strong>This is an event you won't want to miss!</strong>
              </p>
            </div>
          </div>
        </div>


        {/* ====== Divider Before FAQ Section ====== */}
        <div className={styles.divider}></div>

        {/* ====== FAQ SECTION ====== */}
        <div id="faq-section" className={styles.section}>
          <div className={styles.textContent}>
            <h2>Frequently Asked Questions</h2>
            {faqsData.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <div
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                >
                  <strong>{faq.question}</strong>
                </div>
                {openFAQ === index && (
                  <div className={styles.faqAnswer}>
                    <p dangerouslySetInnerHTML={{ __html: faq.content }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ====== Divider After FAQ Section ====== */}
        <div className={styles.divider}></div>
      </div>
    </Layout>
  );
};

export default ConfPage;
