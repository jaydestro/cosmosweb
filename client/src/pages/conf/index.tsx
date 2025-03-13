import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './conf.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const faqs = [
  {
    question: "Where can I see the Azure Cosmos DB Conf 2024 stream?",
    content: `You can find the Azure Cosmos DB Conf 2024 video stream and on-demand sessions on the <a class="blue" href="https://youtube.com/MicrosoftDeveloper">Microsoft Developer YouTube Channel</a>`
  },
  {
    question: "Is there a code of conduct for Azure Cosmos DB Conf 2024?",
    content: `Azure Cosmos DB Conf 2024 falls under the <a class="blue" href="https://developer.microsoft.com/reactor/codeofconduct/">Reactor Code of Conduct</a>.
    Please report any concerns, suspicious or disruptive activity or behavior via the <a class="blue" href="https://www.microsoft.com/legal/compliance/sbc/standards?activetab=pivot_1%3aprimaryr5">Microsoft Runs on Trust website</a>.`
  }
];

const ConfPage = () => {
  const { siteConfig } = useDocusaurusContext();

  const lightImageUrl = useBaseUrl('/img/bg-header-white.jpg');
  const darkImageUrl = useBaseUrl('/img/bg-header-dark.jpg');
  const lightBgImage = useBaseUrl('/img/BG-light-1.png'); // Light theme background
  const darkBgImage = useBaseUrl('/img/BG-dark-1.png'); // Dark theme background

  const [headerImage, setHeaderImage] = useState(lightImageUrl);
  const [commonBgImage, setCommonBgImage] = useState(lightBgImage);

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = document.documentElement.getAttribute('data-theme');
      setHeaderImage(newTheme === 'dark' ? darkImageUrl : lightImageUrl);
      setCommonBgImage(newTheme === 'dark' ? darkBgImage : lightBgImage); // Update background image based on theme
    };

    updateTheme(); // Initialize on load
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, [lightImageUrl, darkImageUrl, lightBgImage, darkBgImage]);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index); // Toggle the current FAQ open state
  };

  return (
    <Layout title="Azure CosmosDB Conf 2025" description="Join us for the biggest Azure CosmosDB event of the year!">
      <div className={styles.pageWrapper} style={{ backgroundImage: `url(${commonBgImage})` }}>
        <div className={styles.header} style={{ backgroundImage: `url(${headerImage})` }}>
          <div className={styles.headerText}>
            <div className={styles.logoWrapper}>
              <img src={useBaseUrl('/img/logo.svg')} alt="Conf Logo" className={styles.logo} />
            </div>
            <div className={styles.textWrapper}>
              <h1>
                <span className={styles.azureCosmos}>Azure Cosmos DB Conf</span>
                <span className={styles.conf}>2025</span>
              </h1>
              <p className={styles.date}>April 16 - 9:00 AM - 12:00 PM PT</p>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className={styles.section}>
          <div className={styles.textContent}>
            <h2>About the Conference</h2>
            <p>
              Join us at Azure CosmosDB Conf 2025, where industry leaders and developers gather to explore the future of cloud databases.
              <br />
              Learn how to scale your applications globally with Azure CosmosDB’s powerful features.
              <br />
              Engage with hands-on labs and sessions led by experts in the field.
              <br />
              Network with professionals from around the world and take your cloud development to the next level.
              <br />
              Don't miss this opportunity to be part of a transformative experience!
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Agenda Section */}
        <div className={styles.section}>
          <div className={styles.textContent}>
            <h2>Conference Agenda</h2>
            <ul>
              <li>
                <strong>9:00 AM - Keynote Session</strong>: Introduction to Azure CosmosDB and its latest features.
              </li>
              <li>
                <strong>10:30 AM - Break</strong>: Networking and refreshment break.
              </li>
              <li>
                <strong>10:30 AM - Break</strong>: Networking and refreshment break.
              </li>
              <li>
                <strong>10:30 AM - Break</strong>: Networking and refreshment break.
              </li>
              <li>
                <strong>10:30 AM - Break</strong>: Networking and refreshment break.
              </li>
              <li>
                <strong>5:00 PM - Closing Remarks</strong>: Final thoughts and thanks from the organizers.
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Frequently Asked Questions Section */}
        <div id="faq-section" className={styles.section}>
          <div className={styles.textContent}>
            <h2>Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
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

      </div>
    </Layout>
  );
};

export default ConfPage;
