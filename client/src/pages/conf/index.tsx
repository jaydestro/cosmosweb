import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './conf.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link'; // Import Link for navigation

const faqs = [
  {
    "question": "Where can I see the Azure Cosmos DB Conf 2025 stream?",
    "content": "You can find the Azure Cosmos DB Conf 2025 video stream and on-demand sessions on the <a class='blue' href='https://youtube.com/MicrosoftDeveloper'>Microsoft Developer YouTube Channel</a>."
  },
  {
    "question": "Is there a code of conduct for Azure Cosmos DB Conf 2025?",
    "content": "Azure Cosmos DB Conf 2025 falls under the <a class='blue' href='https://developer.microsoft.com/reactor/codeofconduct/'>Reactor Code of Conduct</a>. Please report any concerns, suspicious, or disruptive activity via the <a class='blue' href='https://www.microsoft.com/legal/compliance/sbc/standards?activetab=pivot_1%3aprimaryr5'>Microsoft Runs on Trust website</a>."
  },
  {
    "question": "Is there any cost to attend Azure Cosmos DB Conf 2025?",
    "content": "No, there are no costs to attend Azure Cosmos DB Conf 2025!"
  },
  {
    "question": "I want to be a speaker, how do I apply?",
    "content": "The Azure Cosmos DB Conf 2025 Call for Papers (CFP) is now closed. Stay tuned for 2026!"
  },
  {
    "question": "How can I sponsor Azure Cosmos DB Conf 2025?",
    "content": "Azure Cosmos DB Conf 2025 is not accepting sponsors. This event is organized and run completely by the Azure Cosmos DB team."
  },
  {
    "question": "Do I need to register for Azure Cosmos DB Conf 2025?",
    "content": "There's no registration required, but you can get updates for this event by signing up at the <a class='blue' href='https://developer.microsoft.com/reactor/events/21627/'>Microsoft Reactor page</a>."
  }
];

const ConfPage = () => {
  const { siteConfig } = useDocusaurusContext();

  const lightImageUrl = useBaseUrl('/img/bg-header-white.jpg');
  const darkImageUrl = useBaseUrl('/img/bg-header-dark.jpg');
  const lightBgImage = useBaseUrl('/img/BG-light-1.png');
  const darkBgImage = useBaseUrl('/img/BG-dark-1.png');

  const [headerImage, setHeaderImage] = useState(lightImageUrl);
  const [commonBgImage, setCommonBgImage] = useState(lightBgImage);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    const updateTheme = () => {
      const newTheme = document.documentElement.getAttribute('data-theme');
      setHeaderImage(newTheme === 'dark' ? darkImageUrl : lightImageUrl);
      setCommonBgImage(newTheme === 'dark' ? darkBgImage : lightBgImage);
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, [lightImageUrl, darkImageUrl, lightBgImage, darkBgImage]);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Layout title="Azure Cosmos DB Conf 2025" description="Join us for the biggest Azure CosmosDB event of the year!">
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
              <p className={styles.date}>April 15 - 9:00 AM - 12:00 PM PT</p>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className={styles.section}>
          <div className={styles.textContent}>
            <h2>About the Conference</h2>
            <p>
              Join us for our <strong>5th annual Azure Cosmos DB Conf</strong>, a <strong>free virtual developer event</strong> co-hosted by Microsoft and the Azure Cosmos DB community. 
              <br /><br />
              Tune in to learn why <strong>Azure Cosmos DB</strong> is the leading database for the era of <strong>AI and modern app development</strong>. 
              Dive into a dynamic mix of sessions from <strong>Microsoft</strong> and community experts, showcasing their innovative projects and breakthroughs.
              <br /><br />
              Join our engaging <strong>3-hour live show</strong> on <strong>April 15, 2025</strong>, and explore additional sessions <strong>on-demand</strong>. 
              <br /><br />
              <strong>This is an event you won't want to miss!</strong>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Agenda Section */}
        <div className={styles.section}>
          <div className={styles.textContent}>
            <h2>Conference Agenda</h2>
            <p className={styles.agendaIntro}>
              The full agenda, including <strong>live streaming</strong> and <strong>on-demand sessions</strong>, will be available soon.
            </p>
            <div className={styles.agendaButtonContainer}>
              <Link to="/agenda" className={styles.agendaButton}>View Agenda</Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* FAQ Section */}
        <div id="faq-section" className={styles.section}>
          <div className={styles.textContent}>
            <h2>Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <div className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
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
