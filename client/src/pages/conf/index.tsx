import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import styles from "./conf.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import newsData from "./news.json";
import faqsData from "./faqs.json";

const ConfPage = () => {
  const { siteConfig } = useDocusaurusContext();

  const lightImageUrl = useBaseUrl("/img/bg-header-white.jpg");
  const darkImageUrl = useBaseUrl("/img/bg-header-dark.jpg");
  const lightBgImage = useBaseUrl("/img/BG-light-1.png");
  const darkBgImage = useBaseUrl("/img/BG-dark-1.png");

  const [headerImage, setHeaderImage] = useState(lightImageUrl);
  const [commonBgImage, setCommonBgImage] = useState(lightBgImage);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Layout
      title="Azure Cosmos DB Conf 2025"
      description="Join us for the biggest Azure Cosmos DB event of the year!"
    >
      <div
        className={styles.pageWrapper}
        style={{ backgroundImage: `url(${commonBgImage})` }}
      >
        <div
          className={styles.header}
          style={{ backgroundImage: `url(${headerImage})` }}
        >
          <div className={styles.headerText}>
            <div className={styles.logoWrapper}>
              <img
                src={useBaseUrl("/img/logo.svg")}
                alt="Conf Logo"
                className={styles.logo}
              />
            </div>
            <div className={styles.textWrapper}>
              <h1>
                <span className={styles.azureCosmos}>Azure Cosmos DB Conf</span>
                <span className={styles.conf}>2025</span>
              </h1>
              <p className={styles.date}>April 15 - 9:00 AM - 12:00 PM PT</p>
            </div>
          </div>
        </div>

        {/* ====== NEWS SECTION ====== */}
        <div id="news" className={styles.newsSection}>
          <h2 className={styles.sectionHeading}>Latest News</h2>
          <div className={styles.newsGrid}>
            <div className={styles.newsList}>
              {newsData.map((newsItem, index) => (
                <div key={index} className={styles.newsItem}>
                  <h3>{newsItem.title}</h3>
                  <p className={styles.newsDate}>{newsItem.date}</p>
                  <p dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                </div>
              ))}
            </div>

            <div className={styles.newsVideo}>
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/eeJzDF9huYU"
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* ====== Divider Before About Section ====== */}
        <div className={styles.divider}></div>

{/* ====== ABOUT SECTION ====== */}
<div id="about" className={styles.section}>
  <div className={styles.aboutGrid}>
    {/* Left: About Image */}
    <div className={styles.aboutImage}>
      <img 
        src={useBaseUrl("/img/work-outside.png")} 
        alt="People working outside with a laptop" 
      />
    </div>

    {/* Right: About Text */}
    <div className={styles.textContent}>
      <h2>About the Conference</h2>
      <p>
        Join us for our <strong>5th annual Azure Cosmos DB Conf</strong>, a{" "}
        <strong>free virtual developer event</strong> co-hosted by Microsoft and the 
        Azure Cosmos DB community.
        <br />
        <br />
        Tune in to learn why <strong>Azure Cosmos DB</strong> is the leading database for the era 
        of <strong>AI and modern app development</strong>. Dive into a dynamic mix of sessions 
        from <strong>Microsoft</strong> and community experts, showcasing their innovative 
        projects and breakthroughs.
        <br />
        <br />
        Join our engaging <strong>3-hour live show</strong> on <strong>April 15, 2025</strong>, and 
        explore additional sessions <strong>on-demand</strong>.
        <br />
        <br />
        <strong>This is an event you won't want to miss!</strong>
      </p>
    </div>
  </div>
</div>



        {/* ====== Divider Before Agenda Section ====== */}
        <div className={styles.divider}></div>

        {/* ====== AGENDA SECTION ====== */}
        <div id="agenda" className={styles.section}>
          <div className={styles.textContent}>
            <h2>Event Agenda</h2>
            <p>
              The <strong>full event agenda</strong> will be available soon! 
              <br /><br />
              In the meantime, you can explore the <strong>list of sessions</strong> by clicking the button below.
            </p>
            <div className={styles.agendaButtonContainer}>
              <Link to="/agenda" className={styles.agendaButton}>
                View Full Agenda
              </Link>
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
