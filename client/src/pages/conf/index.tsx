import React, { useState } from "react";
import Layout from "@theme/Layout";
import styles from "./conf.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import newsData from "./news.json";
import faqsData from "./faqs.json";
import speakersData from "../speakers/speakers.json"; // <--- NEW IMPORT
import { Helmet } from "react-helmet";
import { getConfSettings } from "./confSettings";

const CONF_YEAR = "2026";
const CONF_DATE_DISPLAY = "April 28 - 9:00 AM - 12:00 PM PT";
const CONF_DATE_LONG = "April 28, 2026";

const ConfPage = () => {
  const { siteConfig } = useDocusaurusContext();
  const { showAgenda, showStream, streamEmbedUrl } = getConfSettings(siteConfig);
  const currentYear = new Date().getFullYear();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showAllNews, setShowAllNews] = useState(false);

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
      title={`Azure Cosmos DB Conf ${CONF_YEAR}`}
      description="Join us for the biggest Azure Cosmos DB event of the year!"
      noFooter
    >
      <Helmet>
        {/* Open Graph Meta Tags for LinkedIn and Facebook */}
        <meta property="og:title" content={`Azure Cosmos DB Conf ${CONF_YEAR}`} />
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
        <meta property="og:image:alt" content="Azure Cosmos DB Conf 2026" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter-specific Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Azure Cosmos DB Conf 2026" />
        <meta
          name="twitter:description"
          content="Join us for the biggest Azure Cosmos DB event of the year!"
        />
        <meta
          name="twitter:image"
          content="https://developer.azurecosmosdb.com/img/Cosmos_Conf_Main_Thumbnail.jpg?v=3"
        />
      </Helmet>

      <div className={styles.pageWrapper}>
        {/* ====== HERO (Figma node 170:158) ====== */}
        <header className={styles.hero} data-node-id="170:158">
          <span className={styles.srOnly}>{`Azure Cosmos DB Conf ${CONF_YEAR}`}</span>
        </header>

        {showStream && (
          <>
            {/* ====== STREAM SECTION (Figma node 6:234) ====== */}
            <section className={styles.streamSection} data-node-id="6:234">
              <div className={styles.streamOuter}>
                <div className={styles.streamInner}>
                  <h2 className={styles.streamTitle} data-node-id="6:226">
                    Watch the Azure Cosmos DB Conf {CONF_YEAR} Stream
                  </h2>

                  <div className={styles.streamVideoFrame} data-node-id="6:225">
                    {streamEmbedUrl ? (
                      <iframe
                        className={styles.streamVideo}
                        src={streamEmbedUrl}
                        title={`Azure Cosmos DB Conf ${CONF_YEAR} stream`}
                        frameBorder={0}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className={styles.streamVideoPlaceholder} aria-hidden="true" />
                    )}
                  </div>

                  <div className={styles.streamCta} data-node-id="6:233">
                    <button
                      type="button"
                      className={styles.streamCtaButton}
                      data-node-id="6:232"
                      disabled
                      aria-disabled="true"
                      title="Available during the live show"
                    >
                      <span data-node-id="6:228">Fill out our evaluation form</span>
                    </button>
                    <p className={styles.streamCtaNote} data-node-id="6:230">
                      (available during the show)
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ====== NEWS SECTION (Desktop Light layout) ====== */}
        <section className={styles.newsSection} aria-labelledby="news">
          <div className={styles.newsInner}>
            <div className={styles.newsTitleColumn}>
              <img
                className={`${styles.sectionIconImage} ${styles.newsIconImage}`}
                src={useBaseUrl("/img/icons/icon_news.png")}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <h2 id="news" className={styles.newsTitle}>
                Latest news
              </h2>
              <p className={styles.newsDescription}>
                Stay up to date with the latest announcements and updates for Azure Cosmos DB Conf {CONF_YEAR}.
              </p>
            </div>

            <div className={styles.newsCardsColumn}>
              <div className={styles.newsCards}>
                {newsData
                  .slice(0, showAllNews ? newsData.length : 3)
                  .map((newsItem, index) => (
                    <article key={index} className={styles.newsCard}>
                      <h3 className={styles.newsCardTitle}>{newsItem.title}</h3>
                      <p className={styles.newsDate}>{newsItem.date}</p>
                      <div
                        className={styles.newsCardCopy}
                        dangerouslySetInnerHTML={{ __html: newsItem.content }}
                      />
                    </article>
                  ))}
              </div>

              {newsData.length > 3 && (
                <div className={styles.newsActions}>
                  <button
                    type="button"
                    onClick={() => setShowAllNews(!showAllNews)}
                    className={styles.newsMoreButton}
                  >
                    {showAllNews ? "Show less" : "Show more"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {showAgenda && (
          <>
            {/* ====== AGENDA SECTION (Figma frame 1:2) ====== */}
            <section className={styles.agendaSection} aria-labelledby="agenda">
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
                        <h2 id="agenda" className={styles.agendaTitle}>
                          Event agenda
                        </h2>
                        <div className={styles.agendaDescription}>
                          Below you’ll find the live sessions for Azure Cosmos DB Conf {CONF_YEAR}!
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
          </>
        )}

        {/* ====== ABOUT SECTION (Figma frame 1:2) ====== */}
        <section className={styles.aboutSection} aria-labelledby="about">
          <div className={styles.aboutCard}>
            <div className={styles.aboutCardInner}>
              <div className={styles.aboutVisual} aria-hidden="true">
                <img
                  className={styles.aboutVisualLogo}
                  src={useBaseUrl("/img/conf/about_left.png")}
                  alt=""
                  loading="lazy"
                />
              </div>

              <div className={styles.aboutText}>
                <h2 id="about" className={styles.aboutTitle}>
                  About the conference
                </h2>
                <div className={styles.aboutCopy}>
                  <p>
                    Join us for our 6th annual Azure Cosmos DB Conf, a free virtual developer event
                    co-hosted by Microsoft and the Azure Cosmos DB community.
                  </p>
                  <p>
                    Tune in to learn why Azure Cosmos DB—including Azure DocumentDB, the newly renamed
                    vCore-based Azure Cosmos DB for NoSQL—is the leading database platform for the era
                    of AI and modern app development. Dive into a dynamic mix of sessions from Microsoft
                    and community experts, showcasing their innovative projects and breakthroughs.
                  </p>
                  <p>
                    Join our engaging 3-hour live show on {CONF_DATE_LONG}, and explore additional
                    sessions on-demand.
                  </p>
                  <p>This is an event you won't want to miss!</p>
                </div>

                {/* Registration button */}
                <div className={styles.aboutActions}>
                  <a
                    className={styles.aboutRegisterButton}
                    href="https://aka.ms/cosmosconfreg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register for Free!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== FAQ SECTION (Figma frame 1:2) ====== */}
        <section className={styles.faqSection} aria-labelledby="faq-section">
          <div className={styles.faqInner}>
            <div className={styles.faqTitleColumn}>
              <h2 id="faq-section" className={styles.faqTitle}>
                Frequently asked questions
              </h2>
            </div>

            <div className={styles.faqCards}>
              {faqsData.map((faq, index) => {
                const question = String(faq.question).replace(/\b2025\b|\b2026\b/g, CONF_YEAR);
                const content = String(faq.content).replace(/\b2025\b|\b2026\b/g, CONF_YEAR);
                const isOpen = openFAQ === index;

                return (
                  <article key={index} className={styles.faqCard}>
                    <button
                      type="button"
                      className={styles.faqCardButton}
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className={styles.faqQuestionText}>{question}</span>
                      <span className={styles.faqChevron} aria-hidden="true">
                        <svg
                          className={
                            isOpen ? styles.faqChevronIconOpen : styles.faqChevronIcon
                          }
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="14" cy="14" r="13" fill="#0078D4" />
                          <path
                            d="M9.5 12.5L14 17L18.5 12.5"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div className={styles.faqAnswer}>
                        <div
                          className={styles.faqAnswerCopy}
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== CONF FOOTER (Figma frame 1:2) ====== */}
        <footer className={styles.confFooter}>
          <div className={styles.confFooterInner}>
            <div className={styles.confFooterTop}>
              <div className={styles.confFooterLogo}>
                <img
                  className={styles.confFooterLogoMark}
                  src={useBaseUrl("/img/logo.svg")}
                  alt="Azure Cosmos DB"
                  width={72}
                  height={72}
                  loading="lazy"
                />
                <div className={styles.confFooterLogoText}>
                  <div className={styles.confFooterLogoLine}>Azure Cosmos DB</div>
                  <div className={styles.confFooterLogoLine}>
                    Conf <span className={styles.confFooterYear}>{CONF_YEAR}</span>
                  </div>
                </div>
              </div>

              <div className={styles.confFooterLinks}>
                <div className={styles.confFooterColumn}>
                  <div className={styles.confFooterColumnTitle}>Docs</div>
                  <a
                    className={styles.confFooterLink}
                    href="https://learn.microsoft.com/en-us/azure/cosmos-db/introduction"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tutorial
                  </a>
                </div>
                <div className={styles.confFooterColumn}>
                  <div className={styles.confFooterColumnTitle}>Community</div>
                  <a
                    className={styles.confFooterLink}
                    href="https://stackoverflow.com/tags/azure-cosmosdb/info"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Stack Overflow
                  </a>
                  <a
                    className={styles.confFooterLink}
                    href="http://aka.ms/AzureCosmosDBYouTube"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube
                  </a>
                  <a
                    className={styles.confFooterLink}
                    href="https://x.com/azurecosmosdb"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X
                  </a>
                  <a
                    className={styles.confFooterLink}
                    href="https://www.linkedin.com/company/azure-cosmos-db"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
                <div className={styles.confFooterColumn}>
                  <div className={styles.confFooterColumnTitle}>More</div>
                  <a
                    className={styles.confFooterLink}
                    href="https://devblogs.microsoft.com/cosmosdb/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blog
                  </a>
                  <a
                    className={styles.confFooterLink}
                    href="https://github.com/AzureCosmosDB"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.confFooterBottom}>
              <p className={styles.confFooterCopyright}>
                Copyright © {currentYear} Azure Cosmos DB - Built with ❤️{"\u00A0"}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default ConfPage;
