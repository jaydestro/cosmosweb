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
import { getConfSettings } from "../../conf/confSettings";
import ConfFooter from "./ConfFooter";
import resourcesData from "./resources.json";

const CONF_YEAR = "2026";
const CONF_DATE_DISPLAY = "April 28 - 9:00 AM - 12:00 PM PT";
const CONF_DATE_LONG = "April 28, 2026";
const CFP_URL = "https://aka.ms/CosmosConfCFP-site";

interface Resource {
  title: string;
  url: string;
  description: string;
}

interface ResourceSection {
  title: string;
  description?: string;
  items: Resource[];
}

interface CfpItem {
  title: string;
  description: string;
  url?: string;
}

interface CfpSection {
  title: string;
  description?: string;
  items: CfpItem[];
}

const cfpSections: CfpSection[] = [
  {
    title: "Submit a proposal",
    description:
      "Submit your session idea on the official CFP site. Deadlines, requirements, and status updates are maintained there.",
    items: [
      {
        title: "Open the CFP submission site",
        url: CFP_URL,
        description: "Use this link to submit, edit, or track your proposal.",
      },
    ],
  },
  {
    title: "What we’re looking for",
    description:
      "Practical, high-signal talks that help builders ship with Azure Cosmos DB and the DocumentDB ecosystem.",
    items: [
      {
        title: "Real-world lessons learned",
        description: "Architecture tradeoffs, reliability, cost optimization, and performance debugging.",
      },
      {
        title: "Demos and hands-on walkthroughs",
        description: "Show a pattern end-to-end: data modeling, partitioning, query design, and operations.",
      },
      {
        title: "Ecosystem and integrations",
        description: "Tooling, SDKs, data pipelines, observability, and app patterns.",
      },
    ],
  },
  {
    title: "Suggested topic areas",
    items: [
      {
        title: "Data modeling and partitioning",
        description: "Designing for scale, hot partition avoidance, hierarchical partition keys, and access patterns.",
      },
      {
        title: "Performance and cost",
        description: "RU optimization, indexing strategies, query tuning, and troubleshooting latency.",
      },
      {
        title: "Reliability and global scale",
        description: "Multi-region strategies, change feed patterns, backup/restore, and incident readiness.",
      },
      {
        title: "AI app patterns",
        description: "Chat history, contextual memory, RAG patterns, and (where relevant) vector search usage.",
      },
    ],
  },
  {
    title: "Before you submit",
    items: [
      {
        title: "Keep it audience-first",
        description:
          "Be explicit about what attendees will learn, who it’s for, and what they can apply immediately.",
      },
      {
        title: "Share the real-world story",
        description:
          "We love honest lessons learned and the tradeoffs that shaped your architecture decisions.",
      },
      {
        title: "Stay practical",
        description:
          "Hands-on demos and specific guidance resonate most with builders attending the event.",
      },
    ],
  },
];

const archiveTimelineData = [
  {
    year: "2025",
    text: "Azure Cosmos DB Conf 2025",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLQhnFsKWhtKu_Tp0uXPFdn",
  },
  {
    year: "2024",
    text: "Azure Cosmos DB Conf 2024",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLlrxD0HtieHgQxPGa9JJdbbUpmkuIshh4",
  },
  {
    year: "2023",
    text: "Azure Cosmos DB Conf 2023",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLd5dQ0aji5QRhxQQAh0SIn",
  },
  {
    year: "2022",
    text: "Azure Cosmos DB Conf 2022",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLa2ELTHUhoSMx89w329bOD",
  },
  {
    year: "2021",
    text: "Azure Cosmos DB Conf 2021",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLN_24E41jSPVilv5B3GTBg",
  },
];

const ConfPage = () => {
  const { siteConfig } = useDocusaurusContext();
  const { showAgenda, showStream, streamEmbedUrl } = getConfSettings(siteConfig);
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
          <div className={styles.heroInner} data-node-id="126:79">
            <div className={styles.heroLogoRow} data-node-id="126:80">
              <picture>
                <source
                  srcSet={useBaseUrl("/img/conf/hero_logo_mark.avif")}
                  type="image/avif"
                />
                <source
                  srcSet={useBaseUrl("/img/conf/hero_logo_mark.webp")}
                  type="image/webp"
                />
                <img
                  className={styles.heroLogoMark}
                  src={useBaseUrl("/img/conf/hero_logo_mark.png")}
                  alt=""
                />
              </picture>
              <picture>
                <source
                  srcSet={useBaseUrl("/img/conf/hero_logo_wordmark.avif")}
                  type="image/avif"
                />
                <source
                  srcSet={useBaseUrl("/img/conf/hero_logo_wordmark.webp")}
                  type="image/webp"
                />
                <img
                  className={styles.heroWordmarkImage}
                  src={useBaseUrl("/img/conf/hero_logo_wordmark.png")}
                  alt={`Azure Cosmos DB Conf ${CONF_YEAR}`}
                />
              </picture>
            </div>
            <p className={styles.heroDate} data-node-id="126:112">
              {CONF_DATE_DISPLAY}
            </p>
          </div>
          <span className={styles.srOnly}>{`Azure Cosmos DB Conf ${CONF_YEAR}`}</span>
        </header>

        <section className={styles.introSection} aria-labelledby="conf-intro">
          <div className={styles.introInner}>
            <div className={styles.introCard}>
              <h2 id="conf-intro" className={styles.introTitle}>
                What is Azure Cosmos DB Conf?
              </h2>
              <p className={styles.introCopy}>
                Azure Cosmos DB Conf is a free virtual event featuring expert-led sessions, demos, and real-world
                guidance on building globally distributed apps with Azure Cosmos DB.
              </p>
              <p className={styles.introCopySecondary}>
                Join us on <strong>{CONF_DATE_LONG}</strong> for live content and on-demand sessions.
              </p>

              <div className={styles.introActions}>
                <a
                  className={styles.introPrimaryButton}
                  href="https://aka.ms/cosmosconfreg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔔 Register for updates
                </a>
                <Link className={styles.introSecondaryButton} to="/conf/cfp">
                  🎤 Call for Proposals
                </Link>
                <a className={styles.introTertiaryButton} href="#about">
                  ℹ️ Learn more
                </a>
              </div>
            </div>
          </div>
        </section>

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
        <section className={styles.newsSection} aria-labelledby="news-heading">
          <div id="news" className={styles.sectionAnchor} />
          <div className={styles.newsInner}>
            <div className={styles.newsTitleColumn}>
              <img
                className={`${styles.sectionIconImage} ${styles.newsIconImage}`}
                src={useBaseUrl("/img/icons/icon_news.png")}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <h2 id="news-heading" className={styles.newsTitle}>
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
        <section className={styles.aboutSection} aria-labelledby="about-heading">
          <div id="about" className={styles.sectionAnchor} />
          <div className={styles.aboutCard}>
            <div className={styles.aboutCardInner}>
              <div className={styles.aboutVisual} aria-hidden="true">
                <picture>
                  <source srcSet={useBaseUrl("/img/conf/about_left.avif")} type="image/avif" />
                  <source srcSet={useBaseUrl("/img/conf/about_left.webp")} type="image/webp" />
                  <img
                    className={styles.aboutVisualLogo}
                    src={useBaseUrl("/img/conf/about_left.png")}
                    alt=""
                    loading="lazy"
                  />
                </picture>
              </div>

              <div className={styles.aboutText}>
                <h2 id="about-heading" className={styles.aboutTitle}>
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
        <section className={styles.faqSection} aria-labelledby="faq-heading">
          <div id="faq-section" className={styles.sectionAnchor} />
          <div className={styles.faqInner}>
            <div className={styles.faqTitleColumn}>
              <h2 id="faq-heading" className={styles.faqTitle}>
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

        {/* ====== CFP SECTION ====== */}
        <section className={styles.cfpSection} aria-labelledby="cfp-heading">
          <div id="cfp" className={styles.sectionAnchor} />
          <div className={styles.cfpContainer}>
            <h2 id="cfp-heading" className={styles.cfpTitle}>
              <img
                src="/img/planet-1.png"
                alt=""
                aria-hidden="true"
                className={styles.cfpIcon}
              />
              Call for Proposals
            </h2>

            <div className={styles.cfpCard}>
              <p className={styles.cfpSummary}>
                Want to speak at Azure Cosmos DB Conf? Submit your session proposal using the official CFP site.
              </p>
              <div className={styles.cfpCtaRow}>
                <a className={styles.cfpCtaPrimary} href={CFP_URL} target="_blank" rel="noopener noreferrer">
                  Submit a proposal
                </a>
                <a className={styles.cfpCtaSecondary} href={CFP_URL} target="_blank" rel="noopener noreferrer">
                  CFP details
                </a>
              </div>

              {cfpSections.map((section) => (
                <section key={section.title} className={styles.cfpSectionBlock}>
                  <h3 className={styles.cfpSectionTitle}>{section.title}</h3>
                  {section.description ? (
                    <p className={styles.cfpSectionDescription}>{section.description}</p>
                  ) : null}
                  <ul className={styles.cfpSimpleList}>
                    {section.items.map((item) => (
                      <li key={`${section.title}-${item.title}`} className={styles.cfpListItem}>
                        <div className={styles.cfpLinkRow}>
                          <img
                            src="/img/planet-1.png"
                            alt=""
                            aria-hidden="true"
                            className={styles.cfpBulletIcon}
                            loading="lazy"
                          />
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.cfpLink}
                            >
                              {item.title}
                            </a>
                          ) : (
                            <span className={styles.cfpLinkText}>{item.title}</span>
                          )}
                        </div>
                        <p className={styles.cfpDescription}>{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>

        {/* ====== RESOURCES SECTION ====== */}
        <section className={styles.resourcesSection} aria-labelledby="resources-heading">
          <div id="resources" className={styles.sectionAnchor} />
          <div className={styles.resourcesContainer}>
            <h2 id="resources-heading" className={styles.resourcesTitle}>
              <img
                src="/img/planet-1.png"
                alt=""
                aria-hidden="true"
                className={styles.resourcesIcon}
              />
              Resources
            </h2>

            <div className={styles.resourcesCard}>
              <p className={styles.resourcesSummary}>
                A curated set of links for Azure Cosmos DB, Azure DocumentDB, and the open-source DocumentDB project.
              </p>

              {(resourcesData as ResourceSection[]).map((section) => (
                <section key={section.title} className={styles.resourcesSectionBlock}>
                  <h3 className={styles.resourcesSectionTitle}>{section.title}</h3>
                  {section.description ? (
                    <p className={styles.resourcesSectionDescription}>{section.description}</p>
                  ) : null}
                  <ul className={styles.resourcesSimpleList}>
                    {section.items.map((res: Resource) => (
                      <li key={res.url} className={styles.resourcesListItem}>
                        <div className={styles.resourcesLinkRow}>
                          <img
                            src="/img/planet-1.png"
                            alt=""
                            aria-hidden="true"
                            className={styles.resourcesBulletIcon}
                            loading="lazy"
                          />
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.resourcesLink}
                          >
                            {res.title}
                          </a>
                        </div>
                        <p className={styles.resourcesDescription}>{res.description}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>

        {/* ====== ARCHIVE SECTION ====== */}
        <section className={styles.archiveSection} aria-labelledby="archive-heading">
          <div id="archive" className={styles.sectionAnchor} />
          <div className={styles.archiveContainer}>
            <h2 id="archive-heading" className={styles.archiveTitle}>
              <img
                src="/img/planet-1.png"
                alt=""
                aria-hidden="true"
                className={styles.archiveIcon}
              />
              Azure Cosmos DB Conf Archive
            </h2>

            <div className={styles.archiveTimeline}>
              {archiveTimelineData.map((item, index) => (
                <div key={index} className={styles.archiveTimelineItem}>
                  <div className={styles.archiveTimelineYear}>{item.year}</div>
                  <div className={styles.archiveTimelineContent}>
                    <p className={styles.archiveTimelineText}>{item.text}</p>
                    <iframe
                      className={styles.archiveTimelineVideo}
                      src={item.embedUrl}
                      title={`Azure Cosmos DB Conf ${item.year} playlist`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CONF FOOTER (Figma frame 1:2) ====== */}
        <div id="socials" className={styles.sectionAnchor} />
        <ConfFooter confYear={CONF_YEAR} />
      </div>
    </Layout>
  );
};

export default ConfPage;
